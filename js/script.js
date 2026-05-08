/* ============================================================
   DARDIC RESORT GUREZ — Main JavaScript
   Author: Kaiser Mohiuddin
   Version: 1.0
   ============================================================ */

'use strict';

/* ─── NAVBAR ─────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const allLinks  = document.querySelectorAll('.nav-links a:not(.btn-book)');

  // Scroll → add/remove scrolled class
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Back-to-top
    const topBtn = document.querySelector('.float-top');
    if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link highlighting
  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
    });
  }
  setActiveLink();
})();


/* ─── HERO SLIDER ────────────────────────────────────────────── */
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const DELAY  = 5000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Touch/swipe
  let touchStart = 0;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStart;
      if (Math.abs(dx) > 50) { goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
    });
  }

  goTo(0);
  startAuto();
})();


/* ─── TESTIMONIALS SLIDER ────────────────────────────────────── */
(function initTestimonialsSlider() {
  const track    = document.querySelector('.testimonials-track');
  const prevBtn  = document.querySelector('.t-prev');
  const nextBtn  = document.querySelector('.t-next');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 6s
  setInterval(() => goTo(current + 1), 6000);
})();


/* ─── GALLERY LIGHTBOX ───────────────────────────────────────── */
(function initLightbox() {
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCap = document.querySelector('.lightbox-caption');
  const closeBtn    = document.querySelector('.lightbox-close');
  if (!lightbox) return;

  function openLightbox(src, caption) {
    if (!src) return;
    lightboxImg.src = src;
    if (lightboxCap) lightboxCap.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // Bind gallery items
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src || item.querySelector('img')?.src;
      const cap = item.dataset.caption || '';
      openLightbox(src, cap);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();


/* ─── GALLERY FILTER ─────────────────────────────────────────── */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.gallery-masonry-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
})();


/* ─── CONTACT FORM ───────────────────────────────────────────── */
(function initContactForm() {
  const form    = document.querySelector('.contact-form');
  const success = document.querySelector('.form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    // Simulate form submit (frontend only)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      if (success) success.style.display = 'block';
      form.reset();
      btn.textContent = 'Send Enquiry';
      btn.disabled = false;
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }, 1200);
  });
})();


/* ─── BACK TO TOP ────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.querySelector('.float-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ─── SMOOTH SCROLL (fallback for anchor links) ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─── COUNTER ANIMATION ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.target, 10);
      const dur = 1800;
      const step = end / (dur / 16);
      let cur = 0;

      const tick = () => {
        cur = Math.min(cur + step, end);
        el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
        if (cur < end) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();


/* ─── LAZY LOADING ───────────────────────────────────────────── */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // Native lazy load supported
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) img.src = img.dataset.src;
      obs.unobserve(img);
    });
  });
  imgs.forEach(img => obs.observe(img));
})();
