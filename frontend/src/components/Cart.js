import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Cart = ({ cart, onUpdateItem, onRemoveItem, sessionId }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemSubtotal = (item) => {
    return item.price * item.quantity;
  };

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <ShoppingBag size={64} color="var(--muted)" style={{ marginBottom: '2rem' }} />
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Your cart is empty
            </h2>
            <p style={{ 
              color: 'var(--muted)', 
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              Discover amazing gaming components and accessories to level up your setup.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-with-banner" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--fg) 0%, var(--nx-green) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Shopping Cart
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '3rem'
        }}>
          {/* Cart Items */}
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.title}
                  className="cart-item-image"
                />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p style={{ 
                    color: 'var(--muted)', 
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    {item.brand}
                  </p>
                  <p className="cart-item-price">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ 
                    padding: '0 1rem',
                    minWidth: '40px',
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div style={{ 
                  textAlign: 'right',
                  minWidth: '100px'
                }}>
                  <p style={{ 
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: 'var(--nx-green)',
                    marginBottom: '0.5rem'
                  }}>
                    ${getItemSubtotal(item).toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      onRemoveItem(item.id);
                      toast.success('Item removed from cart');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div style={{ 
              marginTop: '2rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--line)'
            }}>
              <Link to="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '120px'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'var(--nx-green)'
            }}>
              Order Summary
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                color: 'var(--muted)'
              }}>
                <span>Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                color: 'var(--muted)'
              }}>
                <span>Shipping:</span>
                <span>
                  {getTotalPrice() >= 150 ? (
                    <span style={{ color: 'var(--nx-green)' }}>FREE</span>
                  ) : (
                    '$7.99'
                  )}
                </span>
              </div>

              {getTotalPrice() < 150 && (
                <p style={{ 
                  fontSize: '0.85rem',
                  color: 'var(--nx-green)',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  background: 'rgba(0, 255, 133, 0.1)',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 133, 0.3)'
                }}>
                  Add ${(150 - getTotalPrice()).toFixed(2)} more for FREE shipping!
                </p>
              )}
            </div>

            <div style={{ 
              borderTop: '1px solid var(--line)',
              paddingTop: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: '700'
              }}>
                <span>Total:</span>
                <span style={{ color: 'var(--nx-green)' }}>
                  ${(getTotalPrice() + (getTotalPrice() >= 150 ? 0 : 7.99)).toFixed(2)}
                </span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="btn-primary"
              style={{ 
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>

            <div style={{ 
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(0, 255, 133, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(0, 255, 133, 0.2)'
            }}>
              <h4 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                Order Benefits:
              </h4>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                fontSize: '0.85rem',
                color: 'var(--muted)'
              }}>
                <li style={{ marginBottom: '0.25rem' }}>✓ Fast shipping on all orders</li>
                <li style={{ marginBottom: '0.25rem' }}>✓ 30-day easy returns</li>
                <li style={{ marginBottom: '0.25rem' }}>✓ Secure payment processing</li>
                <li>✓ Manufacturer warranty included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;