/* ================================================================
   LUP LINE BARBER STUDIO — js/main.js
   GSAP Timeline + ScrollTrigger (siguiendo skills)
   Sidebar dark toggle · Animaciones modernas suaves
================================================================ */
'use strict';
gsap.registerPlugin(ScrollTrigger);

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ══════════════════════════════════════════
   SIDEBAR — toggle para mobile
══════════════════════════════════════════ */
function initSidebar() {
  const sidebar  = $('.sidebar');
  const toggle   = $('.mobile-toggle');
  const overlay  = $('.sidebar-overlay');
  if (!toggle || !sidebar) return;

  const open = () => {
    sidebar.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    sidebar.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () =>
    sidebar.classList.contains('open') ? close() : open()
  );
  overlay?.addEventListener('click', close);
  $$('.nav-item').forEach(item => item.addEventListener('click', close));
}

/* ══════════════════════════════════════════
   ACTIVE NAV ITEM — marca la página actual
══════════════════════════════════════════ */
function initActiveNav() {
  const path = location.pathname.split('/').pop() || 'inicio.html';
  $$('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === path) item.classList.add('active');
    else item.classList.remove('active');
  });
}

/* ══════════════════════════════════════════
   HERO ENTRANCE
   gsap.timeline() con position param (skill)
══════════════════════════════════════════ */
function initHero() {
  if (!$('.hero')) return;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });

  tl.addLabel('in')
    /* Eyebrow pill */
    .to('.hero__eyebrow',    { opacity: 1, y: 0, duration: 0.8 }, 'in')
    /* Título línea a línea */
    .to('.hero__title-line', { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 'in+=0.1')
    /* Descripción */
    .to('.hero__desc',       { opacity: 1, y: 0, duration: 0.9 }, 'in+=0.6')
    /* Botones */
    .to('.hero__btns',       { opacity: 1, y: 0, duration: 0.8 }, 'in+=0.78');
}

/* ══════════════════════════════════════════
   SCROLL REVEALS — batch top-to-bottom
   (requerimiento de la skill)
══════════════════════════════════════════ */
function initReveals() {
  ScrollTrigger.batch('[data-up]', {
    start: 'top 88%', once: true, interval: 0.06, batchMax: 4,
    onEnter: els => gsap.to(els, { opacity:1, y:0, duration:0.9, stagger:0.1, ease:'power3.out' })
  });
  ScrollTrigger.batch('[data-left]', {
    start: 'top 88%', once: true, interval: 0.06,
    onEnter: els => gsap.to(els, { opacity:1, x:0, duration:0.9, stagger:0.1, ease:'power3.out' })
  });
  ScrollTrigger.batch('[data-right]', {
    start: 'top 88%', once: true, interval: 0.06,
    onEnter: els => gsap.to(els, { opacity:1, x:0, duration:0.9, stagger:0.1, ease:'power3.out' })
  });
  ScrollTrigger.batch('[data-fade]', {
    start: 'top 90%', once: true,
    onEnter: els => gsap.to(els, { opacity:1, duration:0.8, stagger:0.08, ease:'power2.out' })
  });
  ScrollTrigger.batch('[data-scale]', {
    start: 'top 88%', once: true, interval: 0.06,
    onEnter: els => gsap.to(els, { opacity:1, scale:1, duration:0.9, stagger:0.1, ease:'power3.out' })
  });
}

/* ══════════════════════════════════════════
   SERVICES — top-level timeline con ST
══════════════════════════════════════════ */
function initServices() {
  const rows = $$('.svc-row');
  if (!rows.length) return;
  gsap.set(rows, { opacity:0, x:-20 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: rows[0].parentElement, start: 'top 82%', once: true },
    defaults: { ease: 'power3.out', duration: 0.55 }
  });
  rows.forEach((r,i) => tl.to(r, { opacity:1, x:0 }, i * 0.07));
}

