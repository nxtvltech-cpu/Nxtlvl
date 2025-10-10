from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from passlib.context import CryptContext
import os
import uuid
import jwt
from pathlib import Path
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'nxtlvl-secret-key-2025')
ALGORITHM = "HS256"

# Create the main app
app = FastAPI(title="NXTLVL Gaming E-commerce API")
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    brand: str
    price: float
    compare_at_price: Optional[float] = None
    badges: List[str] = []
    rating: float = 0.0
    inventory: int = 0
    images: List[str] = []
    short_benefit: str
    description: str
    specs: Dict[str, Any] = {}
    compatibility: List[str] = []
    # SEO fields
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    tags: List[str] = []
    # Variants and bundles
    variants: List[Dict[str, Any]] = []  # price variations for colors/specs/sizes
    frequently_bought_together: List[str] = []  # product IDs
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    published: bool = True

class ProductCreate(BaseModel):
    title: str
    category: str
    brand: str
    price: float
    compare_at_price: Optional[float] = None
    badges: List[str] = []
    rating: float = 0.0
    inventory: int = 0
    images: List[str] = []
    short_benefit: str
    description: str
    specs: Dict[str, Any] = {}
    compatibility: List[str] = []
    # SEO fields
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    tags: List[str] = []
    # Variants and bundles
    variants: List[Dict[str, Any]] = []
    frequently_bought_together: List[str] = []
    published: bool = True

class Bundle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str
    product_ids: List[str]  # List of product IDs in the bundle
    discount_percentage: float  # e.g., 15 for 15% off
    discount_amount: Optional[float] = None  # fixed amount discount alternative
    badges: List[str] = []
    images: List[str] = []
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BundleCreate(BaseModel):
    name: str
    slug: str
    description: str
    product_ids: List[str]
    discount_percentage: float
    discount_amount: Optional[float] = None
    badges: List[str] = []
    images: List[str] = []
    active: bool = True

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Brand(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    is_admin: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    is_admin: bool = False

class CartItem(BaseModel):
    product_id: str
    quantity: int = 1
    price: float

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    items: List[CartItem] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    stripe_session_id: str
    email: str
    items: List[CartItem]
    total: float
    status: str = "pending"  # pending, paid, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return User(**user)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# Routes

# Auth routes
@api_router.post("/auth/login", response_model=Token)
async def login(request: LoginRequest):
    user = await db.users.find_one({"email": request.email})
    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

# Product routes
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    brand: Optional[str] = None,
    price_min: Optional[float] = None,
    price_max: Optional[float] = None,
    in_stock: Optional[bool] = None,
    sort_by: Optional[str] = "created_at",
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    filter_query = {"published": True}
    
    if category:
        filter_query["category"] = category
    if brand:
        filter_query["brand"] = brand
    if price_min is not None:
        filter_query["price"] = {"$gte": price_min}
    if price_max is not None:
        if "price" in filter_query:
            filter_query["price"]["$lte"] = price_max
        else:
            filter_query["price"] = {"$lte": price_max}
    if in_stock:
        filter_query["inventory"] = {"$gt": 0}
    
    sort_direction = -1 if sort_by.startswith("-") else 1
    sort_field = sort_by.lstrip("-")
    
    skip = (page - 1) * limit
    
    products = await db.products.find(filter_query).sort(sort_field, sort_direction).skip(skip).limit(limit).to_list(length=None)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id, "published": True})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find().to_list(length=None)
    return [Category(**category) for category in categories]

@api_router.get("/brands", response_model=List[Brand])
async def get_brands():
    brands = await db.brands.find().to_list(length=None)
    return [Brand(**brand) for brand in brands]

# Cart routes
@api_router.get("/cart/{session_id}", response_model=Cart)
async def get_cart(session_id: str):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        cart = Cart(session_id=session_id)
        await db.carts.insert_one(cart.dict())
        return cart
    return Cart(**cart)

