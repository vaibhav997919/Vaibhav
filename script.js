// Elite Professional Portfolio Interactivity (v3.0)
document.addEventListener('DOMContentLoaded', () => {
    initElitePreloader();
    initEliteInteractions();
    initMacroMotion();
    initSVGBorders();
    initEliteCursor();
    initEliteTextEffects();
});

// 1. Elite Preloader Init
function initElitePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('finished');
            document.body.classList.add('loaded');
            // Trigger entry animations
            document.querySelectorAll('.hero-content > *').forEach((el, i) => {
                setTimeout(() => el.classList.add('reveal'), i * 150);
            });
        }, 2500); // Cinematic delay for initializing sequence
    });
}

// 2. Elite Interaction System (Unified)
function initEliteInteractions() {
    initIntersectionObserver();
    initStatsCounter();
    initProjectFiltering();
    initMobileNav();
    initSmoothScroll();
    initActiveNavLinks();
    initSpotlightEffect();
    initMagneticButtons();
    initParallaxParticles();
    initGreetingCycle();
    initJourneyAnimations();
    initBackToTop();
}

// 3. Macro-Motion: Scroll-Linked Breathing
function initMacroMotion() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('section-reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Reduced threshold for better mobile triggering

    sections.forEach(s => observer.observe(s));

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.mesh-gradient').forEach(mesh => {
            mesh.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// 4. Dynamic SVG Border Injection
function initSVGBorders() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .edu-card, .experience-item');
    cards.forEach(card => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "card-border-svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("preserveAspectRatio", "none");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M 0 0 L 100 0 L 100 100 L 0 100 Z");
        path.setAttribute("class", "card-border-path");
        
        svg.appendChild(path);
        card.appendChild(svg);
    });
}

// 5. Elite Cursor System (Refined)
function initEliteCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    document.body.appendChild(cursorInner);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorInner.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    const animateCursor = () => {
        const dist = 0.15;
        cursorX += (mouseX - cursorX) * dist;
        cursorY += (mouseY - cursorY) * dist;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactives = document.querySelectorAll('a, button, .clickable, .card, .project-card, .skill-card, .experience-item');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// 6. Elite Text Effects (Typography)
function initEliteTextEffects() {
    // Scramble effect for all headers (already defined in previous turns)
    // We add a letter-drift to the hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const letters = heroName.querySelectorAll('span');
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable hover drift on mobile for clarity
            
            const x = (e.clientX - window.innerWidth / 2) / 30;
            const y = (e.clientY - window.innerHeight / 2) / 30;
            letters.forEach((l, i) => {
                const depth = (i % 3) + 1;
                l.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
            });
        });
    }
    
    initTextScramble();
}

// --- Restoring Core Logic ---
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('stats-container')) animateStats();
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-header, .project-card, .skill-card, .stats-container, .timeline-item, .edu-card, .cert-card, .experience-item').forEach(el => observer.observe(el));
}

function initSpotlightEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .edu-card, .experience-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            if (card.classList.contains('skill-card') || card.classList.contains('project-card')) {
                const centerX = rect.width / 2, centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 10, rotateY = ((x - centerX) / centerX) * -10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

function initMagneticButtons() {
    document.querySelectorAll('.cta-button, .social-link, .nav-link, .filter-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const timer = setInterval(() => {
            current += target / 100;
            if (current >= target) { current = target; clearInterval(timer); }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle'), navLinks = document.querySelector('.nav-links');
    if (!navToggle) return;
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); navToggle.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('active'); navToggle.classList.remove('open'); }));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
}

function initActiveNavLinks() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]'), navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(section => { if (scrollY >= (section.offsetTop - 200)) current = section.getAttribute('id'); });
        navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === '#' + current) link.classList.add('active'); });
    });
}

function initParallaxParticles() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.particle').forEach((p, i) => { p.style.transform = `translateY(${scrolled * (0.2 + i * 0.05)}px)`; });
    });
}

function initGreetingCycle() {
    const greetings = ['Hello there !', 'Welcome, Explorer!', 'Namaste 🙏', 'Ready to Code?', 'Dream. Build. Repeat.'];
    let greetIndex = 0;
    const greetSpan = document.querySelector('.greeting-dynamic');
    if (!greetSpan) return;
    setInterval(() => {
        greetSpan.style.opacity = '0';
        setTimeout(() => {
            greetIndex = (greetIndex + 1) % greetings.length;
            greetSpan.textContent = greetings[greetIndex];
            greetSpan.style.opacity = '1';
        }, 500);
    }, 3000);
}

function initJourneyAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => { if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('reveal'), index * 200); });
    }, { threshold: 0.3 });
    document.querySelectorAll('.journey-item').forEach(item => observer.observe(item));
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => { if (window.scrollY > 500) btn.classList.add('show'); else btn.classList.remove('show'); });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

class TextScramble {
    constructor(el) { this.el = el; this.chars = '!<>-_\\/[]{}—=+*^?#________'; this.update = this.update.bind(this); }
    setText(newText) {
        const oldText = this.el.innerText, length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '', to = newText[i] || '';
            const start = Math.floor(Math.random() * 40), end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0; this.update();
        return promise;
    }
    update() {
        let output = '', complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) { complete++; output += to; }
            else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) { char = this.chars[Math.floor(Math.random() * this.chars.length)]; this.queue[i].char = char; }
                output += `<span class="dud">${char}</span>`;
            } else output += from;
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) this.resolve(); else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
    }
}

function initTextScramble() {
    document.querySelectorAll('.section-title').forEach(header => {
        const fx = new TextScramble(header), originalText = header.innerText;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { fx.setText(originalText); observer.unobserve(entry.target); } });
        }, { threshold: 0.5 });
        observer.observe(header);
    });
}

// In-line Styles for Custom Elite Cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 40px; height: 40px; border: 2px solid var(--accent-teal); border-radius: 50%;
        position: fixed; pointer-events: none; z-index: 10001;
        transition: width 0.3s, height 0.3s, background 0.3s, border-color 0.3s;
    }
    .custom-cursor-inner {
        width: 6px; height: 6px; background: var(--accent-blue); border-radius: 50%;
        position: fixed; pointer-events: none; z-index: 10001;
    }
    .custom-cursor.hover {
        width: 80px; height: 80px; background: rgba(20, 184, 166, 0.1); border-color: rgba(20, 184, 166, 0.5);
    }
    .hero-name span { display: inline-block; transition: transform 0.1s ease-out; pointer-events: none; }
    .reveal { opacity: 1 !important; transform: translate3d(0,0,0) !important; filter: blur(0) !important; }
    @media (max-width: 768px) { .custom-cursor, .custom-cursor-inner { display: none; } }
`;
document.head.appendChild(style);