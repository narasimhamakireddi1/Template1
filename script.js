/* ================================================================
   EMBER & OAK — Premium Restaurant JavaScript
================================================================ */

'use strict';

/* ── Utilities ─────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ── DOM Ready ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNav();
  initMobileMenu();
  initThemeToggle();
  initRevealAnimations();
  initCounters();
  initTestimonialCarousel();
  initMenuFilter();
  initGalleryFilter();
  initLightbox();
  initReservationForm();
  initNewsletterForm();
  initActiveNavLinks();
  setCurrentYear();
  initDateMin();
});

/* ── 1. SCROLL PROGRESS ─────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${Math.min(100, (scrolled / max) * 100)}%`;
  };

  on(window, 'scroll', update, { passive: true });
}

/* ── 2. NAVIGATION ──────────────────────────────────────────────── */
function initNav() {
  const nav = $('#mainNav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  on(window, 'scroll', onScroll, { passive: true });
  onScroll();
}

/* ── 3. MOBILE MENU ─────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const menu      = $('#mobileMenu');
  const overlay   = $('#menuOverlay');
  const close     = $('#mobileClose');

  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  on(hamburger, 'click', open);
  on(close, 'click', closeMenu);
  on(overlay, 'click', closeMenu);

  // Close on nav link click
  $$('.mobile-menu__link, .mobile-menu__btn').forEach(link => {
    on(link, 'click', closeMenu);
  });

  // Close on Escape
  on(document, 'keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

/* ── 4. THEME TOGGLE ────────────────────────────────────────────── */
function initThemeToggle() {
  const btn  = $('#themeToggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('eo-theme');
  if (saved) html.setAttribute('data-theme', saved);

  on(btn, 'click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('eo-theme', next);
  });
}

/* ── 5. REVEAL ANIMATIONS ───────────────────────────────────────── */
function initRevealAnimations() {
  const els = $$('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));

  // Immediately reveal hero elements (above fold)
  $$('#hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('revealed'), 100);
  });
}

/* ── 6. COUNTER ANIMATIONS ──────────────────────────────────────── */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur    = 1600;
      const start  = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ── 7. TESTIMONIAL CAROUSEL ────────────────────────────────────── */
function initTestimonialCarousel() {
  const track   = $('#testimonialsTrack');
  const dotsWrap= $('#testimonialDots');
  const prevBtn = $('#testimonialPrev');
  const nextBtn = $('#testimonialNext');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  let current  = 0;
  let perView  = getPerView();
  let autoTimer;
  const totalSlides = cards.length;

  function getPerView() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, totalSlides - perView);
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonials__dot' + (i === current ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Review ${i + 1}`);
      on(dot, 'click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    $$('.testimonials__dot', dotsWrap).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function updateTrack() {
    const cardWidth = cards[0].offsetWidth + 24; // gap=1.5rem=24px approx
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    updateTrack();
    resetAuto();
  }

  function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  on(prevBtn, 'click', prev);
  on(nextBtn, 'click', next);

  // Touch / swipe support
  let touchX = 0;
  on(track, 'touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  on(track, 'touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  });

  // Keyboard
  on(document, 'keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Resize
  let resizeTimer;
  on(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      perView = getPerView();
      current = Math.min(current, maxIndex());
      buildDots();
      updateTrack();
    }, 150);
  });

  buildDots();
  updateTrack();
  startAuto();

  // Pause auto on hover
  on(track, 'mouseenter', () => clearInterval(autoTimer));
  on(track, 'mouseleave', startAuto);
}

