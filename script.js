// ==============================================
// Modern Portfolio - JavaScript
// ==============================================

(function() {
    'use strict';
    
    // ==============================================
    // Configuration
    // ==============================================
    const config = {
        typingSpeed: 100,
        typingDelay: 2000,
        particleCount: 50,
        scrollThreshold: 100,
        animationDelay: 200,
        contactEmail: 'justiceopokunon@gmail.com'
    };
    
    // ==============================================
    // Utility Functions
    // ==============================================
    
    /**
     * Sanitize HTML input to prevent XSS attacks
     * @param {string} input - The input string to sanitize
     * @returns {string} - Sanitized string
     */
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - Whether email is valid
     */
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // ==============================================
    // Typing Animation
    // ==============================================
    const typingTexts = [
        'Full-Stack Developer',
        'AI Enthusiast',
        'Creative Technologist',
        'Problem Solver',
        'Innovation Driver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    function typeText() {
        if (!typingElement) return;
        
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = config.typingSpeed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = config.typingDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // ==============================================
    // Particle Animation
    // ==============================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    }
    
    // ==============================================
    // Theme Toggle
    // ==============================================
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // ==============================================
    // Navbar Scroll Effect
    // ==============================================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (!navbar) return;
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > config.scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll and active link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    navMenu?.classList.remove('active');
                    hamburger?.classList.remove('active');
                }
            });
        });
        
        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const isActive = hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', isActive);
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Update active link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // ==============================================
    // Scroll to Top Button
    // ==============================================
    function initScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==============================================
    // Scroll Animations
    // ==============================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, config.animationDelay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animateElements.forEach(el => observer.observe(el));
    }
    
    // ==============================================
    // Skills Progress Animation
    // ==============================================
    function initSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.setProperty('--progress', progress + '%');
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // ==============================================
    // Contact Form
    // ==============================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const formStatus = form.querySelector('.form-status');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if online
            if (!navigator.onLine) {
                formStatus.textContent = '📡 You are offline. Please check your internet connection and try again.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                return;
            }
            
            // Clear previous errors
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Sanitize all inputs to prevent XSS
            const sanitizedData = {
                name: sanitizeInput(data.name || ''),
                email: sanitizeInput(data.email || ''),
                subject: sanitizeInput(data.subject || ''),
                message: sanitizeInput(data.message || '')
            };
            
            // Validate
            let isValid = true;
            
            if (!sanitizedData.name || sanitizedData.name.trim().length < 2) {
                showError('name', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }
            
            if (!sanitizedData.email || !isValidEmail(sanitizedData.email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!sanitizedData.subject || sanitizedData.subject.trim().length < 3) {
                showError('subject', 'Subject must be at least 3 characters');
                isValid = false;
            }
            
            if (!sanitizedData.message || sanitizedData.message.trim().length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Simulate form submission (replace with actual API call)
            try {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo purposes, create a mailto link
                const mailtoLink = `mailto:${config.contactEmail}?subject=${encodeURIComponent(sanitizedData.subject)}&body=${encodeURIComponent(`Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`)}`;
                window.location.href = mailtoLink;
                
                // Show success message
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.style.display = 'none';
                        formStatus.style.opacity = '1';
                    }, 300);
                }, 5000);
                
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                // Reset button
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }
        });
        
        function showError(fieldName, message) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const errorElement = field?.parentElement?.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
            }
            field?.classList.add('error');
        }
    }
    
    // ==============================================
    // Loading Screen
    // ==============================================
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;
        
        // Ensure minimum loading time for UX
        const minLoadTime = 800;
        const startTime = performance.now();
        
        window.addEventListener('load', () => {
            const elapsed = performance.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsed);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, remainingTime);
        });
        
        // Fallback: Force hide after 3 seconds regardless
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 3000);
    }
    
    // ==============================================
    // Performance Optimization - Lazy Loading Images
    // ==============================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback to Intersection Observer
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // ==============================================
    // Easter Egg - Konami Code
    // ==============================================
    function initEasterEgg() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
        
        function activateEasterEgg() {
            // Add fun effect
            document.body.style.animation = 'rainbow 2s linear';
            
            // Create a custom toast notification
            const toast = document.createElement('div');
            toast.textContent = '🎉 You found the secret! Thanks for exploring!';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                document.body.style.animation = '';
                toast.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }
    
    // ==============================================
    // Analytics (Google Analytics placeholder)
    // ==============================================
    function initAnalytics() {
        // Track page view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
        
        // Track outbound links
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'outbound',
                        event_label: e.target.href
                    });
                }
            });
        });
    }
    
    // ==============================================
    // Keyboard Navigation Enhancement
    // ==============================================
    function initKeyboardNavigation() {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#about';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // ==============================================
    // Initialize Everything
    // ==============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Initialize all features
        hideLoadingScreen();
        initTheme();
        initNavbar();
        initScrollToTop();
        initScrollAnimations();
        initSkillsAnimation();
        initContactForm();
        initLazyLoading();
        initEasterEgg();
        initAnalytics();
        initKeyboardNavigation();
        createParticles();
        
        // Start typing animation after a short delay
        setTimeout(typeText, 500);
        
        // Log to console
        console.log('%c👨‍💻 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
        console.log('%cInterested in the code? Check out the repository on GitHub!', 'color: #8b5cf6; font-size: 14px;');
        console.log('%chttps://github.com/justiceopokunon', 'color: #64748b; font-size: 12px;');
    }
    
    // Start initialization
    init();
    
})();
