// NXTLVL Gaming Theme - Animation Enhancements

(function() {
  'use strict';

  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeScrollEffects();
  });

  function initializeAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.product-card, .btn-primary, .hero-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = Math.random() * 0.5 + 's';
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  }

  function initializeParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${Math.random() > 0.5 ? 'var(--nx-green)' : 'var(--nx-purple)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${5 + Math.random() * 10}s ease-in-out infinite;
        opacity: 0.6;
      `;
      particleContainer.appendChild(particle);
    }
  }

  function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffect() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.animated-background > *');
      
      parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffect);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-40px) translateX(-10px);
        opacity: 0.8;
      }
    }

    @keyframes animate-in {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-in {
      animation: animate-in 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
})();