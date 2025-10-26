// ==================== LOADING SCREEN ====================
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 800);
});

// ==================== SMOOTH SCROLL ====================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================== NAVIGATION SCROLL EFFECT ====================
let lastScrollTop = 0;
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling down
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
fadeInElements.forEach(element => {
    observer.observe(element);
});

// ==================== CARD HOVER PARALLAX EFFECT ====================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.problem-card, .feature-card, .layer-card, .agent-card, .comparison-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ==================== SCROLL PROGRESS INDICATOR ====================
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar element and update it here
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== STAT COUNTER ANIMATION ====================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const endValue = parseInt(target.textContent);
            target.dataset.suffix = target.textContent.replace(/[0-9]/g, '');
            animateValue(target, 0, endValue, 2000);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== AGENT PERCENTAGE ANIMATION ====================
const agentPercentages = document.querySelectorAll('.agent-percentage');
const percentObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const endValue = parseInt(target.textContent);
            animateValue(target, 0, endValue, 2000);
            target.dataset.suffix = '%';
            percentObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

agentPercentages.forEach(percent => {
    percentObserver.observe(percent);
});

// ==================== FORM VALIDATION (if needed) ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Example form handling (add forms to HTML as needed)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form submission logic here
        console.log('Form submitted successfully');
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(function() {
    // Additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PRELOAD CRITICAL ASSETS ====================
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Add critical images to preload
// preloadImage('images/hero-background.jpg');

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(e) {
    // Close modals/menus on ESC key
    if (e.key === 'Escape') {
        // Add modal/menu closing logic here
    }
    
    // Focus trap for accessibility
    if (e.key === 'Tab') {
        // Add focus trap logic for modals
    }
});

// ==================== ANALYTICS TRACKING ====================
function trackEvent(category, action, label) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Console log for debugging
    console.log('Event tracked:', category, action, label);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('CTA', 'Click', buttonText);
    });
});

// Track section views
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'unnamed-section';
            trackEvent('Section View', 'Scroll', sectionId);
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ==================== CONSOLE BRANDING ====================
console.log('%c Quanton Labs ', 'background: #31769e; color: #ffffff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c The Architecture of Intelligent Business ', 'color: #849cbc; font-size: 14px; font-weight: 300;');
console.log('%c Growth OS Loaded Successfully ', 'color: #31769e; font-size: 12px;');

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
    // You can send errors to analytics or error tracking service
});

// ==================== INITIALIZATION COMPLETE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quanton Labs website initialized');
    
    // Add any initialization code here
    // Example: Initialize third-party libraries, set up event listeners, etc.
});