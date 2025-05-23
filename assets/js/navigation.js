/**
 * Navigation Module
 * Handles single-page app navigation, mobile menu, and scroll effects
 */
const Navigation = {
    // Elements
    navbar: null,
    navLinks: null,
    mobileMenu: null,
    sections: null,
    
    // State
    currentSection: 'home',
    isMenuOpen: false,
    
    /**
     * Initialize navigation
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setInitialState();
    },
    
    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.getElementById('nav-links');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.sections = document.querySelectorAll('.section');
        this.navLinkElements = document.querySelectorAll('.nav-link');
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Navigation link clicks
        this.navLinkElements.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
                this.closeMobileMenu();
            });
        });
        
        // CTA button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-section]') && !e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.navigateToSection(section);
            }
        });
        
        // Mobile menu toggle
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const section = e.state ? e.state.section : 'home';
            this.navigateToSection(section, false);
        });
        
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && this.isValidSection(hash)) {
                this.navigateToSection(hash, false);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    },
    
    /**
     * Set initial state based on URL hash
     */
    setInitialState() {
        const hash = window.location.hash.slice(1);
        const initialSection = (hash && this.isValidSection(hash)) ? hash : 'home';
        this.navigateToSection(initialSection, false);
        
        // Force update of navigation state
        setTimeout(() => {
            this.updateActiveNavLink(initialSection);
        }, 100);
    },
    
    /**
     * Navigate to a specific section
     * @param {string} sectionId - The section to navigate to
     * @param {boolean} updateHistory - Whether to update browser history
     */
    navigateToSection(sectionId, updateHistory = true) {
        if (!this.isValidSection(sectionId)) {
            console.warn(`Invalid section: ${sectionId}`);
            return;
        }
        
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update navigation state
            this.updateActiveNavLink(sectionId);
            this.currentSection = sectionId;
            
            // Update browser history and URL
            if (updateHistory) {
                const url = sectionId === 'home' ? '/' : `#${sectionId}`;
                history.pushState({ section: sectionId }, '', url);
            }
            
            // Scroll to top of section
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Trigger animations for the new section
            this.triggerSectionAnimations(targetSection);
            
            // Update page title
            this.updatePageTitle(sectionId);
        }
    },
    
    /**
     * Update active state of navigation links
     * @param {string} sectionId - The active section ID
     */
    updateActiveNavLink(sectionId) {
        this.navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    },
    
    /**
     * Check if section ID is valid
     * @param {string} sectionId - The section ID to validate
     * @return {boolean} Whether the section is valid
     */
    isValidSection(sectionId) {
        const validSections = ['home', 'philosophy', 'education', 'testimonials', 'blog', 'contact'];
        return validSections.includes(sectionId);
    },
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navLinks.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        this.mobileMenu.setAttribute('aria-expanded', this.isMenuOpen);
        this.navLinks.setAttribute('aria-hidden', !this.isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
            this.navLinks.classList.remove('active');
            this.mobileMenu.classList.remove('active');
            this.mobileMenu.setAttribute('aria-expanded', 'false');
            this.navLinks.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    },
    
    /**
     * Handle scroll effects
     */
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to navbar for styling
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Close mobile menu on scroll
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
    },
    
    /**
     * Trigger animations for section elements
     * @param {Element} section - The section element
     */
    triggerSectionAnimations(section) {
        // Find all elements with fade-in class
        const animatedElements = section.querySelectorAll('.fade-in');
        
        // Add visible class with staggered delay
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        });
    },
    
    /**
     * Update page title based on current section
     * @param {string} sectionId - The current section ID
     */
    updatePageTitle(sectionId) {
        const titles = {
            home: 'Andre Holston - Senior Engineering Manager',
            philosophy: 'Leadership Philosophy - Andre Holston',
            education: 'Education & Certifications - Andre Holston',
            testimonials: 'Testimonials - Andre Holston',
            blog: 'Blog - Andre Holston',
            contact: 'Contact - Andre Holston'
        };
        
        document.title = titles[sectionId] || titles.home;
    },
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        // Prevent rapid double clicks
        const now = Date.now();
        if (now - this.lastToggleTime < 300) {
            return;
        }
        this.lastToggleTime = now;
        
        if (!this.navLinks || !this.mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Check actual DOM state instead of internal flag
        const isCurrentlyOpen = this.navLinks.classList.contains('mobile-open');
        
        if (isCurrentlyOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },
    
    /**
     * Open mobile menu
     */
    openMobileMenu() {
    if (!this.navLinks || !this.mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    this.isMenuOpen = true;
    this.navLinks.classList.add('mobile-open');
    this.mobileMenu.classList.add('active');

    if (window.innerWidth <= 768) {
        this.navLinks.style.display = 'flex';
    } else {
        this.navLinks.style.display = '';
    }

    document.body.style.overflow = 'hidden';
    this.updateMobileMenuIcon();
},
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
    if (!this.navLinks || !this.mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    this.isMenuOpen = false;
    this.navLinks.classList.remove('mobile-open');
    this.mobileMenu.classList.remove('active');

    // Only hide nav links if we're in mobile view
    if (window.innerWidth <= 768) {
        this.navLinks.style.display = 'none';
    } else {
        this.navLinks.style.display = ''; // Reset to CSS default
    }

    document.body.style.overflow = '';
    this.updateMobileMenuIcon();
},
    
    /**
     * Update mobile menu icon (hamburger to X)
     */
    updateMobileMenuIcon() {
        if (!this.mobileMenu) return;
        
        const spans = this.mobileMenu.querySelectorAll('span');
        if (spans.length < 3) {
            console.warn('Hamburger spans not found');
            return;
        }
        
        // Check if menu is actually open by looking at the DOM
        const isMenuOpen = this.navLinks && this.navLinks.classList.contains('mobile-open');
        
        if (isMenuOpen) {
            // Transform to X
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Transform back to hamburger
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    },
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyboardNavigation(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Arrow key navigation between sections
        if (e.altKey) {
            const sections = ['home', 'philosophy', 'education', 'testimonials', 'blog', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.navigateToSection(sections[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                this.navigateToSection(sections[currentIndex - 1]);
            }
        }
    },
    
    /**
     * Get current section
     * @return {string} Current section ID
     */
    getCurrentSection() {
        return this.currentSection;
    },
    
    /**
     * Programmatically navigate to section (for use by other modules)
     * @param {string} sectionId - The section to navigate to
     */
    goTo(sectionId) {
        this.navigateToSection(sectionId);
    }
};

