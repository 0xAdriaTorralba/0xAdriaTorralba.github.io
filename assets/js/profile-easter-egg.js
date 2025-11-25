/**
 * Easter egg: Click or tab 6 times on the profile photo to redirect to Telegram
 */
(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profile-container');
    
    if (!profileContainer) {
      return; // Profile container not found, exit early
    }

    // Find the profile image (img element inside the profile container)
    const profileImage = profileContainer.querySelector('img');
    
    if (!profileImage) {
      return; // Profile image not found, exit early
    }

    // Make the image focusable for keyboard navigation
    profileImage.setAttribute('tabindex', '0');
    profileImage.style.cursor = 'pointer';
    profileImage.style.userSelect = 'none';
    profileImage.style.webkitUserSelect = 'none';
    profileImage.style.webkitTouchCallout = 'none';
    
    // Also make container interactive for better touch support on Android
    profileContainer.style.cursor = 'pointer';
    
    // Counter for clicks/tabs
    let clickCount = 0;
    const REQUIRED_CLICKS = 6;
    const TELEGRAM_URL = 'https://t.me/AdriaTorralba';
    
    // Reset counter after 3 seconds of inactivity
    let resetTimeout;
    const RESET_DELAY = 3000; // 3 seconds
    
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Track touch events to prevent double-firing with click events
    let touchHandled = false;
    let lastInteractionTime = 0;
    
    function resetCounter() {
      clickCount = 0;
    }
    
    function handleInteraction() {
      const now = Date.now();
      
      // Prevent rapid-fire interactions (debounce)
      if (now - lastInteractionTime < 100) {
        return;
      }
      lastInteractionTime = now;
      
      // Clear any existing reset timeout
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
      
      clickCount++;
      
      // If we've reached the required number of clicks, redirect
      if (clickCount >= REQUIRED_CLICKS) {
        // Use window.location for better compatibility across devices
        window.location.href = TELEGRAM_URL;
        return;
      }
      
      // Set a timeout to reset the counter if no more interactions
      resetTimeout = setTimeout(resetCounter, RESET_DELAY);
    }
    
    // Handle touch events for mobile devices (especially Android)
    // Listen on both image and container for better Android support
    const touchElements = [profileImage, profileContainer];
    
    if (isTouchDevice) {
      touchElements.forEach(function(element) {
        element.addEventListener('touchstart', function(e) {
          touchHandled = false;
        }, { passive: true });
        
        element.addEventListener('touchend', function(e) {
          if (!touchHandled) {
            e.preventDefault();
            e.stopPropagation();
            touchHandled = true;
            handleInteraction();
          }
        });
      });
    }
    
    // Handle click events (for desktop and as fallback)
    // Listen on both image and container
    touchElements.forEach(function(element) {
      element.addEventListener('click', function(e) {
        // On touch devices, ignore click events that immediately follow touch events
        // This prevents double-firing on mobile devices
        if (isTouchDevice && touchHandled) {
          touchHandled = false;
          return;
        }
        
        if (!isTouchDevice) {
          e.preventDefault();
        }
        handleInteraction();
      });
    });
    
    // Handle keyboard events (Enter and Space when focused)
    profileImage.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleInteraction();
      }
    });
  });
})();

