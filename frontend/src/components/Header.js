import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';

const Header = ({ cartItemCount = 0 }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="nxt">NXT</span>
          <span className="lvl">LVL</span>
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <Link to="/admin/shopify" className="shopify-admin-link" title="Shopify Admin">
                <Store size={20} />
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart-badge">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;