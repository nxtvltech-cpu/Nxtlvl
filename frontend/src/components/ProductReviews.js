import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Shield, Camera } from 'lucide-react';

const ProductReviews = ({ productId, productTitle }) => {
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Product-specific review data based on product title/category
  const getProductReviews = (title) => {
    const reviewDatabase = {
      // GPU Reviews
      'gpu': [
        {
          id: 1,
          username: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "2 weeks ago",
          verified: true,
          content: "Absolutely insane performance! Upgraded from a GTX 1070 and the difference is night and day. Running Cyberpunk 2077 at 1440p ultra settings with RTX on and getting solid 75+ FPS. The cooling is whisper quiet even under full load. NXTLVL shipping was lightning fast!",
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
          content: "Coming from someone who's tested dozens of GPUs, this is a beast. The cooling solution is top-tier - never goes above 68°C even during stress testing. Memory bandwidth is incredible for 1440p and 4K gaming. Worth every penny!",
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
          content: "Perfect for streaming and gaming simultaneously. Can run Warzone at max settings while streaming at 1080p 60fps without any frame drops. The RGB lighting integrates beautifully with my setup. Only minor complaint is the size!",
          helpful: 12,
          unhelpful: 2,
          images: []
        }
      ],
      
      // CPU Reviews
      'cpu': [
        {
          id: 1,
          username: "David Rodriguez",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "1 week ago",
          verified: true,
          content: "This processor is an absolute powerhouse! Upgraded from a Ryzen 5 and the performance gains in both gaming and productivity are incredible. Multitasking with multiple Chrome tabs, Discord, and games running smoothly. The 3D V-Cache really makes a difference in gaming performance.",
          helpful: 15,
          unhelpful: 0,
          images: []
        },
        {
          id: 2,
          username: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdHxlbnwwfHx8fDE3NjA1NjQ3MDJ8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "2 weeks ago",
          verified: true,
          content: "Best CPU I've ever owned for gaming. Frame times are incredibly consistent and the performance in CPU-intensive games like Cyberpunk and Flight Simulator is outstanding. Runs cool with my AIO cooler and overclocks beautifully.",
          helpful: 12,
          unhelpful: 1,
          images: []
        }
      ],
      
      // Keyboard Reviews
      'keyboard': [
        {
          id: 1,
          username: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "1 week ago",
          verified: true,
          content: "The tactile feedback on these Cherry MX switches is perfect for gaming and typing. The tenkeyless design saves so much desk space for mouse movement. Build quality feels premium and the detachable cable is super convenient for travel.",
          helpful: 20,
          unhelpful: 0,
          images: []
        },
        {
          id: 2,
          username: "Sarah Thompson",
          avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 4,
          date: "3 weeks ago",
          verified: true,
          content: "Solid mechanical keyboard for the price. The RGB lighting is vibrant and the software customization is excellent. Only wish it had a wrist rest included, but the typing experience is fantastic for both gaming and work.",
          helpful: 14,
          unhelpful: 2,
          images: []
        }
      ],
      
      // Mouse Reviews
      'mouse': [
        {
          id: 1,
          username: "Jessica Martinez",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "5 days ago",
          verified: true,
          content: "The sensor accuracy is phenomenal! Perfect for competitive FPS gaming. The ergonomics fit my hand perfectly and the customizable buttons are a game-changer. Battery life on wireless mode easily lasts a week of heavy gaming.",
          helpful: 18,
          unhelpful: 1,
          images: []
        },
        {
          id: 2,
          username: "David Rodriguez",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "2 weeks ago",
          verified: true,
          content: "Incredible precision and the adjustable weights let me customize it perfectly. The scroll wheel feels premium and the RGB lighting syncs beautifully with my other peripherals. Best mouse I've owned!",
          helpful: 16,
          unhelpful: 0,
          images: []
        }
      ],
      
      // Monitor Reviews
      'monitor': [
        {
          id: 1,
          username: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdHxlbnwwfHx8fDE3NjA1NjQ3MDJ8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "1 week ago",
          verified: true,
          content: "The 144Hz refresh rate makes such a difference in competitive gaming! Colors are vibrant with the IPS panel and the 1ms response time eliminates any ghosting. FreeSync works flawlessly with my AMD GPU. Perfect size for my desk setup.",
          helpful: 22,
          unhelpful: 0,
          images: []
        },
        {
          id: 2,
          username: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 4,
          date: "2 weeks ago",
          verified: true,
          content: "Great monitor for the price point. The stand is sturdy and height adjustment is smooth. Picture quality is excellent for both gaming and work. Only minor complaint is the built-in speakers are weak, but that's expected at this price range.",
          helpful: 15,
          unhelpful: 1,
          images: []
        }
      ],
      
      // Headset Reviews
      'headset': [
        {
          id: 1,
          username: "Sarah Thompson",
          avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "3 days ago",
          verified: true,
          content: "The sound quality is incredible! 7.1 surround sound really helps with positional audio in FPS games. The wireless connection is rock solid with zero latency. Comfort is outstanding even during long gaming sessions - no pressure points or headaches.",
          helpful: 19,
          unhelpful: 0,
          images: []
        },
        {
          id: 2,
          username: "Jessica Martinez",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 4,
          date: "1 week ago",
          verified: true,
          content: "Perfect for streaming! The ClearCast microphone sounds professional and my viewers say the audio quality is crystal clear. Battery life easily lasts all day. The only thing missing is RGB lighting, but the performance more than makes up for it.",
          helpful: 13,
          unhelpful: 2,
          images: []
        }
      ],

      // Default reviews for other products
      'default': [
        {
          id: 1,
          username: "David Rodriguez",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA1Mzk2NjB8MA&ixlib=rb-4.1.0&q=85",
          rating: 5,
          date: "1 week ago",
          verified: true,
          content: "Excellent product quality and performance. NXTLVL's customer service was outstanding and shipping was incredibly fast. This has definitely improved my gaming setup and I'm very satisfied with the purchase.",
          helpful: 12,
          unhelpful: 0,
          images: []
        },
        {
          id: 2,
          username: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdHxlbnwwfHx8fDE3NjA1NjQ3MDJ8MA&ixlib=rb-4.1.0&q=85",
          rating: 4,
          date: "2 weeks ago",
          verified: true,
          content: "Great value for money. Build quality is solid and it works exactly as described. Setup was straightforward and it integrates well with my existing gaming setup. Would definitely recommend to other gamers.",
          helpful: 8,
          unhelpful: 1,
          images: []
        }
      ]
    };

    // Determine product category from title
    const titleLower = (title || '').toLowerCase();
    if (titleLower.includes('rtx') || titleLower.includes('geforce') || titleLower.includes('gpu') || titleLower.includes('graphics')) return reviewDatabase.gpu;
    if (titleLower.includes('ryzen') || titleLower.includes('intel') || titleLower.includes('cpu') || titleLower.includes('processor')) return reviewDatabase.cpu;
    if (titleLower.includes('keyboard') || titleLower.includes('mechanical')) return reviewDatabase.keyboard;
    if (titleLower.includes('mouse') && !titleLower.includes('pad')) return reviewDatabase.mouse;
    if (titleLower.includes('monitor') || titleLower.includes('display')) return reviewDatabase.monitor;
    if (titleLower.includes('headset') || titleLower.includes('headphones') || titleLower.includes('arctis')) return reviewDatabase.headset;
    
    return reviewDatabase.default;
  };

  const mockReviews = getProductReviews(productTitle);

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
                <div className="review-avatar">
                  {review.avatar.startsWith('http') ? (
                    <img 
                      src={review.avatar} 
                      alt={review.username} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  ) : (
                    review.avatar
                  )}
                </div>
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