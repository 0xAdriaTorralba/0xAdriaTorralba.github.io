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
    
    // Counter for clicks/tabs
    let clickCount = 0;
    const REQUIRED_CLICKS = 6;
    const TELEGRAM_URL = 'https://t.me/AdriaTorralba';
    
    // Reset counter after 3 seconds of inactivity
    let resetTimeout;
    const RESET_DELAY = 3000; // 3 seconds
    
    function resetCounter() {
      clickCount = 0;
    }
    
    function handleInteraction() {
      // Clear any existing reset timeout
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
      
      clickCount++;
      
      // If we've reached the required number of clicks, redirect
      if (clickCount >= REQUIRED_CLICKS) {
        window.location.href = TELEGRAM_URL;
        return;
      }
      
      // Set a timeout to reset the counter if no more interactions
      resetTimeout = setTimeout(resetCounter, RESET_DELAY);
    }
    
    // Handle click events
    profileImage.addEventListener('click', function(e) {
      e.preventDefault();
      handleInteraction();
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

