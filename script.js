// ============================================
// DHEER GUPTA - PORTFOLIO INTERACTIONS
// Modern JavaScript with smooth animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initTypingEffect();
    initCounterAnimation();
    initCardToggles();
    initScrollAnimations();
    initFormHandler();
    initNavbarScroll();
});

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const phrases = [
        'Data Science Researcher',
        'AI/ML Engineer',
        'Cybersecurity Enthusiast',
        'Backend Developer',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);

            // Format number with commas
            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// CARD TOGGLES (Expand/Collapse)
// ============================================
function initCardToggles() {
    const toggleButtons = document.querySelectorAll('.card-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const toggleText = button.querySelector('.toggle-text');

            if (targetElement) {
                targetElement.classList.toggle('active');
                button.classList.toggle('active');

                if (targetElement.classList.contains('active')) {
                    toggleText.textContent = 'Hide Details';
                    // Smooth scroll to keep card in view
                    setTimeout(() => {
                        const cardTop = button.closest('.experience-card').getBoundingClientRect().top;
                        if (cardTop < 100) {
                            window.scrollBy({
                                top: cardTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                } else {
                    toggleText.textContent = 'Show Details';
                }
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('aos-init');
        observer.observe(element);
    });

    // Add CSS for AOS animations
    const style = document.createElement('style');
    style.textContent = `
        .aos-init {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// FORM HANDLER (AJAX with Formspree)
// ============================================
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    const formResult = document.getElementById('form-result');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const formData = new FormData(this);

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        formResult.classList.remove('show', 'success', 'error');

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formResult.innerHTML = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                formResult.classList.add('show', 'success');
                this.reset();

                // Auto-hide after 8 seconds
                setTimeout(() => {
                    formResult.classList.remove('show');
                }, 8000);
            } else {
                const data = await response.json();
                let errorMessage = 'Oops! There was a problem submitting your form.';

                if (data.errors) {
                    errorMessage += ' ' + data.errors.map(error => error.message).join(", ");
                }

                formResult.innerHTML = errorMessage + ' Please try again or email me directly.';
                formResult.classList.add('show', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            formResult.innerHTML = 'Oops! There was a network problem. Please check your connection and try again.';
            formResult.classList.add('show', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SCROLL INDICATOR HIDE ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
window.addEventListener('scroll', () => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && window.innerWidth > 768) {
        const scrolled = window.scrollY;
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ============================================
// PRELOADER (Optional - add if needed)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero .animate-fade-in-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 200);
    });
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', (e) => {
    // Close mobile nav on Escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('navToggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(`
%c Dheer Gupta's Portfolio %c
%c Built with passion and lots of coffee! %c
%c Looking for someone who can turn data into decisions? Let's chat! %c
`,
'background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;',
'',
'color: #6366f1; font-size: 12px;',
'',
'color: #64748b; font-size: 11px;',
''
);
