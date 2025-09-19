// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                console.log('Form validation failed: Missing required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                console.log('Form validation failed: Invalid email format');
                return;
            }
            
            // Use form action and method from HTML
            const formAction = contactForm.action || contactForm.getAttribute('action');
            const formMethod = contactForm.method || contactForm.getAttribute('method') || 'POST';
            
            console.log('Submitting form to:', formAction, 'using method:', formMethod);
            
            // Make fetch request using form's action and method
            fetch(formAction, {
                method: formMethod.toUpperCase(),
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => {
                console.log('Form submission response status:', response.status);
                if (response.ok) {
                    // Success - show success message and reset form
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    console.log('Form submitted successfully');
                    contactForm.reset();
                } else {
                    // Handle server errors
                    return response.json().then(data => {
                        const errorMessage = data.errors ? data.errors.map(error => error.message).join(', ') : 'There was an error sending your message. Please try again.';
                        alert('Error: ' + errorMessage);
                        console.error('Form submission server error:', data);
                    }).catch(() => {
                        alert('There was an error sending your message. Please try again.');
                        console.error('Form submission error: Unable to parse error response');
                    });
                }
            })
            .catch(error => {
                // Handle network errors
                console.error('Form submission network error:', error);
                alert('There was an error sending your message. Please check your connection and try again.');
            });
        });
    }
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in effect
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed in future)
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.display = 'none';
    
    // Add mobile menu functionality
    function toggleMobileMenu() {
        navLinks.classList.toggle('mobile-open');
    }
    
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Check if mobile menu is needed
    function checkMobileMenu() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            document.querySelector('.nav').appendChild(navToggle);
        } else {
            navToggle.style.display = 'none';
            navLinks.classList.remove('mobile-open');
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
});

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4f46e5;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
        scrollToTopBtn.style.background = '#4338ca';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
        scrollToTopBtn.style.background = '#4f46e5';
    });
});
