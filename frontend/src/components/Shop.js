import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    priceMin: searchParams.get('price_min') || '',
    priceMax: searchParams.get('price_max') || '',
    inStock: searchParams.get('in_stock') === 'true',
    sortBy: searchParams.get('sort_by') || 'created_at'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          axios.get(`${API}/products`, {
            params: {
              category: filters.category || undefined,
              brand: filters.brand || undefined,
              price_min: filters.priceMin || undefined,
              price_max: filters.priceMax || undefined,
              in_stock: filters.inStock || undefined,
              sort_by: filters.sortBy,
              limit: 50
            }
          }),
          axios.get(`${API}/categories`),
          axios.get(`${API}/brands`)
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newParams.set(k, v);
    });
    setSearchParams(newParams);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.floor(rating) ? 'var(--nx-green)' : 'none'}
        color={i < Math.floor(rating) ? 'var(--nx-green)' : 'var(--muted)'}
      />
    ));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '300px 1fr', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Filters Sidebar */}
          <div className="filters">
            <h3 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '1.5rem',
              color: 'var(--nx-green)'
            }}>
              <Filter size={20} />
              Filters
            </h3>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Min Price ($)</label>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="filter-group">
              <label>Max Price ($)</label>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                placeholder="2000"
              />
            </div>

            <div className="filter-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                In Stock Only
              </label>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="created_at">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--fg) 0%, var(--nx-green) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Gaming Components & Accessories
              </h1>
              <p style={{ color: 'var(--muted)' }}>
                {products.length} products found
              </p>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0] || '/placeholder.jpg'}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                      />
                    </Link>

                    <div className="product-badges">
                      {product.badges.map((badge, index) => (
                        <span key={index} className="badge">{badge}</span>
                      ))}
                    </div>

                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h3 className="product-title">{product.title}</h3>
                    </Link>
                    
                    <p className="product-brand">{product.brand}</p>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      {renderStars(product.rating)}
                      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                        ({product.rating})
                      </span>
                    </div>

                    <div className="product-price">
                      ${product.price.toFixed(2)}
                      {product.compare_at_price && (
                        <span style={{ 
                          textDecoration: 'line-through', 
                          color: 'var(--muted)', 
                          fontSize: '0.9rem',
                          marginLeft: '0.5rem'
                        }}>
                          ${product.compare_at_price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="product-benefit">
                      {product.short_benefit}
                    </p>

                    <p className="product-stock" style={{ 
                      color: product.inventory > 0 ? 'var(--nx-green)' : '#ff4444'
                    }}>
                      {product.inventory > 0 
                        ? `${product.inventory} in stock`
                        : 'Out of stock'
                      }
                    </p>

                    <button
                      className="add-to-cart-btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.inventory === 0}
                      style={{
                        opacity: product.inventory === 0 ? 0.5 : 1,
                        cursor: product.inventory === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem',
                color: 'var(--muted)'
              }}>
                <p>No products found matching your criteria.</p>
                <button 
                  className="btn-secondary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    setFilters({
                      category: '',
                      brand: '',
                      priceMin: '',
                      priceMax: '',
                      inStock: false,
                      sortBy: 'created_at'
                    });
                    setSearchParams(new URLSearchParams());
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;