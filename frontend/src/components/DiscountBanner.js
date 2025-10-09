import React from 'react';
import { Zap, Percent, Clock, Gift } from 'lucide-react';

const DiscountBanner = () => {
  const discountMessages = [
    "🎮 BLACK FRIDAY: UP TO 40% OFF Gaming Components!",
    "⚡ FREE SHIPPING on orders over $150 - Level Up Today!",
    "🔥 Limited Time: RTX 40 Series GPUs Starting at $449",
    "💎 NXTLVL Members Get Extra 10% OFF Everything!",
    "🎯 Price Match Guarantee - We Beat Any Competitor!",
    "⏰ Flash Sale: 24 Hours Only - Gaming Peripherals 30% OFF"
  ];

  return (
    <div className="discount-banner">
      <div className="discount-content">
        <div className="discount-ticker">
          {discountMessages.map((message, index) => (
            <span key={index} className="discount-message">
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;