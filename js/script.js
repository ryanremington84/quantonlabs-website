// ==================== LOADING SCREEN ====================
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 800);
        });

        // ==================== SMOOTH SCROLL ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // ==================== SCROLL ANIMATIONS ====================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation for agent coverage
                    if (entry.target.querySelector('.counting')) {
                        const counter = entry.target.querySelector('.counting');
                        animateCounter(counter);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .feature-card, .problem-card, .os-layer-card, .agent-card').forEach(element => {
            observer.observe(element);
        });

        // ==================== COUNTER ANIMATION ====================
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current) + '%';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + '%';
                }
            };

            updateCounter();
        }

        // ==================== NAV BACKGROUND ON SCROLL ====================
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.8)';
                nav.style.boxShadow = 'none';
            }
        });

        // ==================== PARALLAX EFFECT ====================
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        console.log('Quanton Labs - Growth OS Loaded Successfully');
