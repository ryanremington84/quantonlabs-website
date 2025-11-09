/* ========= Quanton minimal enhancements ========= */

// 1) Respect motion preferences, initialize AOS accordingly
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  AOS.init({
    once: true,
    offset: 80,
    duration: 700,
    easing: 'ease-out'
  });
} else {
  // Remove AOS attributes to avoid hidden-on-load states
  document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));
}

// 2) Smooth in-page anchor scrolling, no hash-jumps
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
});

// 3) iOS 100vh fix, set --vh to actual viewport height
function setVHUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVHUnit();
window.addEventListener('resize', throttle(setVHUnit, 150));
// You can use it in CSS as height: calc(var(--vh) * 100);

/* 4) Spline viewer ergonomics: basic load state and fallback border */
const viewer = document.querySelector('.hero-3d');
if (viewer) {
  const loadGuard = setTimeout(() => {
    viewer.style.border = '1px solid rgba(0,128,255,0.15)'; // subtle frame if slow to load
  }, 3500);

  // Spline dispatches a generic 'load' when ready
  viewer.addEventListener('load', () => {
    clearTimeout(loadGuard);
    viewer.style.border = 'none';
    viewer.dataset.loaded = 'true';
  }, { once: true });

  // Pause hover styles while user is interacting with the 3D canvas
  viewer.addEventListener('pointerdown', () => document.body.classList.add('interacting-3d'));
  window.addEventListener('pointerup', () => document.body.classList.remove('interacting-3d'));
}

/* 5) Keyboard-first UX: show focus rings only when tabbing */
(function focusVisiblePolyfill() {
  let usingMouse = false;
  window.addEventListener('mousedown', () => {
    usingMouse = true;
    document.documentElement.classList.remove('kb-nav');
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      usingMouse = false;
      document.documentElement.classList.add('kb-nav');
    }
  });
})();

/* 6) Tiny ripple on primary buttons for tactile feedback */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${e.clientX - rect.left - size / 2}px`;
    r.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 450);
  });
});

/* 7) Throttle utility */
function throttle(fn, wait) {
  let last = 0, t;
  return function(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      clearTimeout(t);
      last = now;
      fn.apply(this, args);
    } else {
      clearTimeout(t);
      t = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  };
}
