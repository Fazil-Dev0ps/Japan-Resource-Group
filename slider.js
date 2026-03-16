// Simple and Robust Slider Implementation
console.log('Loading robust slider.js...');

// Global variables
let currentSlideIndex = 0;
let slides = [];
let dots = [];
let slideInterval = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing robust slider...');
    initRobustSlider();
});

function initRobustSlider() {
    console.log('Initializing robust slider...');
    
    // Get slides and dots
    slides = Array.from(document.querySelectorAll('.slide'));
    dots = Array.from(document.querySelectorAll('.dot'));
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    
    if (slides.length === 0) {
        console.error('No slides found!');
        return;
    }
    
    // Log all slides for debugging
    slides.forEach((slide, index) => {
        console.log(`Slide ${index}:`, slide.className, slide.getAttribute('data-slide'));
    });
    
    // Initialize first slide
    showSlideRobust(0);
    
    // Add event listeners
    addEventListeners();
    
    // Start auto-slide with a small delay to ensure everything is ready
    setTimeout(() => {
        startAutoSlide();
        console.log('Auto-slide started after initialization delay');
    }, 1000);
    
    console.log('Robust slider initialized successfully!');
}

function showSlideRobust(index) {
    console.log(`=== Showing slide ${index} ===`);
    
    // Ensure index is within bounds
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    console.log(`Final index: ${index}`);
    
    // Hide all slides with explicit CSS
    slides.forEach((slide, i) => {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.display = 'none';
        slide.classList.remove('active');
        console.log(`Hidden slide ${i}`);
    });
    
    // Show current slide with explicit CSS
    const currentSlide = slides[index];
    if (currentSlide) {
        // Use !important to override CSS
        currentSlide.style.setProperty('opacity', '1', 'important');
        currentSlide.style.setProperty('visibility', 'visible', 'important');
        currentSlide.style.setProperty('display', 'flex', 'important');
        currentSlide.classList.add('active');
        console.log(`Showed slide ${index}`);
    }
    
    // Update dots
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            dot.style.backgroundColor = '#2d93a5';
        } else {
            dot.classList.remove('active');
            dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
    });
    
    currentSlideIndex = index;
    console.log(`Current slide set to: ${currentSlideIndex}`);
    console.log(`=== Slide ${index} display completed ===`);
}

function addEventListeners() {
    console.log('Adding event listeners...');
    
    // Next button
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next button clicked');
            nextSlideRobust();
        });
        console.log('Next button listener added');
    }
    
    // Previous button
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Previous button clicked');
            prevSlideRobust();
        });
        console.log('Previous button listener added');
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Dot ${index} clicked`);
            goToSlideRobust(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlideRobust();
        } else if (e.key === 'ArrowRight') {
            nextSlideRobust();
        }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlideRobust();
                } else {
                    prevSlideRobust();
                }
            }
        });
    }
}

function nextSlideRobust() {
    console.log('Next slide called');
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlideRobust(nextIndex);
    resetAutoSlide();
}

function prevSlideRobust() {
    console.log('Previous slide called');
    const prevIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    showSlideRobust(prevIndex);
    resetAutoSlide();
}

function goToSlideRobust(index) {
    console.log(`Going to slide ${index}`);
    showSlideRobust(index);
    resetAutoSlide();
}

function startAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    console.log('Starting auto-slide with 3 second interval...');
    slideInterval = setInterval(() => {
        console.log('Auto-slide triggered - advancing to next slide');
        nextSlideRobust();
    }, 3000);
    
    console.log('Auto-slide started successfully');
}

function resetAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    startAutoSlide();
}

function pauseAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resumeAutoSlide() {
    if (!slideInterval) {
        startAutoSlide();
    }
}

// Pause on hover
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', resumeAutoSlide);
    }
});

// Global functions for HTML onclick attributes
window.changeSlide = function(direction) {
    console.log('changeSlide called with direction:', direction);
    if (direction > 0) {
        nextSlideRobust();
    } else {
        prevSlideRobust();
    }
};

window.currentSlide = function(slideNumber) {
    console.log('currentSlide called with slide number:', slideNumber);
    goToSlideRobust(slideNumber - 1);
};

// Test functions
window.testSlides = function() {
    console.log('=== Testing Slides ===');
    console.log('Total slides:', slides.length);
    console.log('Current slide:', currentSlideIndex);
    
    slides.forEach((slide, index) => {
        const isActive = slide.classList.contains('active');
        const dataSlide = slide.getAttribute('data-slide');
        const computedStyle = window.getComputedStyle(slide);
        console.log(`Slide ${index}: active=${isActive}, data-slide=${dataSlide}, opacity=${computedStyle.opacity}, visibility=${computedStyle.visibility}`);
    });
};

window.showAllSlides = function() {
    console.log('=== Making all slides visible ===');
    slides.forEach((slide, index) => {
        slide.style.opacity = '0.5';
        slide.style.visibility = 'visible';
        slide.style.display = 'flex';
        slide.style.border = '2px solid blue';
        slide.style.zIndex = '1';
    });
    
    setTimeout(() => {
        slides.forEach((slide, index) => {
            slide.style.opacity = '';
            slide.style.visibility = '';
            slide.style.display = '';
            slide.style.border = '';
            slide.style.zIndex = '';
        });
        showSlideRobust(currentSlideIndex);
    }, 3000);
};

window.forceSlide = function(index) {
    console.log(`Force showing slide ${index}`);
    showSlideRobust(index);
};

// Export API
window.slider = {
    next: nextSlideRobust,
    previous: prevSlideRobust,
    goTo: goToSlideRobust,
    getCurrent: () => currentSlideIndex,
    getTotal: () => slides.length,
    test: testSlides,
    showAll: showAllSlides,
    force: forceSlide,
    startAuto: startAutoSlide,
    stopAuto: pauseAutoSlide,
    resetAuto: resetAutoSlide
};

// Manual test function for autoplay
window.testAutoplay = function() {
    console.log('=== Testing Autoplay ===');
    console.log('Current slide:', currentSlideIndex);
    console.log('Total slides:', slides.length);
    console.log('Auto-slide interval:', slideInterval ? 'Running' : 'Not running');
    
    if (!slideInterval) {
        console.log('Starting autoplay...');
        startAutoSlide();
    } else {
        console.log('Stopping autoplay...');
        pauseAutoSlide();
        setTimeout(() => {
            console.log('Restarting autoplay...');
            startAutoSlide();
        }, 2000);
    }
};

console.log('Robust slider.js loaded successfully!');