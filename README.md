# NXTLVL Gaming E-Commerce Platform 🎮

A complete full-stack gaming e-commerce platform built with React, FastAPI, and MongoDB.

![NXTLVL Logo](https://img.shields.io/badge/NXTLVL-Gaming%20Platform-00FF85?style=for-the-badge)

## 🚀 Features

### 🎯 Core E-Commerce Functionality
- **Product Catalog**: Gaming GPUs, CPUs, RAM, keyboards, mice with detailed specs
- **Shopping Cart**: Add/remove items, quantity controls, session persistence
- **Advanced Filtering**: Category, brand, price range, in-stock filters
- **Product Detail Pages**: Image galleries, specs tables, compatibility info
- **Order Management**: Subtotal calculation, FREE shipping over $150
- **Admin Panel**: JWT authentication for product management

### 🎨 Design & UX
- **Brand Identity**: Black (#0A0A0A) + Neon Green (#00FF85) color scheme
- **Responsive Design**: Desktop, tablet, and mobile optimized
- **Smooth Animations**: Hover effects, neon glows, scroll progress bar
- **Gaming Focus**: Professional product photography and gaming-specific content

### 🔧 Technical Stack
- **Frontend**: React 19, React Router, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI, Python 3.11, JWT Authentication
- **Database**: MongoDB with Motor (async)
- **Images**: High-quality Unsplash gaming hardware images

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.11+
- MongoDB

### 1. Clone & Install Dependencies

```bash
# Frontend setup
cd frontend
yarn install

# Backend setup  
cd ../backend
pip install -r requirements.txt
```

### 2. Environment Configuration

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=nxtlvl_gaming
JWT_SECRET_KEY=your-secret-key-here
CORS_ORIGINS=*
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 3. Start the Application

```bash
# Start MongoDB (if not running)
mongod

# Start Backend (Terminal 1)
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Start Frontend (Terminal 2) 
cd frontend
yarn start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **Admin Login**: admin@nxtlvl.gg / admin123

## 📁 Project Structure

```
nxtlvl-gaming/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── Header.js   # Navigation header
│   │   │   ├── Home.js     # Homepage component
│   │   │   ├── Shop.js     # Product catalog
│   │   │   ├── ProductDetail.js # Product pages
│   │   │   ├── Cart.js     # Shopping cart
│   │   │   ├── About.js    # About page
│   │   │   └── Contact.js  # Contact page
│   │   ├── App.js          # Main application
│   │   ├── App.css         # Global styles
│   │   └── index.js        # Application entry
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── backend/                 # FastAPI backend application
│   ├── server.py           # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── README.md              # This file
```

## 🎮 Pre-loaded Gaming Products

The platform comes with 6 pre-seeded gaming products:

1. **ASUS ROG Strix GeForce RTX 4070 Ti SUPER 16GB** - $899
2. **MSI GeForce RTX 4060 Ti Gaming X 8GB** - $449  
3. **AMD Ryzen 7 7800X3D 8-Core Processor** - $399
4. **Corsair Vengeance DDR5-5600 32GB** - $129
5. **Logitech G Pro X Superlight Gaming Mouse** - $149
6. **Razer BlackWidow V4 Pro Mechanical Keyboard** - $229

## 🔧 API Endpoints

### Public Endpoints
```
GET    /api/products              # Get products with filters
GET    /api/products/{id}         # Get single product  
GET    /api/categories            # Get all categories
GET    /api/brands                # Get all brands
GET    /api/cart/{session_id}     # Get cart
POST   /api/cart/{session_id}/items  # Add item to cart
PUT    /api/cart/{session_id}/items/{product_id}  # Update cart item
DELETE /api/cart/{session_id}/items/{product_id}  # Remove from cart
```

### Admin Endpoints (Requires Authentication)
```
POST   /api/auth/login            # Admin login
POST   /api/admin/products        # Create product
PUT    /api/admin/products/{id}   # Update product  
DELETE /api/admin/products/{id}   # Delete product
```

## 🎨 Brand Guidelines

### Colors
- **Primary Background**: `#0A0A0A` (Deep Black)
- **Accent Neon Green**: `#00FF85` (Brand Color)  
- **Secondary Purple**: `#8A2BE2` (Accent)
- **Text Colors**: `#FFFFFF` (White), `#C0C0C0` (Muted)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Logo**: "NXT" (white) + "LVL" (neon green)
- **Weights**: 300-900 available

### Design Principles
- Gaming-focused dark theme
- Neon accents and glows
- Performance-oriented messaging
- Professional product presentation

## 🚀 Deployment Options

### Option 1: Vercel + Railway/Heroku
```bash
# Frontend on Vercel
vercel --prod

# Backend on Railway
railway login
railway init
railway up
```

### Option 2: Netlify + Render
```bash
# Frontend on Netlify  
netlify deploy --prod

# Backend on Render
# Connect GitHub repo to Render
```

### Option 3: Full Docker Deployment
```dockerfile
# Dockerfile examples included for containerization
docker-compose up -d
```

## 📈 Performance Features

- **Optimized Images**: WebP format with lazy loading
- **Code Splitting**: React.lazy for route-based splitting  
- **MongoDB Indexing**: Optimized queries for products
- **Responsive Design**: Mobile-first approach
- **SEO Ready**: Meta tags and structured data

## 🔒 Security Features

- **JWT Authentication**: Secure admin access
- **Password Hashing**: bcrypt for admin passwords
- **Input Validation**: Pydantic models for API validation
- **CORS Configuration**: Configurable origins
- **Rate Limiting**: Built-in FastAPI protections

## 🛠️ Customization

### Adding New Products
```python
# Use admin panel or API
POST /api/admin/products
{
  "title": "New Gaming Product",
  "category": "GPU",
  "brand": "NVIDIA",
  "price": 599.99,
  "description": "Product description...",
  "specs": {"vram": "12GB"},
  "compatibility": ["PCIe 4.0"]
}
```

### Adding New Categories
```python
# Add to startup_event in server.py
categories_data.append({
  "name": "Monitors", 
  "slug": "monitors",
  "description": "Gaming Monitors"
})
```

## 📞 Support & Contact

- **Platform**: Built for NXTLVL Gaming
- **Tech Stack**: React + FastAPI + MongoDB
- **License**: MIT License
- **Support**: Contact admin@nxtlvl.gg

---

**🎮 Take Your Gaming to the NXTLVL! 🎮**

Built with ❤️ for the gaming community
