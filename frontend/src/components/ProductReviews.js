import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Shield, Camera } from 'lucide-react';

const ProductReviews = ({ productId, productTitle }) => {
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Mock review data - in a real app, this would come from your API
  const mockReviews = [
    {
      id: 1,
      username: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      content: "Absolutely insane performance! Upgraded from a GTX 1070 and the difference is night and day. Running Cyberpunk 2077 at 1440p ultra settings with RTX on and getting solid 75+ FPS. The cooling is whisper quiet even under full load. NXTLVL shipping was lightning fast - ordered Monday, arrived Wednesday. This is exactly what I needed to take my gaming to the next level!",
      helpful: 24,
      unhelpful: 1,
      images: []
    },
    {
      id: 2,
      username: "Sarah Thompson",
      avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
      rating: 5,
      date: "1 month ago",
      verified: true,
      content: "Coming from someone who's tested dozens of GPUs, this is a beast. The ASUS ROG Strix cooling solution is top-tier - never goes above 68°C even during stress testing. Memory bandwidth is incredible for 1440p and 4K gaming. Worth every penny, especially at NXTLVL's competitive pricing.",
      helpful: 18,
      unhelpful: 0,
      images: []
    },
    {
      id: 3,
      username: "Jessica Martinez",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
      rating: 4,
      date: "3 weeks ago",
      verified: true,
      content: "Perfect for streaming and gaming simultaneously. Can run Warzone at max settings while streaming at 1080p 60fps without any frame drops. The RGB lighting integrates beautifully with my setup. Only minor complaint is the size - make sure your case can fit it! But performance-wise, it's a monster.",
      helpful: 12,
      unhelpful: 2,
      images: []
    },
    {
      id: 4,
      username: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
      rating: 5,
      date: "1 week ago",
      verified: true,
      content: "Third GPU I've bought from NXTLVL and they never disappoint. This card handles everything I throw at it - gaming, 3D rendering, video editing. The build quality is exceptional and the performance is exactly as advertised. Customer service is also top-notch when I had questions about compatibility.",
      helpful: 8,
      unhelpful: 0,
      images: []
    },
    {
      id: 5,
      username: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdHxlbnwwfHx8fDE3NjA1NjQ3MDJ8MA&ixlib=rb-4.1.0&q=85",
      rating: 4,
      date: "4 days ago",
      verified: true,
      content: "My first high-end GPU purchase and I'm blown away! Coming from console gaming, the difference is incredible. Setup was easier than expected thanks to NXTLVL's installation guide. Getting consistent 144fps in most games at 1440p. The only learning curve was optimizing settings, but the performance headroom is amazing.",
      helpful: 5,
      unhelpful: 1,
      images: []
    }
  ];

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const totalReviews = mockReviews.length;

  const handleHelpfulVote = (reviewId, type) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: type
    }));
  };

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.floor(rating) ? 'var(--nx-green)' : 'none'}
        color={i < Math.floor(rating) ? 'var(--nx-green)' : 'var(--muted)'}
      />
    ));
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3 className="reviews-title">
          <Star size={24} />
          Customer Reviews
        </h3>
        <div className="reviews-summary">
          <div className="rating-overview">
            <div className="rating-number">{averageRating.toFixed(1)}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                {renderStars(averageRating, 18)}
              </div>
              <div className="rating-text">Based on {totalReviews} reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {mockReviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-user">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-user-info">
                  <div className="review-username">{review.username}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="review-date">{review.date}</span>
                    {review.verified && (
                      <span className="verified-purchase">
                        <Shield size={12} />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>

            <div className="review-content">
              {review.content}
            </div>

            {review.images && review.images.length > 0 && (
              <div className="review-images">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="review-image"
                  />
                ))}
              </div>
            )}

            <div className="review-helpful">
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                Was this helpful?
              </span>
              <button
                className={`helpful-btn ${helpfulVotes[review.id] === 'yes' ? 'voted' : ''}`}
                onClick={() => handleHelpfulVote(review.id, 'yes')}
              >
                <ThumbsUp size={14} />
                Yes ({review.helpful + (helpfulVotes[review.id] === 'yes' ? 1 : 0)})
              </button>
              <button
                className={`helpful-btn ${helpfulVotes[review.id] === 'no' ? 'voted' : ''}`}
                onClick={() => handleHelpfulVote(review.id, 'no')}
              >
                <ThumbsDown size={14} />
                No ({review.unhelpful + (helpfulVotes[review.id] === 'no' ? 1 : 0)})
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(0, 255, 133, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 255, 133, 0.2)'
      }}>
        <h4 style={{ 
          color: 'var(--nx-green)', 
          marginBottom: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          Share Your Experience
        </h4>
        <p style={{ 
          color: 'var(--muted)', 
          marginBottom: '1rem',
          lineHeight: '1.6'
        }}>
          Help other gamers make the right choice! Leave a review and let the community know how this product has improved your gaming setup.
        </p>
        <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}>
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;