@api_router.post("/cart/{session_id}/items")
async def add_to_cart(session_id: str, item: CartItem):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        cart = Cart(session_id=session_id)
        await db.carts.insert_one(cart.dict())
        cart = await db.carts.find_one({"session_id": session_id})
    
    # Check if item already exists
    cart_obj = Cart(**cart)
    existing_item = None
    for i, existing in enumerate(cart_obj.items):
        if existing.product_id == item.product_id:
            existing_item = i
            break
    
    if existing_item is not None:
        cart_obj.items[existing_item].quantity += item.quantity
    else:
        cart_obj.items.append(item)
    
    cart_obj.updated_at = datetime.now(timezone.utc)
    
    await db.carts.update_one(
        {"session_id": session_id},
        {"$set": cart_obj.dict()}
    )
    
    return {"message": "Item added to cart"}

@api_router.put("/cart/{session_id}/items/{product_id}")
async def update_cart_item(session_id: str, product_id: str, quantity: int):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart_obj = Cart(**cart)
    for item in cart_obj.items:
        if item.product_id == product_id:
            if quantity <= 0:
                cart_obj.items.remove(item)
            else:
                item.quantity = quantity
            break
    else:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    cart_obj.updated_at = datetime.now(timezone.utc)
    
    await db.carts.update_one(
        {"session_id": session_id},
        {"$set": cart_obj.dict()}
    )
    
    return {"message": "Cart updated"}

