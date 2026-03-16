/**
 * Scroll to Top Button - Universal Implementation
 * Works on all pages with automatic button creation
 */

console.log('🚀 SCROLL-TO-TOP.JS LOADING...');

// Configuration
const CONFIG = {
    scrollThreshold: 300, // Show button after scrolling 300px
    buttonSize: 50, // Button size in pixels
    position: {
        bottom: 30,
        right: 30
    },
    colors: {
        background: 'linear-gradient(45deg, #0a97b2, #2d93a5)',
        hover: 'linear-gradient(45deg, #2d93a5, #0a97b2)',
        text: 'white'
    },
    animation: {
        duration: '0.3s',
        easing: 'ease'
    }
};

// Create scroll to top button
function createScrollToTopButton() {
    console.log('🔧 Creating scroll to top button...');
    
    // Remove existing button if any
    const existingBtn = document.getElementById('scrollToTop');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    // Create button element
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.setAttribute('title', 'Scroll to top');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    
    // Apply styles
    button.style.cssText = `
        position: fixed !important;
        bottom: ${CONFIG.position.bottom}px !important;
        right: ${CONFIG.position.right}px !important;
        width: ${CONFIG.buttonSize}px !important;
        height: ${CONFIG.buttonSize}px !important;
        background: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
        border: none !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 1.2rem !important;
        z-index: 9999 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(20px) !important;
        transition: all ${CONFIG.animation.duration} ${CONFIG.animation.easing} !important;
        box-shadow: 0 4px 15px rgba(10, 151, 178, 0.3) !important;
        outline: none !important;
    `;
    
    // Add to page
    document.body.appendChild(button);
    console.log('✅ Scroll to top button created and added to page');
    
    return button;
}

// Show/hide button based on scroll position
function handleScroll(button) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > CONFIG.scrollThreshold) {
        // Show button
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.transform = 'translateY(0)';
    } else {
        // Hide button
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        button.style.transform = 'translateY(20px)';
    }
}

// Add event listeners
function addEventListeners(button) {
    console.log('🔗 Adding event listeners...');
    
    // Scroll event listener
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(function() {
                handleScroll(button);
                isScrolling = false;
            });
        }
        isScrolling = true;
    }, { passive: true });
    
    // Click event listener
    button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🎯 Scroll to top clicked');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    button.addEventListener('mouseenter', function() {
        this.style.background = CONFIG.colors.hover;
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(10, 151, 178, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > CONFIG.scrollThreshold) {
            this.style.background = CONFIG.colors.background;
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(10, 151, 178, 0.3)';
        }
    });
    
    // Keyboard support
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    console.log('✅ Event listeners added');
}

// Initialize scroll to top functionality
function initScrollToTop() {
    console.log('🚀 Initializing scroll to top functionality...');
    
    // Check if button already exists
    let button = document.getElementById('scrollToTop');
    
    if (!button) {
        console.log('📝 No existing button found, creating new one...');
        button = createScrollToTopButton();
    } else {
        console.log('✅ Found existing button:', button);
    }
    
    // Add event listeners
    addEventListeners(button);
    
    // Initial scroll check
    handleScroll(button);
    
    console.log('✅ Scroll to top functionality initialized successfully');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
    // DOM is already ready
    initScrollToTop();
}

// Also initialize after a short delay to ensure everything is loaded
setTimeout(initScrollToTop, 1000);

console.log('✅ SCROLL-TO-TOP.JS LOADED SUCCESSFULLY');
