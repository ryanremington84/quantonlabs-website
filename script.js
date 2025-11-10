/* =========================================================
   Quanton Labs — Production JavaScript
   Version 1.0 | November 2025
   ========================================================= */

// Utilities first
function throttle(fn, wait) {
  let lastTime = 0;
  let timeout;
  
  return function() {
    const now = Date.now();
    const remaining = wait - (now - lastTime);
    const args = arguments;
    const context = this;
    
    if (remaining <= 0) {
      clearTimeout(timeout);
      lastTime = now;
      fn.apply(context, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        lastTime = Date.now();
        fn.apply(context, args);
      }, remaining);
    }
  };
}

// 1) Respect motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 2) Smooth anchor scrolling with motion respect
document.addEventListener('click', function(e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  
  const targetId = anchor.getAttribute('href').slice(1);
  if (!targetId) return;
  
  const target = document.getElementById(targetId);
  if (!target) return;
  
  e.preventDefault();
  target.scrollIntoView({ 
    behavior: prefersReducedMotion ? 'auto' : 'smooth', 
    block: 'start' 
  });
});

// 3) iOS viewport height fix for full-height sections
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', throttle(setViewportHeight, 150));

// 4) Keyboard navigation: show focus only when tabbing
(function() {
  let isMouseUser = false;
  
  window.addEventListener('mousedown', function() {
    isMouseUser = true;
    document.documentElement.classList.remove('kb-nav');
  });
  
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      isMouseUser = false;
      document.documentElement.classList.add('kb-nav');
    }
  });
})();

// 5) Subtle ripple effect on buttons
document.querySelectorAll('button[class*="btn"], a[class*="btn"]').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    if (prefersReducedMotion) return;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(function() {
      ripple.remove();
    }, 450);
  });
});

// 6) Spline scroll fix - allow page scroll while preserving interaction
document.addEventListener('DOMContentLoaded', function() {
  const splineViewers = document.querySelectorAll('spline-viewer');
  
  splineViewers.forEach(viewer => {
    // Disable pointer-events briefly during scroll
    let scrollTimeout;
    
    window.addEventListener('wheel', function() {
      viewer.style.pointerEvents = 'none';
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        viewer.style.pointerEvents = 'auto';
      }, 100);
    }, { passive: true });
  });
});
