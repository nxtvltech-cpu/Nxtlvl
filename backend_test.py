#!/usr/bin/env python3
"""
NXTLVL Gaming E-commerce Backend API Tests
Testing 9 new gaming products and 3 bundles integration
"""

import requests
import json
import sys
from typing import List, Dict, Any

# API Configuration
BASE_URL = "https://gaming-ecom-1.preview.emergentagent.com/api"

# Expected new products to test
EXPECTED_NEW_PRODUCTS = [
    "AOC 24G2 24\" IPS Gaming Monitor 144Hz",
    "HyperX Alloy FPS Pro Mechanical Gaming Keyboard", 
    "Logitech G502 HERO High Performance Gaming Mouse",
    "Razer Goliathus Extended Gaming Mouse Pad",
    "SteelSeries Arctis 7 Wireless Gaming Headset",
    "Elgato Stream Deck Mini - Live Content Creation Controller",
    "Corsair K70 RGB PRO Mechanical Gaming Keyboard",
    "Razer Basilisk V3 Ergonomic Gaming Mouse",
    "NZXT Kraken X63 280mm AIO Liquid CPU Cooler"
]

# Expected new bundles to test
EXPECTED_BUNDLES = [
    "Ultimate RGB Setup",
    "Pro Streamer Pack", 
    "Essentials Combo"
]

# Expected new categories
EXPECTED_NEW_CATEGORIES = ["Monitor", "Headset", "Mouse Pad", "Streaming"]

