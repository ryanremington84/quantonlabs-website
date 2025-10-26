// Smooth scroll
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

// Header hide on scroll
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
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

// Electrical pulse animation for components cards - quantum-level slow
const componentsGrid = document.getElementById('components-grid');
if (componentsGrid) {
    const cards = componentsGrid.querySelectorAll('.card');
    
    function triggerPulseSequence() {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('pulse-active');
                card.style.animation = 'cardPulse 1.8s linear';
                setTimeout(() => {
                    card.classList.remove('pulse-active');
                    card.style.animation = '';
                }, 1800);
            }, index * 900); // 900ms delay between each card (quantum slowdown)
        });
    }
    
    // Trigger pulse when section comes into view
    const pulseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => triggerPulseSequence(), 500); // Initial delay
                // Repeat every 16 seconds while in view (captured light cycle)
                const interval = setInterval(() => {
                    if (entry.isIntersecting) {
                        triggerPulseSequence();
                    } else {
                        clearInterval(interval);
                    }
                }, 16000);
            }
        });
    }, { threshold: 0.3 });
    
    pulseObserver.observe(componentsGrid);
}

// Stats electrical pulse - quantum precision
const statsGrid = document.getElementById('stats-grid');
if (statsGrid) {
    const statItems = statsGrid.querySelectorAll('.stat-item');
    
    function triggerStatsPulse() {
        statItems.forEach((item, index) => {
            setTimeout(() => {
                const card = item.closest('.stat-item');
                card.style.animation = 'cardPulse 1.5s linear';
                setTimeout(() => {
                    card.style.animation = '';
                }, 1500);
            }, index * 700); // 700ms delay - slower quantum cascade
        });
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => triggerStatsPulse(), 300);
                const interval = setInterval(() => {
                    if (entry.isIntersecting) {
                        triggerStatsPulse();
                    } else {
                        clearInterval(interval);
                    }
                }, 14000); // 14 second cycle - captured light rhythm
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsGrid);
}
