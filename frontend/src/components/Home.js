import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API}/products?limit=6`);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        {/* Animated Background Elements */}
        <div className="hero-grid"></div>
        <div className="scan-line"></div>
        
        {/* Light Beams */}
        <div className="light-beam light-beam-1"></div>
        <div className="light-beam light-beam-2"></div>
        
        {/* Moving Particles */}
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        {/* Light Orbs */}
        <div className="light-orb light-orb-1"></div>
        <div className="light-orb light-orb-2"></div>
        <div className="light-orb light-orb-3"></div>
        
        {/* Energy Dots */}
        <div className="energy-dot"></div>
        <div className="energy-dot"></div>
        <div className="energy-dot"></div>
        <div className="energy-dot"></div>
        <div className="energy-dot"></div>
        
        {/* Circuit Lines */}
        <div className="circuit-line circuit-line-1"></div>
        <div className="circuit-line circuit-line-2"></div>
        <div className="circuit-line circuit-line-3"></div>
        
        <div className="hero-content">
          <h1 className="hero-logo">
            <span className="nxt">NXT</span>
            <span className="lvl">LVL</span>
          </h1>
          <div className="hero-cta">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Slogan Band */}
      <section className="slogan-band">
        <div className="container">
          <p className="slogan-text">
            Improve Your Game. Take It to{' '}
            <span className="slogan-highlight">NXTLVL</span>.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="product-badges">
                    {product.badges.map((badge, index) => (
                      <span key={index} className="badge">{badge}</span>
                    ))}
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-brand">{product.brand}</p>
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
                  <Link 
                    to={`/product/${product.id}`} 
                    className="btn-secondary"
                    style={{ 
                      width: '100%',
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.5rem',
                      right: '1.5rem'
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn-primary">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why NXTLVL Section */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container">
          <h2 className="section-title">Why NXTLVL</h2>
          
          <div className="trust-row">
            <div className="trust-item">
              <Truck size={20} />
              <span>Fast Shipping</span>
            </div>
            <div className="trust-item">
              <RotateCcw size={20} />
              <span>Easy Returns</span>
            </div>
            <div className="trust-item">
              <Shield size={20} />
              <span>Secure Checkout</span>
            </div>
            <div className="trust-item">
              <Zap size={20} />
              <span>Performance Focused</span>
            </div>
          </div>

          <div style={{ 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '3rem auto',
            color: 'var(--muted)',
            lineHeight: '1.8'
          }}>
            <p>
              At NXTLVL, we help gamers push beyond limits with high-performance components 
              and precision-built gear. From GPUs and CPUs to pro-grade peripherals, our 
              curation focuses on real-world FPS gains, thermals, and reliability—so every 
              upgrade moves you closer to victory.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>
                <span style={{ color: 'var(--fg)' }}>NXT</span>
                <span style={{ color: 'var(--nx-green)' }}>LVL</span>
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Performance-focused gaming components and peripherals for serious gamers.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
            
            <div className="footer-section">
              <h3>Categories</h3>
              <Link to="/shop?category=GPU">Graphics Cards</Link>
              <Link to="/shop?category=CPU">Processors</Link>
              <Link to="/shop?category=Keyboard">Gaming Keyboards</Link>
              <Link to="/shop?category=Mouse">Gaming Mice</Link>
            </div>
            
            <div className="footer-section">
              <h3>Follow Us</h3>
              <a href="#" style={{ color: 'var(--muted)' }}>Instagram</a>
              <a href="#" style={{ color: 'var(--muted)' }}>Discord</a>
              <a href="#" style={{ color: 'var(--muted)' }}>TikTok</a>
              <a href="#" style={{ color: 'var(--muted)' }}>YouTube</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 NXTLVL. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;