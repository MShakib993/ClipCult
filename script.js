document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
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
  
  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Initialize particles.js for hero section
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#6c63ff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#6c63ff",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
  
  // Ventures slider navigation
  const ventureSlider = document.querySelector('.compact-slider');
  const prevBtn = document.querySelector('.prev-venture');
  const nextBtn = document.querySelector('.next-venture');
  const slideWidth = document.querySelector('.compact-slide').offsetWidth + 30; // 30px gap
  
  if (ventureSlider && prevBtn && nextBtn) {
    let currentPosition = 0;
    const maxPosition = ventureSlider.scrollWidth - ventureSlider.clientWidth;
    
    nextBtn.addEventListener('click', function() {
      currentPosition += slideWidth;
      if (currentPosition > maxPosition) currentPosition = maxPosition;
      ventureSlider.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
      });
    });
    
    prevBtn.addEventListener('click', function() {
      currentPosition -= slideWidth;
      if (currentPosition < 0) currentPosition = 0;
      ventureSlider.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
      });
    });
  }
  
  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
  
  // Navbar highlight effect
  const navHighlight = document.querySelector('.nav-highlight');
  const navItems = document.querySelectorAll('.nav-link');
  
  function moveHighlight(e) {
    if (!e.target.classList.contains('nav-link')) return;
    
    const linkRect = e.target.getBoundingClientRect();
    const navRect = document.querySelector('.navbar').getBoundingClientRect();
    
    navHighlight.style.width = `${linkRect.width}px`;
    navHighlight.style.left = `${linkRect.left - navRect.left}px`;
  }
  
  navItems.forEach(item => {
    item.addEventListener('mouseenter', moveHighlight);
  });
  
  // Initialize highlight position
  const activeLink = document.querySelector('.nav-link.active') || document.querySelector('.nav-link');
  if (activeLink && navHighlight) {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = document.querySelector('.navbar').getBoundingClientRect();
    
    navHighlight.style.width = `${linkRect.width}px`;
    navHighlight.style.left = `${linkRect.left - navRect.left}px`;
    navHighlight.style.opacity = '1';
  }
  
  // Preload images for better performance
  function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
  
  window.addEventListener('load', preloadImages);
});

// Updated Ventures Slider Navigation
const ventureSlider = document.querySelector('.compact-slider');
const prevBtn = document.querySelector('.prev-venture');
const nextBtn = document.querySelector('.next-venture');

if (ventureSlider && prevBtn && nextBtn) {
  let currentIndex = 0;
  const slides = document.querySelectorAll('.compact-slide');
  const slideCount = slides.length;
  
  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 30; // Include gap
    ventureSlider.scrollTo({
      left: currentIndex * slideWidth,
      behavior: 'smooth'
    });
    
    // Disable/enable buttons based on position
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slideCount - 1;
  }
  
  // Initialize buttons
  updateSlider();
  
  // Handle window resize
  window.addEventListener('resize', updateSlider);
  
  // Button event listeners
  nextBtn.addEventListener('click', function() {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
      updateSlider();
    }
  });
  
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  ventureSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  ventureSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold && currentIndex < slideCount - 1) {
      // Swipe left
      currentIndex++;
      updateSlider();
    } else if (touchEndX > touchStartX + threshold && currentIndex > 0) {
      // Swipe right
      currentIndex--;
      updateSlider();
    }
  }
}
// Video Hover Play Functionality
function setupVideoHover() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;
    
    // For devices that support hover (desktop)
    if (window.matchMedia("(hover: hover)").matches) {
      item.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log("Video play prevented:", e));
      });
      
      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
    // For touch devices
    else {
      video.controls = true; // Show native controls
      
      // Click to play/pause fallback
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'VIDEO') {
          if (video.paused) {
            video.play().catch(e => console.log("Video play prevented:", e));
          } else {
            video.pause();
          }
        }
      });
    }
  });
}

// Call this function after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  setupVideoHover();
  
  // Additional check for mobile devices
  if ('ontouchstart' in window) {
    document.querySelectorAll('.portfolio-item video').forEach(video => {
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
    });
  }
});