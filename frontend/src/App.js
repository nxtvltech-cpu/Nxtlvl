import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from './components/ui/sonner';

function App() {
  const [cart, setCart] = useState([]);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('nxtlvl-session');
    if (!id) {
      id = 'session-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('nxtlvl-session', id);
    }
    return id;
  });

  // Scroll progress bar effect
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      const progressBar = document.getElementById('nx-progress');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
        
        if (progress > 99) {
          progressBar.classList.add('pulse');
          setTimeout(() => progressBar.classList.remove('pulse'), 300);
        }
      }
    };

    const progressBar = document.createElement('div');
    progressBar.id = 'nx-progress';
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    document.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      document.removeEventListener('scroll', updateScrollProgress);
      const element = document.getElementById('nx-progress');
      if (element) element.remove();
    };
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="App">
      <Router>
        <Header cartItemCount={getCartItemCount()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                onUpdateItem={updateCartItem}
                onRemoveItem={removeFromCart}
                sessionId={sessionId}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cart={cart} 
                sessionId={sessionId}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;