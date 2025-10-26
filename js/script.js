// Smooth scroll - filter out empty hash anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return; // Skip empty anchors
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header hide on scroll - throttled with RAF
let lastScroll = 0;
let ticking = false;
const header = document.getElementById('header');

function updateHeaderState() {
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
        header.classList.add('transparent');
        header.classList.remove('hidden');
    } else {
        header.classList.remove('transparent');
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Electrical pulse animation for components cards - with proper interval cleanup
const componentsGrid = document.getElementById('components-grid');
if (componentsGrid) {
    const cards = componentsGrid.querySelectorAll('.card');
    
    // WeakMap to track intervals per element
    const intervalMap = new WeakMap();
    
    function triggerPulseSequence() {
        cards.forEach((card, index) => {
            setTimeout(() => {
                // Check if animation is supported
                if (typeof card.style.animation !== 'undefined') {
                    card.classList.add('pulse-active');
                    card.style.animation = 'cardPulse 1.8s linear';
                    setTimeout(() => {
                        card.classList.remove('pulse-active');
                        card.style.animation = '';
                    }, 1800);
                }
            }, index * 900); // 900ms delay between each card
        });
    }
    
    const pulseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Clear any existing interval
                const existingInterval = intervalMap.get(entry.target);
                if (existingInterval) {
                    clearInterval(existingInterval);
                }
                
                // Initial pulse
                setTimeout(() => triggerPulseSequence(), 500);
                
                // Set up recurring pulse
                const interval = setInterval(() => {
                    triggerPulseSequence();
                }, 16000); // 16 second cycle
                
                intervalMap.set(entry.target, interval);
            } else {
                // Clean up interval when element leaves view
                const interval = intervalMap.get(entry.target);
                if (interval) {
                    clearInterval(interval);
                    intervalMap.delete(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });
    
    pulseObserver.observe(componentsGrid);
}

// Stats electrical pulse - with proper interval cleanup
const statsGrid = document.getElementById('stats-grid');
if (statsGrid) {
    const statItems = statsGrid.querySelectorAll('.stat-item');
    
    // WeakMap to track intervals per element
    const intervalMap = new WeakMap();
    
    function triggerStatsPulse() {
        statItems.forEach((item, index) => {
            setTimeout(() => {
                const card = item.closest('.stat-item');
                if (card && typeof card.style.animation !== 'undefined') {
                    card.style.animation = 'cardPulse 1.5s linear';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 1500);
                }
            }, index * 700); // 700ms delay
        });
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Clear any existing interval
                const existingInterval = intervalMap.get(entry.target);
                if (existingInterval) {
                    clearInterval(existingInterval);
                }
                
                // Initial pulse
                setTimeout(() => triggerStatsPulse(), 300);
                
                // Set up recurring pulse
                const interval = setInterval(() => {
                    triggerStatsPulse();
                }, 14000); // 14 second cycle
                
                intervalMap.set(entry.target, interval);
            } else {
                // Clean up interval when element leaves view
                const interval = intervalMap.get(entry.target);
                if (interval) {
                    clearInterval(interval);
                    intervalMap.delete(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsGrid);
}