# Expected new brands
EXPECTED_NEW_BRANDS = ["AOC", "HyperX", "SteelSeries", "Elgato", "NZXT"]

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.results = {
            'products': {'passed': 0, 'failed': 0, 'details': []},
            'bundles': {'passed': 0, 'failed': 0, 'details': []},
            'categories': {'passed': 0, 'failed': 0, 'details': []},
            'brands': {'passed': 0, 'failed': 0, 'details': []},
            'filtering': {'passed': 0, 'failed': 0, 'details': []},
            'seo': {'passed': 0, 'failed': 0, 'details': []},
            'variants': {'passed': 0, 'failed': 0, 'details': []},
            'relationships': {'passed': 0, 'failed': 0, 'details': []}
        }

    def log_result(self, category: str, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        if passed:
            self.results[category]['passed'] += 1
            status = "✅ PASS"
        else:
            self.results[category]['failed'] += 1
            status = "❌ FAIL"
        
        self.results[category]['details'].append(f"{status}: {test_name} - {details}")
        print(f"{status}: {test_name} - {details}")

    def test_products_endpoint(self):
        """Test GET /api/products endpoint"""
        print("\n=== Testing Products Endpoint ===")
        
        try:
            response = self.session.get(f"{BASE_URL}/products")
            
            if response.status_code != 200:
                self.log_result('products', 'Products API Response', False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
                return
            
            products = response.json()
            
            if not isinstance(products, list):
                self.log_result('products', 'Products Response Format', False, 
                              f"Expected list, got {type(products)}")
                return
            
            self.log_result('products', 'Products API Response', True, 
                          f"Retrieved {len(products)} products")
            
            # Check for new products
            product_titles = [p.get('title', '') for p in products]
            found_new_products = []
            missing_products = []
            
            for expected_product in EXPECTED_NEW_PRODUCTS:
                if expected_product in product_titles:
                    found_new_products.append(expected_product)
                else:
                    missing_products.append(expected_product)
            
            if len(found_new_products) == len(EXPECTED_NEW_PRODUCTS):
                self.log_result('products', 'All 9 New Products Present', True, 
                              f"Found all {len(found_new_products)} new products")
            else:
                self.log_result('products', 'All 9 New Products Present', False, 
                              f"Found {len(found_new_products)}/9. Missing: {missing_products}")
            
            # Test individual product details
            self.test_individual_products(products)
            
        except Exception as e:
            self.log_result('products', 'Products API Request', False, f"Exception: {str(e)}")

    def test_individual_products(self, products: List[Dict]):
        """Test individual product details"""
        print("\n=== Testing Individual Product Details ===")
        
        new_products = [p for p in products if p.get('title') in EXPECTED_NEW_PRODUCTS]
        
        if not new_products:
            self.log_result('products', 'Individual Product Testing', False, 
                          "No new products found to test individually")
            return
        
        # Test first few new products in detail
        for i, product in enumerate(new_products[:3]):  # Test first 3 for efficiency
            product_id = product.get('id')
            product_title = product.get('title', 'Unknown')
            
            try:
                response = self.session.get(f"{BASE_URL}/products/{product_id}")
                
                if response.status_code != 200:
                    self.log_result('products', f'Individual Product {product_title}', False, 
                                  f"Status: {response.status_code}")
                    continue
                
                product_detail = response.json()
                
                # Check required fields
                required_fields = ['id', 'title', 'category', 'brand', 'price', 'description']
                missing_fields = [field for field in required_fields if not product_detail.get(field)]
                
                if missing_fields:
                    self.log_result('products', f'Product Fields {product_title}', False, 
                                  f"Missing fields: {missing_fields}")
                else:
                    self.log_result('products', f'Product Fields {product_title}', True, 
                                  "All required fields present")
                
                # Check SEO fields
                self.test_seo_fields(product_detail, product_title)
                
                # Check variants
                self.test_product_variants(product_detail, product_title)
                
            except Exception as e:
                self.log_result('products', f'Individual Product {product_title}', False, 
                              f"Exception: {str(e)}")

    def test_seo_fields(self, product: Dict, product_title: str):
        """Test SEO fields for a product"""
        seo_fields = ['seo_title', 'seo_description', 'tags']
        seo_present = []
        
        for field in seo_fields:
            if product.get(field):
                seo_present.append(field)
        
        if len(seo_present) >= 2:  # At least 2 SEO fields should be present
            self.log_result('seo', f'SEO Fields {product_title}', True, 
                          f"Present: {seo_present}")
        else:
            self.log_result('seo', f'SEO Fields {product_title}', False, 
                          f"Only found: {seo_present}")

    def test_product_variants(self, product: Dict, product_title: str):
        """Test product variants structure"""
        variants = product.get('variants', [])
        
        if variants and isinstance(variants, list):
            # Check if variants have proper structure
            valid_variants = True
            for variant in variants:
                if not isinstance(variant, dict) or not variant.get('price'):
                    valid_variants = False
                    break
            
            if valid_variants:
                self.log_result('variants', f'Variants {product_title}', True, 
                              f"Found {len(variants)} valid variants")
            else:
                self.log_result('variants', f'Variants {product_title}', False, 
                              "Invalid variant structure")
        else:
            self.log_result('variants', f'Variants {product_title}', True, 
                          "No variants (acceptable)")

    def test_bundles_endpoint(self):
        """Test GET /api/bundles endpoint"""
        print("\n=== Testing Bundles Endpoint ===")
        
        try:
            response = self.session.get(f"{BASE_URL}/bundles")
            
            if response.status_code != 200:
                self.log_result('bundles', 'Bundles API Response', False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
                return
            
            bundles = response.json()
            
            if not isinstance(bundles, list):
                self.log_result('bundles', 'Bundles Response Format', False, 
                              f"Expected list, got {type(bundles)}")
                return
            
            self.log_result('bundles', 'Bundles API Response', True, 
                          f"Retrieved {len(bundles)} bundles")
            
            # Check for expected bundles
            bundle_names = [b.get('name', '') for b in bundles]
            found_bundles = []
            missing_bundles = []
            
            for expected_bundle in EXPECTED_BUNDLES:
                if expected_bundle in bundle_names:
                    found_bundles.append(expected_bundle)
                else:
                    missing_bundles.append(expected_bundle)
            
            if len(found_bundles) == len(EXPECTED_BUNDLES):
                self.log_result('bundles', 'All 3 Expected Bundles Present', True, 
                              f"Found: {found_bundles}")
            else:
                self.log_result('bundles', 'All 3 Expected Bundles Present', False, 
                              f"Found {len(found_bundles)}/3. Missing: {missing_bundles}")
            
            # Test individual bundle details
            self.test_individual_bundles(bundles)
            
        except Exception as e:
            self.log_result('bundles', 'Bundles API Request', False, f"Exception: {str(e)}")

    def test_individual_bundles(self, bundles: List[Dict]):
        """Test individual bundle details and discount calculations"""
        print("\n=== Testing Individual Bundle Details ===")
        
        expected_bundles = [b for b in bundles if b.get('name') in EXPECTED_BUNDLES]
        
        for bundle in expected_bundles:
            bundle_id = bundle.get('id')
            bundle_name = bundle.get('name', 'Unknown')
            
            try:
                response = self.session.get(f"{BASE_URL}/bundles/{bundle_id}")
                
                if response.status_code != 200:
                    self.log_result('bundles', f'Individual Bundle {bundle_name}', False, 
                                  f"Status: {response.status_code}")
                    continue
                
                bundle_detail = response.json()
                
                # Check required fields
                required_fields = ['id', 'name', 'product_ids', 'discount_percentage']
                missing_fields = [field for field in required_fields if bundle_detail.get(field) is None]
                
                if missing_fields:
                    self.log_result('bundles', f'Bundle Fields {bundle_name}', False, 
                                  f"Missing fields: {missing_fields}")
                else:
                    self.log_result('bundles', f'Bundle Fields {bundle_name}', True, 
                                  "All required fields present")
                
                # Check discount percentage
                discount = bundle_detail.get('discount_percentage', 0)
                expected_discounts = {"Ultimate RGB Setup": 15.0, "Pro Streamer Pack": 10.0, "Essentials Combo": 8.0}
                expected_discount = expected_discounts.get(bundle_name, 0)
                
                if discount == expected_discount:
                    self.log_result('bundles', f'Bundle Discount {bundle_name}', True, 
                                  f"Correct discount: {discount}%")
                else:
                    self.log_result('bundles', f'Bundle Discount {bundle_name}', False, 
                                  f"Expected {expected_discount}%, got {discount}%")
                
            except Exception as e:
                self.log_result('bundles', f'Individual Bundle {bundle_name}', False, 
                              f"Exception: {str(e)}")

    def test_categories_endpoint(self):
        """Test GET /api/categories endpoint"""
        print("\n=== Testing Categories Endpoint ===")
        
        try:
            response = self.session.get(f"{BASE_URL}/categories")
            
            if response.status_code != 200:
                self.log_result('categories', 'Categories API Response', False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
                return
            
            categories = response.json()
            
            if not isinstance(categories, list):
                self.log_result('categories', 'Categories Response Format', False, 
                              f"Expected list, got {type(categories)}")
                return
            
            self.log_result('categories', 'Categories API Response', True, 
                          f"Retrieved {len(categories)} categories")
            
            # Check for new categories
            category_names = [c.get('name', '') for c in categories]
            found_categories = []
            missing_categories = []
            
            for expected_category in EXPECTED_NEW_CATEGORIES:
                if expected_category in category_names:
                    found_categories.append(expected_category)
                else:
                    missing_categories.append(expected_category)
            
            if len(found_categories) == len(EXPECTED_NEW_CATEGORIES):
                self.log_result('categories', 'New Categories Present', True, 
                              f"Found: {found_categories}")
            else:
                self.log_result('categories', 'New Categories Present', False, 
                              f"Found {len(found_categories)}/{len(EXPECTED_NEW_CATEGORIES)}. Missing: {missing_categories}")
            
        except Exception as e:
            self.log_result('categories', 'Categories API Request', False, f"Exception: {str(e)}")

    def test_brands_endpoint(self):
        """Test GET /api/brands endpoint"""
        print("\n=== Testing Brands Endpoint ===")
        
        try:
            response = self.session.get(f"{BASE_URL}/brands")
            
            if response.status_code != 200:
                self.log_result('brands', 'Brands API Response', False, 
                              f"Status code: {response.status_code}, Response: {response.text}")
                return
            
            brands = response.json()
            
            if not isinstance(brands, list):
                self.log_result('brands', 'Brands Response Format', False, 
                              f"Expected list, got {type(brands)}")
                return
            
            self.log_result('brands', 'Brands API Response', True, 
                          f"Retrieved {len(brands)} brands")
            
            # Check for new brands
            brand_names = [b.get('name', '') for b in brands]
            found_brands = []
            missing_brands = []
            
            for expected_brand in EXPECTED_NEW_BRANDS:
                if expected_brand in brand_names:
                    found_brands.append(expected_brand)
                else:
                    missing_brands.append(expected_brand)
            
            if len(found_brands) == len(EXPECTED_NEW_BRANDS):
                self.log_result('brands', 'New Brands Present', True, 
                              f"Found: {found_brands}")
            else:
                self.log_result('brands', 'New Brands Present', False, 
                              f"Found {len(found_brands)}/{len(EXPECTED_NEW_BRANDS)}. Missing: {missing_brands}")
            
        except Exception as e:
            self.log_result('brands', 'Brands API Request', False, f"Exception: {str(e)}")

    def test_product_filtering(self):
        """Test product filtering by categories and brands"""
        print("\n=== Testing Product Filtering ===")
        
        # Test filtering by new categories
        for category in EXPECTED_NEW_CATEGORIES[:2]:  # Test first 2 for efficiency
            try:
                response = self.session.get(f"{BASE_URL}/products", params={'category': category})
                
                if response.status_code == 200:
                    products = response.json()
                    if products and all(p.get('category') == category for p in products):
                        self.log_result('filtering', f'Filter by Category {category}', True, 
                                      f"Found {len(products)} products")
                    else:
                        self.log_result('filtering', f'Filter by Category {category}', False, 
                                      "Filtering not working correctly")
                else:
                    self.log_result('filtering', f'Filter by Category {category}', False, 
                                  f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_result('filtering', f'Filter by Category {category}', False, 
                              f"Exception: {str(e)}")
        
        # Test filtering by new brands
        for brand in EXPECTED_NEW_BRANDS[:2]:  # Test first 2 for efficiency
            try:
                response = self.session.get(f"{BASE_URL}/products", params={'brand': brand})
                
                if response.status_code == 200:
                    products = response.json()
                    if products and all(p.get('brand') == brand for p in products):
                        self.log_result('filtering', f'Filter by Brand {brand}', True, 
                                      f"Found {len(products)} products")
                    else:
                        self.log_result('filtering', f'Filter by Brand {brand}', False, 
                                      "Filtering not working correctly")
                else:
                    self.log_result('filtering', f'Filter by Brand {brand}', False, 
                                  f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_result('filtering', f'Filter by Brand {brand}', False, 
                              f"Exception: {str(e)}")

    def test_frequently_bought_together(self):
        """Test frequently bought together relationships"""
        print("\n=== Testing Frequently Bought Together ===")
        
        try:
            # Get all products first
            response = self.session.get(f"{BASE_URL}/products")
            if response.status_code != 200:
                self.log_result('relationships', 'Get Products for Relationships', False, 
                              f"Status: {response.status_code}")
                return
            
            products = response.json()
            new_products = [p for p in products if p.get('title') in EXPECTED_NEW_PRODUCTS]
            
            relationships_found = 0
            for product in new_products[:3]:  # Test first 3 for efficiency
                frequently_bought = product.get('frequently_bought_together', [])
                if frequently_bought:
                    relationships_found += 1
                    self.log_result('relationships', f'Relationships for {product.get("title", "Unknown")}', True, 
                                  f"Found {len(frequently_bought)} related products")
            
            if relationships_found > 0:
                self.log_result('relationships', 'Frequently Bought Together Feature', True, 
                              f"Found relationships in {relationships_found} products")
            else:
                self.log_result('relationships', 'Frequently Bought Together Feature', False, 
                              "No relationships found in tested products")
                
        except Exception as e:
            self.log_result('relationships', 'Frequently Bought Together Test', False, 
                          f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting NXTLVL Gaming E-commerce Backend Tests")
        print(f"🔗 Testing API at: {BASE_URL}")
        
        # Run all test suites
        self.test_products_endpoint()
        self.test_bundles_endpoint()
        self.test_categories_endpoint()
        self.test_brands_endpoint()
        self.test_product_filtering()
        self.test_frequently_bought_together()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "="*60)
        print("🏁 TEST RESULTS SUMMARY")
        print("="*60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.results.items():
            passed = results['passed']
            failed = results['failed']
            total_passed += passed
            total_failed += failed
            
            status_icon = "✅" if failed == 0 else "❌"
            print(f"{status_icon} {category.upper()}: {passed} passed, {failed} failed")
            
            # Show failed tests details
            if failed > 0:
                for detail in results['details']:
                    if "❌ FAIL" in detail:
                        print(f"   {detail}")
        
        print("-" * 60)
        print(f"🎯 OVERALL: {total_passed} passed, {total_failed} failed")
        
        if total_failed == 0:
            print("🎉 ALL TESTS PASSED! Backend is working correctly.")
        else:
            print(f"⚠️  {total_failed} tests failed. Review details above.")
        
        return total_failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)