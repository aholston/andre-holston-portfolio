/**
 * Contact Form Module
 * Handles form submission and validation
 */
const ContactForm = {
    form: null,
    
    /**
     * Initialize contact form
     */
    init() {
        this.cacheElements();
        this.bindEvents();
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.form = document.getElementById('contact-form');
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        }
    },
    
    /**
     * Handle form submission
     * @param {Event} e - Form submission event
     */
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        this.showLoadingState();
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
        }, 1000);
    },
    
    /**
     * Validate form data
     * @param {Object} data - Form data object
     * @return {boolean} Whether form is valid
     */
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            this.showErrorMessages(errors);
            return false;
        }
        
        return true;
    },
    
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @return {boolean} Whether email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Show loading state
     */
    showLoadingState() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
    },
    
    /**
     * Show success message
     */
    showSuccessMessage() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
        
        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            text-align: center;
        `;
        successDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        
        // Insert after form
        this.form.parentNode.insertBefore(successDiv, this.form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    },
    
    /**
     * Show error messages
     * @param {Array} errors - Array of error messages
     */
    showErrorMessages(errors) {
        // Remove existing error messages
        const existingErrors = this.form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        `;
        
        // Add error list
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '1.5rem';
        
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorDiv.appendChild(errorList);
        
        // Insert at beginning of form
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        // Remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 10000);
    }
};