@api_router.delete("/cart/{session_id}/items/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    return await update_cart_item(session_id, product_id, 0)

# Admin routes
@api_router.post("/admin/products", response_model=Product)
async def create_product(product: ProductCreate, current_user: User = Depends(get_admin_user)):
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    await db.products.insert_one(product_obj.dict())
    return product_obj

@api_router.put("/admin/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductCreate, current_user: User = Depends(get_admin_user)):
    existing_product = await db.products.find_one({"id": product_id})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_dict = product_update.dict()
    await db.products.update_one({"id": product_id}, {"$set": update_dict})
    
    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)

@api_router.delete("/admin/products/{product_id}")
async def delete_product(product_id: str, current_user: User = Depends(get_admin_user)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to seed data
@app.on_event("startup")
async def startup_event():
    # Create admin user
    admin_email = "admin@nxtlvl.gg"
    admin_password = "admin123"
    
    existing_admin = await db.users.find_one({"email": admin_email})
    if not existing_admin:
        admin_user = {
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": get_password_hash(admin_password),
            "is_admin": True,
            "created_at": datetime.now(timezone.utc)
        }
        await db.users.insert_one(admin_user)
        print(f"Admin user created: {admin_email} / {admin_password}")
    
    # Seed categories
    categories_data = [
        {"name": "GPU", "slug": "gpu", "description": "Graphics Cards for Gaming"},
        {"name": "CPU", "slug": "cpu", "description": "Processors for High Performance"},
        {"name": "Motherboard", "slug": "motherboard", "description": "Motherboards for PC Builds"},
        {"name": "RAM", "slug": "ram", "description": "Memory Modules"},
        {"name": "Cooling", "slug": "cooling", "description": "CPU and System Cooling"},
        {"name": "Keyboard", "slug": "keyboard", "description": "Gaming Keyboards"},
        {"name": "Mouse", "slug": "mouse", "description": "Gaming Mice"},
    ]
    
    for cat_data in categories_data:
        existing = await db.categories.find_one({"slug": cat_data["slug"]})
        if not existing:
            category = Category(
                name=cat_data["name"],
                slug=cat_data["slug"],
                description=cat_data["description"]
            )
            await db.categories.insert_one(category.dict())
    
    # Seed brands
    brands_data = [
        {"name": "ASUS ROG", "slug": "asus-rog"},
        {"name": "MSI", "slug": "msi"},
        {"name": "NVIDIA", "slug": "nvidia"},
        {"name": "AMD", "slug": "amd"},
        {"name": "Intel", "slug": "intel"},
        {"name": "Corsair", "slug": "corsair"},
        {"name": "Kingston", "slug": "kingston"},
        {"name": "G.Skill", "slug": "g-skill"},
        {"name": "Razer", "slug": "razer"},
        {"name": "Logitech G", "slug": "logitech-g"},
    ]
    
    for brand_data in brands_data:
        existing = await db.brands.find_one({"slug": brand_data["slug"]})
        if not existing:
            brand = Brand(
                name=brand_data["name"],
                slug=brand_data["slug"],
                description=f"{brand_data['name']} gaming products"
            )
            await db.brands.insert_one(brand.dict())
    
    # Seed products with real images
    gpu_images = [
        "https://images.unsplash.com/photo-1652754271476-0b6cf297b827?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBncmFwaGljcyUyMGNhcmR8ZW58MHx8fHwxNzU4NTI4NTE3fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1613014510867-a47a0e5bf564?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBncmFwaGljcyUyMGNhcmR8ZW58MHx8fHwxNzU4NTI4NTE3fDA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1727176763571-811f1c4ea36c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxSVFglMjBHUFV8ZW58MHx8fHwxNzU4NTI4NTIyfDA&ixlib=rb-4.1.0&q=85",
    ]
    
    keyboard_images = [
        "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwwfHx8fDE3NTg1Mjg1NTN8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1631449061775-c79df03a44f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBrZXlib2FyZHxlbnwwfHx8fDE3NTg1Mjg1NTN8MA&ixlib=rb-4.1.0&q=85",
    ]
    
    mouse_images = [
        "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwwfHx8fDE3NTg1Mjg1NTh8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxnYW1pbmclMjBtb3VzZXxlbnwwfHx8fDE3NTg1Mjg1NTh8MA&ixlib=rb-4.1.0&q=85",
    ]
    
    cpu_images = [
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
        "https://images.unsplash.com/photo-1555617981-dac3880eac6e",
    ]
    
    products_data = [
        {
            "title": "ASUS ROG Strix GeForce RTX 4070 Ti SUPER 16GB",
            "category": "GPU",
            "brand": "ASUS ROG",
            "price": 899.00,
            "compare_at_price": 999.00,
            "badges": ["New", "Bestseller"],
            "rating": 4.8,
            "inventory": 25,
            "images": gpu_images[:2],
            "short_benefit": "+18–25% avg FPS at 1440p vs previous gen",
            "description": "The ASUS ROG Strix GeForce RTX 4070 Ti SUPER features the cutting-edge NVIDIA Ada Lovelace architecture with 16GB of GDDR6X memory. This powerhouse GPU delivers exceptional 1440p gaming performance with ray tracing enabled. The triple-fan Axial-tech cooling system keeps temperatures low while maintaining whisper-quiet operation.",
            "specs": {
                "vram": "16GB GDDR6X",
                "length_mm": 336,
                "power_w": 285,
                "ports": "3x DP 1.4a, 1x HDMI 2.1",
                "boost_clock": "2610 MHz"
            },
            "compatibility": ["ATX case clearance 340mm+", "PSU 750W+", "PCIe 16-pin (12VHPWR)"]
        },
        {
            "title": "MSI GeForce RTX 4060 Ti Gaming X 8GB",
            "category": "GPU",
            "brand": "MSI",
            "price": 449.00,
            "compare_at_price": 499.00,
            "badges": ["Deal"],
            "rating": 4.6,
            "inventory": 15,
            "images": gpu_images[1:],
            "short_benefit": "Perfect 1080p gaming with ray tracing support",
            "description": "MSI GeForce RTX 4060 Ti Gaming X delivers excellent 1080p gaming performance with DLSS 3 support. Features MSI's Twin Frozr 9 thermal design for optimal cooling and RGB Mystic Light for customizable lighting effects.",
            "specs": {
                "vram": "8GB GDDR6",
                "length_mm": 308,
                "power_w": 165,
                "ports": "3x DP 1.4a, 1x HDMI 2.1",
                "boost_clock": "2535 MHz"
            },
            "compatibility": ["Mid-tower case", "PSU 550W+", "PCIe 8-pin"]
        },
        {
            "title": "AMD Ryzen 7 7800X3D 8-Core Processor",
            "category": "CPU",
            "brand": "AMD",
            "price": 399.00,
            "badges": ["Bestseller"],
            "rating": 4.9,
            "inventory": 30,
            "images": cpu_images,
            "short_benefit": "Ultimate gaming CPU with 3D V-Cache technology",
            "description": "The AMD Ryzen 7 7800X3D features revolutionary 3D V-Cache technology that delivers exceptional gaming performance. With 8 cores and 16 threads, this processor excels in both gaming and content creation tasks.",
            "specs": {
                "cores": 8,
                "threads": 16,
                "base_clock": "4.2 GHz",
                "boost_clock": "5.0 GHz",
                "cache": "96MB L3 Cache",
                "tdp": "120W",
                "socket": "AM5"
            },
            "compatibility": ["AM5 motherboard", "DDR5 memory", "AIO or high-end air cooler recommended"]
        },
        {
            "title": "Corsair Vengeance DDR5-5600 32GB (2x16GB)",
            "category": "RAM",
            "brand": "Corsair",
            "price": 129.00,
            "compare_at_price": 149.00,
            "badges": ["Deal"],
            "rating": 4.7,
            "inventory": 40,
            "images": ["https://images.unsplash.com/photo-1676554565685-3aeb5d7ad1b7"],
            "short_benefit": "High-speed DDR5 for modern gaming builds",
            "description": "Corsair Vengeance DDR5 memory pushes the boundaries of performance with speeds up to 5600MHz. Built with high-quality components and rigorously tested for compatibility with the latest platforms.",
            "specs": {
                "capacity": "32GB (2x16GB)",
                "speed": "DDR5-5600",
                "latency": "CL36",
                "voltage": "1.25V",
                "height": "34.1mm"
            },
            "compatibility": ["Intel 12th gen+", "AMD Ryzen 7000+", "DDR5 compatible motherboards"]
        },
        {
            "title": "Logitech G Pro X Superlight Wireless Gaming Mouse",
            "category": "Mouse",
            "brand": "Logitech G",
            "price": 149.00,
            "badges": ["New"],
            "rating": 4.8,
            "inventory": 20,
            "images": mouse_images,
            "short_benefit": "Ultra-lightweight pro gaming mouse under 63g",
            "description": "Designed in collaboration with pro esports players, the G Pro X Superlight removes all unnecessary weight while maintaining strength and durability. Features HERO 25K sensor for precise tracking.",
            "specs": {
                "weight": "63g",
                "sensor": "HERO 25K",
                "dpi": "25,600 DPI",
                "polling_rate": "1000 Hz",
                "battery": "70+ hours"
            },
            "compatibility": ["Windows", "macOS", "Logitech G HUB software"]
        },
        {
            "title": "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard",
            "category": "Keyboard",
            "brand": "Razer",
            "price": 229.00,
            "badges": ["New"],
            "rating": 4.7,
            "inventory": 12,
            "images": keyboard_images,
            "short_benefit": "Premium mechanical keyboard with hot-swappable switches",
            "description": "The Razer BlackWidow V4 Pro features Razer's latest mechanical switches with hot-swappable design. Includes programmable macro keys, RGB lighting, and premium build quality for competitive gaming.",
            "specs": {
                "layout": "Full-size (104 keys)",
                "switches": "Razer Green/Yellow/Orange",
                "lighting": "Razer Chroma RGB",
                "connection": "USB-C to USB-A",
                "keycaps": "Doubleshot ABS"
            },
            "compatibility": ["Windows", "macOS", "Razer Synapse software"]
        }
    ]
    
    for product_data in products_data:
        existing = await db.products.find_one({"title": product_data["title"]})
        if not existing:
            product = Product(**product_data)
            await db.products.insert_one(product.dict())

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()