/* ── 8. MENU FILTER + SEARCH ────────────────────────────────────── */
function initMenuFilter() {
  const filters   = $$('.menu-filter');
  const items     = $$('.menu-item');
  const searchEl  = $('#menuSearch');
  const emptyMsg  = $('#menuEmpty');
  if (!filters.length) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    items.forEach(item => {
      const cat     = item.dataset.category || '';
      const name    = (item.dataset.name || '').toLowerCase();
      const catMatch  = activeCategory === 'all' || cat === activeCategory;
      const termMatch = !searchTerm || name.includes(searchTerm);
      const visible   = catMatch && termMatch;

      item.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });

    if (emptyMsg) {
      emptyMsg.hidden = visibleCount > 0;
    }
  }

  filters.forEach(btn => {
    on(btn, 'click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      applyFilters();
    });
  });

  if (searchEl) {
    on(searchEl, 'input', () => {
      searchTerm = searchEl.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ── 9. GALLERY FILTER ──────────────────────────────────────────── */
function initGalleryFilter() {
  const filters = $$('.gallery-filter');
  const items   = $$('.gallery__item');
  if (!filters.length) return;

  filters.forEach(btn => {
    on(btn, 'click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.gfilter;

      items.forEach(item => {
        const itemCat = item.dataset.gcat || '';
        const visible = cat === 'all' || itemCat === cat;
        item.classList.toggle('g-hidden', !visible);
      });
    });
  });
}

/* ── 10. LIGHTBOX ───────────────────────────────────────────────── */
function initLightbox() {
  const lightbox = $('#lightbox');
  const imgEl    = $('#lightboxImg');
  const captEl   = $('#lightboxCaption');
  const closeBtn = $('#lightboxClose');
  const prevBtn  = $('#lightboxPrev');
  const nextBtn  = $('#lightboxNext');
  const backdrop = $('#lightboxBackdrop');
  if (!lightbox) return;

  const items = $$('.gallery__item');
  let currentIdx = 0;

  function openAt(idx) {
    currentIdx = idx;
    const item = items[idx];
    const img  = $('img', item);
    imgEl.src  = img.src;
    imgEl.alt  = img.alt;
    if (captEl) captEl.textContent = img.alt;
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    imgEl.focus();
  }

  function close() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIdx = (currentIdx - 1 + items.length) % items.length;
    openAt(currentIdx);
  }

  function showNext() {
    currentIdx = (currentIdx + 1) % items.length;
    openAt(currentIdx);
  }

  items.forEach((item, idx) => {
    on(item, 'click', () => openAt(idx));
  });

  on(closeBtn, 'click', close);
  on(backdrop, 'click', close);
  on(prevBtn, 'click', showPrev);
  on(nextBtn, 'click', showNext);

  on(document, 'keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch swipe on lightbox
  let lbTouchX = 0;
  on(lightbox, 'touchstart', e => { lbTouchX = e.touches[0].clientX; }, { passive: true });
  on(lightbox, 'touchend', e => {
    const diff = lbTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? showNext() : showPrev();
  });
}

/* ── 11. RESERVATION FORM ───────────────────────────────────────── */
function initReservationForm() {
  const form    = $('#reservationForm');
  const success = $('#reservationSuccess');
  const submitBtn = $('#submitBtn');
  if (!form) return;

  const validators = {
    firstName : v => v.trim().length >= 2          ? '' : 'Please enter your first name.',
    lastName  : v => v.trim().length >= 2          ? '' : 'Please enter your last name.',
    email     : v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.',
    phone     : v => v.trim().length >= 7          ? '' : 'Please enter a valid phone number.',
    date      : v => v                             ? '' : 'Please select a date.',
    time      : v => v                             ? '' : 'Please select a time.',
    guests    : v => v                             ? '' : 'Please select the number of guests.',
  };

  function showError(field, msg) {
    const input = form.elements[field];
    const errEl = $(`#${field}Error`);
    if (input) input.classList.toggle('error', !!msg);
    if (input) input.classList.toggle('valid', !msg && input.value);
    if (errEl) errEl.textContent = msg;
  }

  function validateField(field) {
    const input = form.elements[field];
    if (!input || !validators[field]) return true;
    const err = validators[field](input.value);
    showError(field, err);
    return !err;
  }

  // Inline validation on blur
  Object.keys(validators).forEach(field => {
    const input = form.elements[field];
    if (input) {
      on(input, 'blur', () => validateField(field));
      on(input, 'input', () => {
        if (input.classList.contains('error')) validateField(field);
      });
    }
  });

  on(form, 'submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    Object.keys(validators).forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) return;

    // Show loading state
    submitBtn.disabled = true;
    const btnText    = $('[data-text]', submitBtn) || submitBtn;
    const btnLoading = $('.btn__loading', submitBtn);
    const btnTextEl  = $('.btn__text', submitBtn);
    if (btnTextEl) btnTextEl.setAttribute('hidden', '');
    if (btnLoading) btnLoading.removeAttribute('hidden');

    // Simulate submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200));

    form.hidden     = true;
    success.hidden  = false;

    // Scroll into view
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ── 12. NEWSLETTER FORM ────────────────────────────────────────── */
function initNewsletterForm() {
  const form = $('#newsletterForm');
  const msg  = $('#newsletterMsg');
  if (!form) return;

  on(form, 'submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      if (msg) msg.textContent = 'Please enter a valid email.';
      return;
    }

    const btn = form.querySelector('button');
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }

    await new Promise(r => setTimeout(r, 1000));

    form.reset();
    if (msg) msg.textContent = 'Thank you for subscribing! ✓';
    if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; }
    setTimeout(() => { if (msg) msg.textContent = ''; }, 5000);
  });
}

/* ── 13. ACTIVE NAV LINK ON SCROLL ──────────────────────────────── */
function initActiveNavLinks() {
  const sections = $$('section[id]');
  const links    = $$('.nav__link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── 14. CURRENT YEAR ───────────────────────────────────────────── */
function setCurrentYear() {
  const el = $('#currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── 15. DATE MINIMUM ───────────────────────────────────────────── */
function initDateMin() {
  const dateInput = $('#date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
