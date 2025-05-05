document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const initMobileNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ========== Sticky Navigation ==========
    const initStickyNav = () => {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 0);
        });
    }

    // ========== Portfolio Filtering ==========
    const initPortfolioFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.dataset.filter;
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.dataset.category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== Testimonial Slider ==========
    const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Create dots
        const createDots = () => {
            testimonials.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToTestimonial(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        const showTestimonial = (index) => {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            document.querySelectorAll('.dot')[index].classList.add('active');
            currentIndex = index;
        }
        
        const goToTestimonial = (index) => {
            clearInterval(autoSlideInterval);
            showTestimonial(index);
            startAutoSlide();
        }
        
        const nextTestimonial = () => {
            clearInterval(autoSlideInterval);
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
            startAutoSlide();
        }
        
        const prevTestimonial = () => {
            clearInterval(autoSlideInterval);
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
            startAutoSlide();
        }
        
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextTestimonial, 5000);
        }
        
        // Initialize
        createDots();
        startAutoSlide();
        
        // Event listeners
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // ========== Smooth Scrolling ==========
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== Form Validation ==========
    const initFormValidation = () => {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nameInput = this.querySelector('input[type="text"]');
                const emailInput = this.querySelector('input[type="email"]');
                const messageInput = this.querySelector('textarea');
                let isValid = true;
                
                // Reset error states
                this.querySelectorAll('.error').forEach(el => el.remove());
                
                // Validate name
                if (!nameInput.value.trim()) {
                    showError(nameInput, 'Please enter your name');
                    isValid = false;
                }
                
                // Validate email
                if (!emailInput.value.trim()) {
                    showError(emailInput, 'Please enter your email');
                    isValid = false;
                } else if (!isValidEmail(emailInput.value)) {
                    showError(emailInput, 'Please enter a valid email');
                    isValid = false;
                }
                
                // Validate message
                if (!messageInput.value.trim()) {
                    showError(messageInput, 'Please enter your message');
                    isValid = false;
                }
                
                if (isValid) {
                    // Here you would typically send the form data to a server
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                }
            });
        }
        
        const showError = (input, message) => {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            input.parentNode.appendChild(errorElement);
        }
        
        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // ========== Video Lazy Loading ==========
    const initLazyLoadVideos = () => {
        const videoContainers = document.querySelectorAll('.video-container');
        
        const lazyLoadVideo = (container) => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const src = iframe.getAttribute('data-src');
                        if (src) {
                            iframe.setAttribute('src', src);
                            observer.unobserve(container);
                        }
                    }
                });
            }, { rootMargin: '100px' });
            
            observer.observe(container);
        }
        
        videoContainers.forEach(container => {
            lazyLoadVideo(container);
        });
    }

    // ========== Animation on Scroll ==========
    const initScrollAnimations = () => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-image img, .about-content, .contact-info, .contact-form');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animate');
                }
            });
        }
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
    }

    // ========== Initialize All Functions ==========
    initMobileNav();
    initStickyNav();
    initPortfolioFilter();
    initTestimonialSlider();
    initSmoothScrolling();
    initFormValidation();
    initLazyLoadVideos();
    initScrollAnimations();
});
// Add parallax effect to ventures section
window.addEventListener('scroll', function() {
    const ventures = document.querySelector('.ventures');
    if (ventures) {
        const scrollPosition = window.pageYOffset;
        const venturesPosition = ventures.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > venturesPosition - windowHeight) {
            const parallaxValue = (scrollPosition - venturesPosition) * 0.3;
            document.querySelector('.venture-image').style.transform = `translateX(${parallaxValue}px)`;
        }
    }
});

// Main Ventures Slider
const initVenturesSlider = () => {
    const slides = document.querySelectorAll('.venture-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-venture');
    const nextBtn = document.querySelector('.next-venture');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
        
        // Play video in active slide
        const activeVideo = slides[index].querySelector('.venture-video');
        if (activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play();
        }
    };

    const goToSlide = (index) => {
        clearInterval(autoSlideInterval);
        showSlide(index);
        startAutoSlide();
    };

    const nextSlide = () => {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        startAutoSlide();
    };

    const prevSlide = () => {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        startAutoSlide();
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 8000);
    };

    // Initialize
    showSlide(currentIndex);
    startAutoSlide();
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Create particles for BrandVFX slide
    createParticles();
};

// Create particles animation
const createParticles = () => {
    const canvas = document.getElementById('particle-canvas-1');
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(108, 99, 255, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Reset particles that go off screen
            if (particle.x < 0 || particle.x > canvas.width || 
                particle.y < 0 || particle.y > canvas.height) {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
};

// Animate counting numbers
const animateNumbers = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateNumbers, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVenturesSlider();
    
    // Animate numbers when ventures section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const venturesSection = document.querySelector('.ventures-showcase');
    if (venturesSection) {
        observer.observe(venturesSection);
    }
    
    // Play button functionality
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const video = this.closest('.media-container').querySelector('video');
            if (video.paused) {
                video.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });
});