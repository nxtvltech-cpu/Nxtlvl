import requests
import sys
import json
from datetime import datetime

class NXTLVLAPITester:
    def __init__(self, base_url="https://nxtlvl-gaming.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test-session-{datetime.now().strftime('%H%M%S')}"

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    else:
                        print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text and response.status_code < 500 else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"email": "admin@nxtlvl.gg", "password": "admin123"}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_get_products(self):
        """Test getting all products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        return response if success else []

    def test_get_products_with_filters(self):
        """Test product filtering"""
        filters = [
            ("category=GPU", "GPU Category Filter"),
            ("brand=ASUS ROG", "ASUS ROG Brand Filter"),
            ("price_min=100&price_max=500", "Price Range Filter"),
            ("in_stock=true", "In Stock Filter"),
            ("sort_by=price", "Price Sort"),
            ("sort_by=-rating", "Rating Sort Desc")
        ]
        
        for filter_param, test_name in filters:
            self.run_test(
                test_name,
                "GET",
                f"products?{filter_param}",
                200
            )

    def test_get_single_product(self, product_id):
        """Test getting a single product"""
        success, response = self.run_test(
            "Get Single Product",
            "GET",
            f"products/{product_id}",
            200
        )
        return success

    def test_get_categories(self):
        """Test getting categories"""
        success, response = self.run_test(
            "Get Categories",
            "GET",
            "categories",
            200
        )
        return response if success else []

    def test_get_brands(self):
        """Test getting brands"""
        success, response = self.run_test(
            "Get Brands",
            "GET",
            "brands",
            200
        )
        return response if success else []

    def test_cart_operations(self):
        """Test cart CRUD operations"""
        # Get empty cart
        success, cart = self.run_test(
            "Get Empty Cart",
            "GET",
            f"cart/{self.session_id}",
            200
        )
        
        if not success:
            return False

        # Add item to cart (using a test product)
        test_item = {
            "product_id": "test-product-id",
            "quantity": 2,
            "price": 99.99
        }
        
        success, _ = self.run_test(
            "Add Item to Cart",
            "POST",
            f"cart/{self.session_id}/items",
            200,
            data=test_item
        )

        # Update cart item
        success, _ = self.run_test(
            "Update Cart Item",
            "PUT",
            f"cart/{self.session_id}/items/test-product-id?quantity=3",
            200
        )

        # Remove cart item
        success, _ = self.run_test(
            "Remove Cart Item",
            "DELETE",
            f"cart/{self.session_id}/items/test-product-id",
            200
        )

        return True

    def test_admin_product_operations(self):
        """Test admin product CRUD operations"""
        if not self.token:
            print("❌ No admin token available for admin tests")
            return False

        # Create test product
        test_product = {
            "title": "Test Gaming Product",
            "category": "GPU",
            "brand": "Test Brand",
            "price": 299.99,
            "compare_at_price": 349.99,
            "badges": ["Test"],
            "rating": 4.5,
            "inventory": 10,
            "images": ["https://example.com/test.jpg"],
            "short_benefit": "Test benefit",
            "description": "Test description",
            "specs": {"test": "value"},
            "compatibility": ["Test compatibility"],
            "published": True
        }

        success, response = self.run_test(
            "Create Product (Admin)",
            "POST",
            "admin/products",
            200,
            data=test_product
        )

        if success and 'id' in response:
            product_id = response['id']
            
            # Update product
            test_product['title'] = "Updated Test Gaming Product"
            self.run_test(
                "Update Product (Admin)",
                "PUT",
                f"admin/products/{product_id}",
                200,
                data=test_product
            )

            # Delete product
            self.run_test(
                "Delete Product (Admin)",
                "DELETE",
                f"admin/products/{product_id}",
                200
            )

        return success

def main():
    print("🎮 NXTLVL Gaming E-commerce API Testing")
    print("=" * 50)
    
    tester = NXTLVLAPITester()

    # Test public endpoints first
    print("\n📦 Testing Public Product APIs...")
    products = tester.test_get_products()
    
    if products:
        print(f"   Found {len(products)} products")
        # Test single product with first product ID
        if len(products) > 0:
            first_product_id = products[0].get('id')
            if first_product_id:
                tester.test_get_single_product(first_product_id)
    
    tester.test_get_products_with_filters()
    
    print("\n🏷️ Testing Categories and Brands...")
    categories = tester.test_get_categories()
    brands = tester.test_get_brands()
    
    if categories:
        print(f"   Found {len(categories)} categories")
    if brands:
        print(f"   Found {len(brands)} brands")

    print("\n🛒 Testing Cart Operations...")
    tester.test_cart_operations()

    print("\n🔐 Testing Admin Authentication...")
    admin_login_success = tester.test_admin_login()
    
    if admin_login_success:
        print("\n👨‍💼 Testing Admin Product Operations...")
        tester.test_admin_product_operations()
    else:
        print("❌ Admin login failed, skipping admin tests")

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())