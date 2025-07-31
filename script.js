// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('stats-container')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.section-header, .project-card, .skill-card, .about-content, .contact-buttons, .stats-container, .timeline-item');
    elementsToObserve.forEach(el => observer.observe(el));
});

// Animated Stats Counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Project Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navLinks.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add hover effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  // Create glow element
  const glow = document.createElement('div');
  glow.className = 'glow';
  card.appendChild(glow);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 12; // max 12deg
    const rotateY = ((x - centerX) / centerX) * -12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    card.classList.add('tilt');
    // Move glow
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 80%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.classList.remove('tilt');
    glow.style.background = '';
  });
});

// Add social link hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Parallax effect for particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add CSS class for active navigation and notifications
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #14b8a6 !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loaded {
        opacity: 1;
    }
    
    /* Smooth transitions for all interactive elements */
    .project-card,
    .skill-card,
    .social-link,
    .btn,
    .cta-button {
        transition: all 0.3s ease;
    }
    
    /* Profile picture hover effect */
    .profile-picture {
        transition: transform 0.3s ease;
    }
    
    .profile-picture:hover {
        transform: scale(1.02);
    }
    
    /* Enhanced animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Loading animation */
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Enhanced Journey Timeline Animations
function initJourneyAnimations() {
    const journeyItems = document.querySelectorAll('.journey-item');
    const timeline = document.querySelector('.journey-timeline');
    
    if (!timeline) return;

    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation for timeline items
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                
                // Add achievement animations
                const achievements = entry.target.querySelectorAll('.journey-achievements li');
                achievements.forEach((achievement, achievementIndex) => {
                    setTimeout(() => {
                        achievement.style.opacity = '1';
                        achievement.style.transform = 'translateX(0)';
                    }, (index * 200) + (achievementIndex * 100) + 400);
                });
            }
        });
    }, { threshold: 0.3 });

    journeyItems.forEach(item => observer.observe(item));

    // Add hover effects for timeline dots
    journeyItems.forEach((item, index) => {
        const dot = item.querySelector('::before');
        
        item.addEventListener('mouseenter', () => {
            // Add ripple effect to timeline dot
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: 150px;
                top: 25px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(20, 184, 166, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                z-index: 5;
            `;
            item.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add timeline progress animation
    const timelineProgress = document.querySelector('.journey-timeline::after');
    if (timelineProgress) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'timelineProgress 3s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        progressObserver.observe(timeline);
    }
}

// Add CSS for ripple effect
const additionalCSS = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .journey-item:hover .journey-year {
        animation-play-state: paused;
    }
    
    .journey-item:hover .journey-achievements li::before {
        animation-duration: 0.5s;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize journey animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initJourneyAnimations();
});

document.addEventListener('DOMContentLoaded', function() {
  const greetings = [
    'Hello there !',
    'Welcome, Explorer!',
    'Namaste 🙏',
    'Ready to Code?',
    'Dream. Build. Repeat.',
    'Let\'s Innovate!',
    '👋 Hey, Visitor!',
    'Full Stack Magic!',
    'Stay Curious!',
    'Create. Inspire. Grow.'
  ];
  let greetIndex = 0;
  const greetSpan = document.querySelector('.greeting-dynamic');

  function animateGreetingChange() {
    if (!greetSpan) return;
    greetSpan.style.transition = 'opacity 0.5s, transform 0.5s';
    greetSpan.style.opacity = 0;
    greetSpan.style.transform = 'scale(0.8) rotateX(40deg)';
    setTimeout(() => {
      greetIndex = (greetIndex + 1) % greetings.length;
      greetSpan.textContent = greetings[greetIndex];
      greetSpan.style.transform = 'scale(1.2) rotateX(-20deg)';
      greetSpan.style.opacity = 1;
      setTimeout(() => {
        greetSpan.style.transform = '';
      }, 500);
    }, 500);
  }

  setInterval(animateGreetingChange, 2000);
});