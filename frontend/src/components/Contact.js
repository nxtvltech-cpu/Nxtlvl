import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <section style={{ 
          textAlign: 'center',
          padding: '3rem 0',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, var(--fg) 0%, var(--nx-green) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Get in Touch
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem',
            color: 'var(--muted)',
            lineHeight: '1.8'
          }}>
            Have questions about products, need build advice, or want to share feedback? 
            We're here to help you take your gaming to the next level.
          </p>
        </section>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          {/* Contact Form */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '2.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'var(--nx-green)'
            }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--muted)',
                  fontWeight: '500'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--muted)',
                  fontWeight: '500'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--muted)',
                  fontWeight: '500'
                }}>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    color: 'var(--fg)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="build-advice">Build Advice</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="order-status">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--muted)',
                  fontWeight: '500'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    color: 'var(--fg)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ 
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem'
                }}
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 style={{ 
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: 'var(--nx-green)'
            }}>
              Contact Information
            </h2>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  background: 'rgba(0, 255, 133, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}>
                  <Mail size={20} color="var(--nx-green)" />
                </div>
                <div>
                  <h4 style={{ 
                    color: 'var(--fg)',
                    marginBottom: '0.25rem',
                    fontWeight: '600'
                  }}>
                    Email
                  </h4>
                  <p style={{ color: 'var(--muted)' }}>support@nxtlvl.gg</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  background: 'rgba(0, 255, 133, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}>
                  <Phone size={20} color="var(--nx-green)" />
                </div>
                <div>
                  <h4 style={{ 
                    color: 'var(--fg)',
                    marginBottom: '0.25rem',
                    fontWeight: '600'
                  }}>
                    Phone
                  </h4>
                  <p style={{ color: 'var(--muted)' }}>+1 (555) NXT-LVLG</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ 
                  background: 'rgba(0, 255, 133, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}>
                  <MapPin size={20} color="var(--nx-green)" />
                </div>
                <div>
                  <h4 style={{ 
                    color: 'var(--fg)',
                    marginBottom: '0.25rem',
                    fontWeight: '600'
                  }}>
                    Location
                  </h4>
                  <p style={{ color: 'var(--muted)' }}>
                    Gaming District<br />
                    Tech City, TC 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div style={{ 
              background: 'rgba(0, 255, 133, 0.05)',
              border: '1px solid rgba(0, 255, 133, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Response Times
              </h4>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                color: 'var(--muted)'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  • Email: Within 24 hours
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  • Phone: Mon-Fri, 9 AM - 6 PM EST
                </li>
                <li>
                  • Technical Support: Same business day
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--nx-green)'
              }}>
                Follow Us
              </h3>
              
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <a 
                  href="#" 
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={16} />
                  Discord
                </a>
                <a 
                  href="#" 
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  YouTube
                </a>
                <a 
                  href="#" 
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Frequently Asked Questions
          </h2>
          
          <p style={{ 
            color: 'var(--muted)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Looking for quick answers? Check out our FAQ section for common questions 
            about products, shipping, returns, and build compatibility.
          </p>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid var(--line)'
            }}>
              <h4 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '0.5rem'
              }}>
                Shipping & Returns
              </h4>
              <p style={{ 
                color: 'var(--muted)',
                fontSize: '0.9rem'
              }}>
                Fast shipping, easy returns, and warranty information
              </p>
            </div>

            <div style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid var(--line)'
            }}>
              <h4 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '0.5rem'
              }}>
                Compatibility
              </h4>
              <p style={{ 
                color: 'var(--muted)',
                fontSize: '0.9rem'
              }}>
                Component compatibility and build requirements
              </p>
            </div>

            <div style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid var(--line)'
            }}>
              <h4 style={{ 
                color: 'var(--nx-green)',
                marginBottom: '0.5rem'
              }}>
                Technical Support
              </h4>
              <p style={{ 
                color: 'var(--muted)',
                fontSize: '0.9rem'
              }}>
                Installation help and troubleshooting guides
              </p>
            </div>
          </div>

          <button className="btn-secondary">
            View All FAQs
          </button>
        </section>
      </div>
    </div>
  );
};

export default Contact;