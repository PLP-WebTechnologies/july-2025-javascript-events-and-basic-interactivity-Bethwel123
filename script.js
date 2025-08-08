document.addEventListener('DOMContentLoaded', function() {
    // Part 1: Event Handling
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Part 2: Interactive Elements
    // Quote Modal
    const quoteBtn = document.getElementById('quote-btn');
    const quoteModal = document.getElementById('quote-modal');
    const closeBtn = document.querySelector('.close');
    
    quoteBtn.addEventListener('click', function() {
        quoteModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        quoteModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === quoteModal) {
            quoteModal.style.display = 'none';
        }
    });

    // Quote Calculation
    const quoteForm = document.getElementById('quote-form');
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const weight = parseFloat(document.getElementById('weight').value);
        
        if (!from || !to || !weight) {
            alert('Please fill all fields');
            return;
        }
        
        if (from === to) {
            alert('Pickup and destination cannot be the same');
            return;
        }
        
        // Simple pricing calculation
        let basePrice = 300; // Base price in KES
        const distanceMultiplier = getDistanceMultiplier(from, to);
        const weightCharge = Math.max(0, weight - 1) * 50; // 50 KES per kg over 1kg
        
        const total = Math.round(basePrice * distanceMultiplier + weightCharge);
        
        document.getElementById('quote-result').innerHTML = `
            <div class="quote-details">
                <h4>Your Quote</h4>
                <p>From: ${from.charAt(0).toUpperCase() + from.slice(1)}</p>
                <p>To: ${to.charAt(0).toUpperCase() + to.slice(1)}</p>
                <p>Weight: ${weight} kg</p>
                <p class="total-price">Total: KES ${total}</p>
            </div>
        `;
    });

    function getDistanceMultiplier(from, to) {
        // Simplified distance calculation
        if (from === 'nairobi') {
            if (to === 'mombasa') return 2.5;
            if (to === 'kisumu') return 1.8;
            if (to === 'nakuru') return 1.2;
        }
        if (from === 'mombasa') {
            if (to === 'nairobi') return 2.5;
            if (to === 'kisumu') return 3.0;
            if (to === 'nakuru') return 2.8;
        }
        // Default multiplier
        return 1.5;
    }

    // Services Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Tracking Functionality
    const trackBtn = document.getElementById('track-btn');
    trackBtn.addEventListener('click', function() {
        const trackingNumber = document.getElementById('tracking-number').value.trim();
        const trackingResult = document.getElementById('tracking-result');
        
        if (!trackingNumber) {
            trackingResult.innerHTML = '<p class="error">Please enter a tracking number</p>';
            return;
        }
        
        // Simulate tracking lookup
        trackingResult.innerHTML = '<p>Searching for your parcel...</p>';
        
        setTimeout(() => {
            // Mock tracking results
            const statuses = [
                "Parcel collected from sender",
                "In transit to sorting facility",
                "Processed at Nairobi hub",
                "Out for delivery",
                "Delivered"
            ];
            
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            
            trackingResult.innerHTML = `
                <div class="tracking-details">
                    <h4>Tracking #${trackingNumber}</h4>
                    <p><strong>Status:</strong> ${randomStatus}</p>
                    <p><strong>Location:</strong> ${randomLocation}</p>
                    <p><strong>Last Update:</strong> ${new Date().toLocaleString()}</p>
                </div>
            `;
        }, 1500);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers first
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current answer if it wasn't active
            if (!isActive) {
                answer.classList.add('active');
            }
        });
    });

    // Part 3: Form Validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors();
        
        // Validate fields
        const nameValid = validateName();
        const emailValid = validateEmail();
        const phoneValid = validatePhone();
        const messageValid = validateMessage();
        
        // If all valid, show success
        if (nameValid && emailValid && phoneValid && messageValid) {
            showSuccess();
            contactForm.reset();
        }
    });

    // Real-time validation
    document.getElementById('contact-name').addEventListener('blur', validateName);
    document.getElementById('contact-email').addEventListener('blur', validateEmail);
    document.getElementById('contact-phone').addEventListener('blur', validatePhone);
    document.getElementById('contact-message').addEventListener('blur', validateMessage);

    // Validation functions
    function validateName() {
        const name = document.getElementById('contact-name').value.trim();
        const errorElement = document.getElementById('name-error');
        
        if (name === '') {
            errorElement.textContent = 'Name is required';
            return false;
        } else if (name.length < 3) {
            errorElement.textContent = 'Name must be at least 3 characters';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('contact-email').value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            errorElement.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            errorElement.textContent = 'Please enter a valid email address';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('contact-phone').value.trim();
        const errorElement = document.getElementById('phone-error');
        const phoneRegex = /^[0-9]{10}$/;
        
        if (phone === '') {
            errorElement.textContent = 'Phone number is required';
            return false;
        } else if (!phoneRegex.test(phone)) {
            errorElement.textContent = 'Please enter a valid 10-digit Kenyan phone number';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }

    function validateMessage() {
        const message = document.getElementById('contact-message').value.trim();
        const errorElement = document.getElementById('message-error');
        
        if (message === '') {
            errorElement.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(error => {
            error.textContent = '';
        });
    }

    function showSuccess() {
        const successElement = document.getElementById('form-success');
        successElement.textContent = 'Your message has been sent successfully!';
        successElement.style.display = 'block';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
});