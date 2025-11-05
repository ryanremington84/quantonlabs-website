// File: assets/js/main.js
/**
 * Quanton Labs Website
 * Mobile navigation and accessibility controls
 */

(function() {
  'use strict';

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  /**
   * Toggle mobile menu open/closed state
   */
  function toggleMenu() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    
    navToggle.setAttribute('aria-expanded', !isOpen);
    navMenu.classList.toggle('is-open');
    
    // Trap focus in menu when open
    if (!isOpen) {
      navLinks[0].focus();
    }
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    navToggle.focus();
  }

  // Toggle button click handler
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking nav links
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu.classList.contains('is-open') && 
        !navMenu.contains(event.target) && 
        !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Handle window resize - close menu and reset on larger screens
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 767 && navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    }, 250);
  });

})();
