/**
 * Animations Module
 * Handles scroll animations and visual effects
 */
const Animations = {
    // Elements to animate
    animatedElements: [],
    
    /**
     * Initialize animations
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.checkInitialViewport();
    },
    
    /**
     * Cache elements for animation
     */
    cacheElements() {
        this.animatedElements = document.querySelectorAll('.fade-in, .card, .project-card, .testimonial-card, .education-card, .blog-post');
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Scroll-based animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });
        
        // Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            this.initIntersectionObserver();
        }
    },
    
    /**
     * Initialize Intersection Observer for better performance
     */
    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all animated elements
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    },
    
    /**
     * Handle scroll-based animations (fallback)
     */
    handleScrollAnimations() {
        if ('IntersectionObserver' in window) return; // Use observer if available
        
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        this.animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            // Check if element is in viewport
            if (scrollTop + windowHeight > elementTop + 100) {
                this.animateElement(element);
            }
        });
    },
    
    /**
     * Check viewport on initial load
     */
    checkInitialViewport() {
        // Animate elements already in viewport
        const windowHeight = window.innerHeight;
        
        this.animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            if (elementTop < windowHeight) {
                this.animateElement(element);
            }
        });
    },
    
    /**
     * Animate a single element
     * @param {Element} element - Element to animate
     */
    animateElement(element) {
        if (element.classList.contains('animated')) return;
        
        element.classList.add('fade-in', 'visible', 'animated');
    },
    
    /**
     * Add staggered animation to a group of elements
     * @param {NodeList} elements - Elements to animate
     * @param {number} delay - Delay between animations (ms)
     */
    staggeredAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * delay);
        });
    },
    
    /**
     * Animate section content when navigating
     * @param {Element} section - Section element
     */
    animateSection(section) {
        const cards = section.querySelectorAll('.card, .project-card, .testimonial-card, .education-card, .blog-post');
        
        // Reset animations
        cards.forEach(card => {
            card.classList.remove('visible', 'animated');
        });
        
        // Stagger animation
        setTimeout(() => {
            this.staggeredAnimation(cards, 150);
        }, 100);
    },
    
    /**
     * Smooth scroll to element
     * @param {Element} element - Element to scroll to
     * @param {number} offset - Offset from top (px)
     */
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },
    
    /**
     * Add hover effects to cards
     */
    initHoverEffects() {
        const cards = document.querySelectorAll('.card, .project-card, .testimonial-card, .education-card, .blog-post');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    },
    
    /**
     * Typing animation effect
     * @param {Element} element - Element to type in
     * @param {string} text - Text to type
     * @param {number} speed - Typing speed (ms per character)
     */
    typeText(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    },
    
    /**
     * Counter animation
     * @param {Element} element - Element to animate
     * @param {number} start - Start number
     * @param {number} end - End number
     * @param {number} duration - Animation duration (ms)
     */
    animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
};