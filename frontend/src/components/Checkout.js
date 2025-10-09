import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  Truck, 
  Check, 
  Lock, 
  AlertCircle,
  ChevronDown,
  Smartphone,
  Wallet
} from 'lucide-react';
import { toast } from 'sonner';

const Checkout = ({ cart, sessionId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [orderStep, setOrderStep] = useState('payment'); // payment, processing, success
  
  const [formData, setFormData] = useState({
    // Billing Information
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional Options
    sameAsBilling: true,
    newsletter: false,
    saveInfo: false
  });

  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 150 ? 0 : 7.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Check if coming from successful payment
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      setOrderStep('success');
    }
    
    // Redirect if cart is empty
    if (cart.length === 0 && orderStep !== 'success') {
      navigate('/cart');
    }
  }, [cart, navigate, searchParams, orderStep]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = {
      email: 'Email is required',
      firstName: 'First name is required', 
      lastName: 'Last name is required',
      address: 'Address is required',
      city: 'City is required',
      state: 'State is required',
      zipCode: 'ZIP code is required'
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field].trim()) {
        newErrors[field] = message;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Payment method specific validation
    if (selectedPayment === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment success
      setOrderStep('success');
      toast.success('Order placed successfully!');
      
      // Clear cart (you might want to do this via API)
      // clearCart();
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (orderStep === 'success') {
    return (
      <div className="page-with-banner" style={{ minHeight: '100vh' }}>
        <div className="container">
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <div style={{ 
              background: 'rgba(0, 255, 133, 0.1)',
              borderRadius: '50%',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              border: '3px solid var(--nx-green)'
            }}>
              <Check size={48} color="var(--nx-green)" />
            </div>
            
            <h1 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              color: 'var(--nx-green)'
            }}>
              Order Confirmed!
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem',
              color: 'var(--muted)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Thank you for your order! We've sent a confirmation email with your order details and tracking information.
            </p>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
              textAlign: 'left'
            }}>
              <h3 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '1rem'
              }}>
                Order Summary
              </h3>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Order #</span>
                <span style={{ fontFamily: 'monospace' }}>NXTLVL-{Date.now().toString(36).toUpperCase()}</span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Total Paid</span>
                <span style={{ color: 'var(--nx-green)', fontWeight: '700' }}>
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                color: 'var(--muted)'
              }}>
                <span>Payment Method</span>
                <span>{selectedPayment === 'card' ? 'Credit Card' : selectedPayment}</span>
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => navigate('/shop')}
                className="btn-primary"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-with-banner" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Checkout Form */}
          <div>
            <h1 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, var(--fg) 0%, var(--nx-green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Checkout
            </h1>

            <form onSubmit={handleSubmitOrder}>
              {/* Contact Information */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ 
                  color: 'var(--nx-green)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Shield size={20} />
                  Contact Information
                </h3>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'var(--muted)',
                      fontWeight: '500'
                    }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.firstName ? '1px solid #ff4444' : '1px solid var(--line)',
                        borderRadius: '6px',
                        color: 'var(--fg)',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.firstName && (
                      <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'var(--muted)',
                      fontWeight: '500'
                    }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.lastName ? '1px solid #ff4444' : '1px solid var(--line)',
                        borderRadius: '6px',
                        color: 'var(--fg)',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.lastName && (
                      <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--muted)',
                    fontWeight: '500'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.email ? '1px solid #ff4444' : '1px solid var(--line)',
                      borderRadius: '6px',
                      color: 'var(--fg)',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--muted)',
                    fontWeight: '500'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--line)',
                      borderRadius: '6px',
                      color: 'var(--fg)',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ 
                  color: 'var(--nx-green)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Truck size={20} />
                  Shipping Address
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--muted)',
                    fontWeight: '500'
                  }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.address ? '1px solid #ff4444' : '1px solid var(--line)',
                      borderRadius: '6px',
                      color: 'var(--fg)',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.address && (
                    <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                      {errors.address}
                    </span>
                  )}
                </div>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'var(--muted)',
                      fontWeight: '500'
                    }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.city ? '1px solid #ff4444' : '1px solid var(--line)',
                        borderRadius: '6px',
                        color: 'var(--fg)',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.city && (
                      <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'var(--muted)',
                      fontWeight: '500'
                    }}>
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="CA"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.state ? '1px solid #ff4444' : '1px solid var(--line)',
                        borderRadius: '6px',
                        color: 'var(--fg)',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.state && (
                      <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                        {errors.state}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'var(--muted)',
                      fontWeight: '500'
                    }}>
                      ZIP *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="12345"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.zipCode ? '1px solid #ff4444' : '1px solid var(--line)',
                        borderRadius: '6px',
                        color: 'var(--fg)',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.zipCode && (
                      <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                        {errors.zipCode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ 
                  color: 'var(--nx-green)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Lock size={20} />
                  Payment Method
                </h3>

                {/* Payment Method Options */}
                <div style={{ 
                  display: 'grid',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {/* Credit Card */}
                  <div 
                    onClick={() => setSelectedPayment('card')}
                    style={{ 
                      border: selectedPayment === 'card' ? '2px solid var(--nx-green)' : '1px solid var(--line)',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      background: selectedPayment === 'card' ? 'rgba(0, 255, 133, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CreditCard size={20} color={selectedPayment === 'card' ? 'var(--nx-green)' : 'var(--muted)'} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ 
                            fontWeight: '600',
                            color: selectedPayment === 'card' ? 'var(--nx-green)' : 'var(--fg)'
                          }}>
                            Credit or Debit Card
                          </span>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {/* Visa Logo */}
                            <div className="payment-logo visa-logo">VISA</div>
                            {/* MasterCard Logo */}
                            <div className="payment-logo mastercard-logo">
                              <div className="mc-circle mc-red"></div>
                              <div className="mc-circle mc-yellow"></div>
                            </div>
                            {/* American Express Logo */}
                            <div className="payment-logo amex-logo">AMEX</div>
                            {/* Discover Logo */}
                            <div className="payment-logo discover-logo">DISC</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: selectedPayment === 'card' ? '6px solid var(--nx-green)' : '2px solid var(--line)',
                        background: selectedPayment === 'card' ? 'transparent' : 'transparent'
                      }} />
                    </div>
                  </div>

                  {/* PayPal */}
                  <div 
                    onClick={() => setSelectedPayment('paypal')}
                    style={{ 
                      border: selectedPayment === 'paypal' ? '2px solid var(--nx-green)' : '1px solid var(--line)',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      background: selectedPayment === 'paypal' ? 'rgba(0, 255, 133, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Wallet size={20} color={selectedPayment === 'paypal' ? 'var(--nx-green)' : 'var(--muted)'} />
                        <span style={{ 
                          fontWeight: '600',
                          color: selectedPayment === 'paypal' ? 'var(--nx-green)' : 'var(--fg)'
                        }}>
                          PayPal
                        </span>
                      </div>
                      <div style={{ 
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: selectedPayment === 'paypal' ? '6px solid var(--nx-green)' : '2px solid var(--line)',
                        background: selectedPayment === 'paypal' ? 'transparent' : 'transparent'
                      }} />
                    </div>
                  </div>

                  {/* Apple Pay */}
                  <div 
                    onClick={() => setSelectedPayment('apple')}
                    style={{ 
                      border: selectedPayment === 'apple' ? '2px solid var(--nx-green)' : '1px solid var(--line)',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      background: selectedPayment === 'apple' ? 'rgba(0, 255, 133, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Smartphone size={20} color={selectedPayment === 'apple' ? 'var(--nx-green)' : 'var(--muted)'} />
                        <span style={{ 
                          fontWeight: '600',
                          color: selectedPayment === 'apple' ? 'var(--nx-green)' : 'var(--fg)'
                        }}>
                          Apple Pay
                        </span>
                      </div>
                      <div style={{ 
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: selectedPayment === 'apple' ? '6px solid var(--nx-green)' : '2px solid var(--line)',
                        background: selectedPayment === 'apple' ? 'transparent' : 'transparent'
                      }} />
                    </div>
                  </div>
                </div>

                {/* Credit Card Form */}
                {selectedPayment === 'card' && (
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--muted)',
                        fontWeight: '500'
                      }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: errors.cardNumber ? '1px solid #ff4444' : '1px solid var(--line)',
                          borderRadius: '6px',
                          color: 'var(--fg)',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.cardNumber && (
                        <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                          {errors.cardNumber}
                        </span>
                      )}
                    </div>

                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: '1fr 100px 100px',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <label style={{ 
                          display: 'block',
                          marginBottom: '0.5rem',
                          color: 'var(--muted)',
                          fontWeight: '500'
                        }}>
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: errors.cardName ? '1px solid #ff4444' : '1px solid var(--line)',
                            borderRadius: '6px',
                            color: 'var(--fg)',
                            fontSize: '1rem'
                          }}
                        />
                        {errors.cardName && (
                          <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                            {errors.cardName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label style={{ 
                          display: 'block',
                          marginBottom: '0.5rem',
                          color: 'var(--muted)',
                          fontWeight: '500'
                        }}>
                          Expiry *
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: errors.expiryDate ? '1px solid #ff4444' : '1px solid var(--line)',
                            borderRadius: '6px',
                            color: 'var(--fg)',
                            fontSize: '1rem'
                          }}
                        />
                        {errors.expiryDate && (
                          <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                            {errors.expiryDate}
                          </span>
                        )}
                      </div>

                      <div>
                        <label style={{ 
                          display: 'block',
                          marginBottom: '0.5rem',
                          color: 'var(--muted)',
                          fontWeight: '500'
                        }}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                          placeholder="123"
                          maxLength="4"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: errors.cvv ? '1px solid #ff4444' : '1px solid var(--line)',
                            borderRadius: '6px',
                            color: 'var(--fg)',
                            fontSize: '1rem'
                          }}
                        />
                        {errors.cvv && (
                          <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>
                            {errors.cvv}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Alternative Payment Methods Info */}
                {selectedPayment === 'paypal' && (
                  <div style={{ 
                    background: 'rgba(0, 102, 204, 0.1)',
                    border: '1px solid rgba(0, 102, 204, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    color: 'var(--muted)'
                  }}>
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                {selectedPayment === 'apple' && (
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '1rem',
                    color: 'var(--muted)'
                  }}>
                    <p>Touch ID or Face ID required to complete payment with Apple Pay.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ 
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Complete Order - ${total.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ 
            position: 'sticky',
            top: '120px',
            height: 'fit-content'
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'var(--nx-green)'
              }}>
                Order Summary
              </h3>

              {/* Cart Items */}
              <div style={{ marginBottom: '1.5rem' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ 
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--line)'
                  }}>
                    <img
                      src={item.images?.[0] || '/placeholder.jpg'}
                      alt={item.title}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        lineHeight: '1.3'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--muted)',
                        fontSize: '0.85rem',
                        marginBottom: '0.25rem'
                      }}>
                        Qty: {item.quantity}
                      </p>
                      <p style={{ 
                        color: 'var(--nx-green)',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ 
                borderTop: '1px solid var(--line)',
                paddingTop: '1.5rem'
              }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span style={{ color: 'var(--nx-green)' }}>FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--nx-green)',
                  borderTop: '1px solid var(--line)',
                  paddingTop: '1rem'
                }}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div style={{ 
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(0, 255, 133, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0, 255, 133, 0.2)'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <Shield size={16} color="var(--nx-green)" />
                  <span style={{ 
                    color: 'var(--nx-green)',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Secure Checkout
                  </span>
                </div>
                <p style={{ 
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                  lineHeight: '1.4'
                }}>
                  Your payment information is encrypted and secure. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;