import React from 'react';
import { Zap, Target, Trophy, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="page-with-banner" style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Hero Section */}
        <section style={{ 
          textAlign: 'center',
          padding: '4rem 0',
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
            About NXTLVL
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem',
            color: 'var(--muted)',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            At NXTLVL, we help gamers push beyond limits with high-performance components 
            and precision-built gear. From GPUs and CPUs to pro-grade peripherals, our 
            curation focuses on real-world FPS gains, thermals, and reliability—so every 
            upgrade moves you closer to victory.
          </p>
        </section>

        {/* Split Section */}
        <section style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          margin: '4rem 0'
        }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80"
              alt="High-end gaming setup"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid var(--line)'
              }}
            />
          </div>
          
          <div>
            <h2 style={{ 
              fontSize: '2.2rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              color: 'var(--nx-green)'
            }}>
              Our Mission
            </h2>
            
            <p style={{ 
              color: 'var(--muted)',
              lineHeight: '1.8',
              marginBottom: '2rem'
            }}>
              NXTLVL exists to turn every build into a performance statement. We hand-select 
              GPUs, CPUs, cooling, and accessories that deliver measurable improvements—lower 
              latency, cooler temps, higher frames. No hype, just hardware that performs.
            </p>

            <p style={{ 
              color: 'var(--muted)',
              lineHeight: '1.8'
            }}>
              Whether you're chasing tournament wins or a cleaner, faster rig, we make 
              upgrades simple: clear specs, honest benchmarks, and support that speaks 
              your language.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          padding: '4rem 2rem',
          margin: '4rem 0'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            What Drives Us
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                background: 'rgba(0, 255, 133, 0.1)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Zap size={32} color="var(--nx-green)" />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--nx-green)'
              }}>
                Performance First
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Every product is tested and verified for real-world gaming performance. 
                We focus on measurable improvements, not marketing claims.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                background: 'rgba(0, 255, 133, 0.1)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Target size={32} color="var(--nx-green)" />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--nx-green)'
              }}>
                Curated Selection
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Hand-picked components from trusted brands. No overwhelming choices, 
                just the best options for your gaming needs.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                background: 'rgba(0, 255, 133, 0.1)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Trophy size={32} color="var(--nx-green)" />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--nx-green)'
              }}>
                Gaming Excellence
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Built by gamers, for gamers. We understand the importance of every 
                frame, every millisecond, every degree of cooling.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                background: 'rgba(0, 255, 133, 0.1)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Users size={32} color="var(--nx-green)" />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--nx-green)'
              }}>
                Community Focused
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Support that speaks your language. Whether you're building your first 
                rig or upgrading to the latest tech, we're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Category Highlights */}
        <section style={{ margin: '4rem 0' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Our Categories
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'var(--nx-green)',
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                GPUs
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Unlock frames that change the game—next-gen architectures, smarter upscaling, 
                rock-solid drivers.
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'var(--nx-green)',
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                CPUs
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Multi-core muscle for high-refresh gaming and creation. Power through 
                any workload with ease.
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'var(--nx-green)',
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                Cooling
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Lower temps, quieter builds, longer life. Keep your components running 
                at peak performance.
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'var(--nx-green)',
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                Keyboards & Mice
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                Pro-grade sensors and switches for precision. Every click, every keystroke 
                matters in competitive gaming.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(0, 255, 133, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 255, 133, 0.2)',
          margin: '4rem 0'
        }}>
          <h2 style={{ 
            fontSize: '2.2rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: 'var(--nx-green)'
          }}>
            Ready to Level Up?
          </h2>
          
          <p style={{ 
            color: 'var(--muted)',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Discover the components that will transform your gaming experience. 
            Every upgrade counts when you're aiming for the next level.
          </p>

          <div style={{ 
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/shop" className="btn-primary">
              Shop Components
            </a>
            <a href="/shop?category=Keyboard" className="btn-secondary">
              Shop Accessories
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;