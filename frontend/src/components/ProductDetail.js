import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Truck, 
  RotateCcw, 
  Shield, 
  CreditCard,
  Zap,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import ProductReviews from './ProductReviews';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productRes, relatedRes] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/products?limit=4`)
        ]);

        setProduct(productRes.data);
        // Filter out current product from related products
        setRelatedProducts(relatedRes.data.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      toast.success(`${quantity}x ${product.title} added to cart!`);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? 'var(--nx-green)' : 'none'}
        color={i < Math.floor(rating) ? 'var(--nx-green)' : 'var(--muted)'}
      />
    ));
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-with-banner" style={{ minHeight: '100vh' }}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Product not found</h2>
          <Link to="/shop" className="btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-with-banner" style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '2rem',
          color: 'var(--muted)',
          fontSize: '0.9rem'
        }}>
          <Link to="/shop" style={{ color: 'var(--nx-green)', textDecoration: 'none' }}>
            Shop
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        {/* Product Details */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          {/* Product Gallery */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <img
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid var(--line)'
                }}
              />
            </div>
            
            {product.images.length > 1 && (
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} - ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: selectedImage === index 
                        ? '2px solid var(--nx-green)' 
                        : '1px solid var(--line)',
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.7
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              {product.badges.map((badge, index) => (
                <span key={index} className="badge" style={{ marginRight: '0.5rem' }}>
                  {badge}
                </span>
              ))}
            </div>

            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800',
              marginBottom: '0.5rem',
              lineHeight: '1.2'
            }}>
              {product.title}
            </h1>

            <p style={{ 
              color: 'var(--muted)', 
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              {product.brand}
            </p>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {renderStars(product.rating)}
              <span style={{ color: 'var(--muted)' }}>
                ({product.rating})
              </span>
            </div>

            <div className="price-large" style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              color: 'var(--nx-green)',
              marginBottom: '0.5rem'
            }}>
              ${product.price.toFixed(2)}
              {product.compare_at_price && (
                <span style={{ 
                  textDecoration: 'line-through', 
                  color: 'var(--muted)', 
                  fontSize: '1.2rem',
                  marginLeft: '1rem'
                }}>
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ 
              color: 'var(--nx-green)', 
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <Zap size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {product.short_benefit}
            </p>

            <p style={{ 
              color: product.inventory > 0 ? 'var(--nx-green)' : '#ff4444',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              {product.inventory > 0 
                ? `✓ ${product.inventory} in stock`
                : '✗ Out of stock'
              }
            </p>

            {/* Quantity and Add to Cart */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ color: 'var(--muted)' }}>Qty:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span style={{ 
                    padding: '0 1rem',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {quantity}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  opacity: product.inventory === 0 ? 0.5 : 1,
                  cursor: product.inventory === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Trust Row */}
            <div className="trust-row" style={{ justifyContent: 'flex-start', margin: '2rem 0' }}>
              <div className="trust-item">
                <Truck size={16} />
                <span>Fast Shipping</span>
              </div>
              <div className="trust-item">
                <RotateCcw size={16} />
                <span>Easy Returns</span>
              </div>
              <div className="trust-item">
                <Shield size={16} />
                <span>Warranty</span>
              </div>
              <div className="trust-item">
                <CreditCard size={16} />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--nx-green)'
          }}>
            Product Description
          </h2>
          <p style={{ 
            lineHeight: '1.8',
            color: 'var(--muted)'
          }}>
            {product.description}
          </p>
        </div>

        {/* Specifications */}
        {Object.keys(product.specs).length > 0 && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--nx-green)'
            }}>
              Specifications
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--line)'
                }}>
                  <span style={{ 
                    color: 'var(--muted)',
                    textTransform: 'capitalize'
                  }}>
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span style={{ color: 'var(--fg)', fontWeight: '600' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatibility */}
        {product.compatibility.length > 0 && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--nx-green)'
            }}>
              Compatibility & Requirements
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {product.compatibility.map((item, index) => (
                <li key={index} style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: 'var(--muted)'
                }}>
                  <Check size={16} color="var(--nx-green)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Reviews */}
        <ProductReviews productId={product.id} productTitle={product.title} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Related Products
            </h2>
            <div className="products-grid">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <div key={relatedProduct.id} className="product-card">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.images[0] || '/placeholder.jpg'}
                      alt={relatedProduct.title}
                      className="product-image"
                      loading="lazy"
                    />
                  </Link>

                  <div className="product-badges">
                    {relatedProduct.badges.map((badge, index) => (
                      <span key={index} className="badge">{badge}</span>
                    ))}
                  </div>

                  <Link to={`/product/${relatedProduct.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-title">{relatedProduct.title}</h3>
                  </Link>
                  
                  <p className="product-brand">{relatedProduct.brand}</p>

                  <div className="product-price">
                    ${relatedProduct.price.toFixed(2)}
                  </div>

                  <p style={{ 
                    color: 'var(--nx-green)', 
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {relatedProduct.short_benefit}
                  </p>

                  <Link 
                    to={`/product/${relatedProduct.id}`}
                    className="btn-secondary"
                    style={{ width: '100%' }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;