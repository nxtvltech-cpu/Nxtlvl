// NXTLVL Gaming Theme - Main JavaScript

(function() {
  'use strict';

  // Theme configuration
  const NXTLVL = {
    config: {
      animationsEnabled: true,
      particleCount: 50,
      autoPlayCarousels: true
    },
    
    init: function() {
      this.bindEvents();
      this.initializeComponents();
      this.setupProductInteractions();
      this.initializeCart();
    },

    bindEvents: function() {
      // Product card interactions
      document.addEventListener('click', this.handleProductCardClick.bind(this));
      
      // Cart interactions
      document.addEventListener('click', this.handleCartActions.bind(this));
    },

    initializeComponents: function() {
      this.initializeProductCards();
      this.initializeHeroAnimation();
      this.initializeDiscountBanner();
    },

    initializeProductCards: function() {
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
          this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
          this.classList.remove('hovered');
        });
      });
    },

    initializeHeroAnimation: function() {
      const hero = document.querySelector('.hero');
      if (!hero) return;

      // Add typewriter effect to hero text
      const heroTitle = hero.querySelector('h1');
      if (heroTitle) {
        this.typewriterEffect(heroTitle);
      }
    },

    typewriterEffect: function(element) {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';
      
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    },

    initializeDiscountBanner: function() {
      const banner = document.querySelector('.discount-banner');
      if (!banner) return;

      // Add click-to-close functionality
      banner.addEventListener('click', function() {
        this.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          this.style.display = 'none';
        }, 300);
      });
    },

    setupProductInteractions: function() {
      // Wishlist functionality
      this.initializeWishlist();
    },

    initializeWishlist: function() {
      const wishlistBtns = document.querySelectorAll('[data-wishlist]');
      let wishlist = JSON.parse(localStorage.getItem('nxtlvl-wishlist') || '[]');
      
      wishlistBtns.forEach(btn => {
        const productId = btn.dataset.productId;
        if (wishlist.includes(productId)) {
          btn.classList.add('active');
        }
        
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
            btn.classList.remove('active');
            this.showNotification('Removed from wishlist', 'info');
          } else {
            wishlist.push(productId);
            btn.classList.add('active');
            this.showNotification('Added to wishlist', 'success');
          }
          
          localStorage.setItem('nxtlvl-wishlist', JSON.stringify(wishlist));
        });
      });
    },

    initializeCart: function() {
      // Initialize cart functionality
      this.updateCartCount();
    },

    handleProductCardClick: function(e) {
      if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        const productId = e.target.dataset.productId || e.target.closest('[data-product-id]')?.dataset.productId;
        const variantId = e.target.dataset.variantId;
        
        if (productId) {
          this.addToCart(variantId || productId);
        }
      }
    },

    addToCart: function(variantId, quantity = 1) {
      const formData = {
        items: [{
          id: variantId,
          quantity: quantity
        }]
      };

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        this.showNotification('Added to cart!', 'success');
        this.updateCartCount();
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        this.showNotification('Error adding to cart', 'error');
      });
    },

    updateCartCount: function() {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          const cartCount = document.querySelector('.cart-count');
          if (cartCount) {
            cartCount.textContent = cart.item_count;
            cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
          }
        })
        .catch(error => {
          console.error('Error updating cart count:', error);
        });
    },

    showNotification: function(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
      
      Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--nx-green)' : type === 'error' ? '#FF3366' : 'var(--nx-purple)',
        color: 'var(--bg)',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
      });
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 10);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  };

  // Initialize theme when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NXTLVL.init());
  } else {
    NXTLVL.init();
  }

  // Expose NXTLVL globally for theme customizations
  window.NXTLVL = NXTLVL;

})();