/* ══════════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════════ */
function initStats() {
  $$('.stat-n').forEach((el, i) => {
    const target = parseFloat(el.dataset.target);
    const suf    = el.dataset.suffix || '';
    if (isNaN(target)) return;
    const isFloat = String(target).includes('.');
    gsap.fromTo({ v: 0 }, { v: target }, {
      duration: 2, ease: 'power2.out', delay: i * 0.08,
      onUpdate() {
        const v = this.targets()[0].v;
        el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suf;
      },
      scrollTrigger: {
        trigger: el, start: 'top 84%', once: true,
        onEnter: () => el.closest('.stat-cell')?.classList.add('lit')
      }
    });
  });
}

/* ══════════════════════════════════════════
   SCHEDULE ROWS — top-level timeline
══════════════════════════════════════════ */
function initSchedule() {
  const rows = $$('.sch-row');
  if (!rows.length) return;
  gsap.set(rows, { opacity:0, x:-16 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.sch-list', start: 'top 82%', once: true },
    defaults: { ease: 'power3.out', duration: 0.5 }
  });
  rows.forEach((r,i) => tl.to(r, { opacity:1, x:0 }, i * 0.07));
}

/* ══════════════════════════════════════════
   ABOUT parallax
══════════════════════════════════════════ */
function initAbout() {
  const img = $('.about-img img');
  if (!img) return;
  /* Top-level tween con scrub — nunca dentro de timeline */
  gsap.to(img, {
    yPercent: -6, ease: 'none',
    scrollTrigger: { trigger: '.about-img', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
}

/* ══════════════════════════════════════════
   CTA ENTRANCE
══════════════════════════════════════════ */
function initCta() {
  if (!$('.cta-block')) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.cta-block', start: 'top 72%', once: true },
    defaults: { ease: 'power3.out' }
  });
  tl.fromTo('.cta-block .section__label', { opacity:0, y:14 }, { opacity:1, y:0, duration:0.7 })
    .fromTo('.cta-title',                  { opacity:0, y:46 }, { opacity:1, y:0, duration:1.1 }, '<0.15')
    .fromTo('.cta-sub',                    { opacity:0, y:22 }, { opacity:1, y:0, duration:0.9 }, '<0.2')
    .fromTo('.cta-block .hero__btns',      { opacity:0, y:18 }, { opacity:1, y:0, duration:0.8 }, '<0.2');
}

/* ══════════════════════════════════════════
   CURSOR hover en foto — scale suave
══════════════════════════════════════════ */
function initImageHovers() {
  $$('.full-img, .about-img').forEach(el => {
    el.addEventListener('mouseenter', () =>
      gsap.to(el, { scale: 1.01, duration: 0.6, ease: 'power2.out' })
    );
    el.addEventListener('mouseleave', () =>
      gsap.to(el, { scale: 1, duration: 0.6, ease: 'power2.out' })
    );
  });
}

/* ══════════════════════════════════════════
   PROGRESS BAR (en la parte superior del main)
══════════════════════════════════════════ */
function initProgress() {
  const bar = $('.progress');
  if (!bar) return;
  ScrollTrigger.create({
    start: 'top top', end: 'max',
    onUpdate: s => { bar.style.width = (s.progress * 100) + '%'; }
  });
}

/* ══════════════════════════════════════════
   WA FAB
══════════════════════════════════════════ */
function initFab() {
  setTimeout(() => { $('.wa-fab')?.classList.add('show'); }, 2000);
}

/* ══════════════════════════════════════════
   MAGNETIC NAV ITEMS — micro-interacción
══════════════════════════════════════════ */
function initMagneticNav() {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () =>
      gsap.to(item, { x: 3, duration: 0.3, ease: 'power2.out' })
    );
    item.addEventListener('mouseleave', () =>
      gsap.to(item, { x: 0, duration: 0.4, ease: 'power3.out' })
    );
  });
}

/* ══════════════════════════════════════════
   INIT ALL
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initActiveNav();
  initHero();
  initReveals();
  initServices();
  initStats();
  initSchedule();
  initAbout();
  initCta();
  initImageHovers();
  initProgress();
  initFab();
  initMagneticNav();
});