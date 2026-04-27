
'use strict';
gsap.registerPlugin(ScrollTrigger);

/* ── NAV scroll state ── */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -60',
  onUpdate: s => nav.classList.toggle('scrolled', s.scroll() > 60)
});

/* ── NAV mobile toggle ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── HERO entrance — gsap.timeline() with position params ── */
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 });
heroTl
  .addLabel('start')
  .to('#heroTag',   { opacity: 1, duration: 0.9 },                    'start')
  .to('#heroLine1', { y: 0, opacity: 1, duration: 1.2 },              'start+=0.15')
  .to('#heroLine2', { y: 0, opacity: 1, duration: 1.2 },              'start+=0.28')
  .to('#heroSub',   { opacity: 1, y: 0, duration: 0.9 },              'start+=0.65')
  .to('#heroCtas',  { opacity: 1, y: 0, duration: 0.8 },              'start+=0.82')
  .to('#heroRight', { opacity: 1, x: 0, duration: 1.0 },              'start+=0.9')
  .to('#heroScroll',{ opacity: 1, duration: 0.7 },                    'start+=1.4');

/* ── Hero parallax (top-level tween, NOT inside timeline) ── */
gsap.to('#heroBg img', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.8
  }
});

/* ── Generic reveal batches ── */
ScrollTrigger.batch('[data-reveal]', {
  start: 'top 87%',
  once: true,
  interval: 0.06,
  batchMax: 4,
  onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
});
ScrollTrigger.batch('[data-reveal-left]', {
  start: 'top 87%',
  once: true,
  onEnter: els => gsap.to(els, { opacity: 1, x: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
});
ScrollTrigger.batch('[data-reveal-right]', {
  start: 'top 87%',
  once: true,
  onEnter: els => gsap.to(els, { opacity: 1, x: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
});
ScrollTrigger.batch('[data-reveal-fade]', {
  start: 'top 90%',
  once: true,
  onEnter: els => gsap.to(els, { opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
});
ScrollTrigger.batch('[data-reveal-scale]', {
  start: 'top 88%',
  once: true,
  interval: 0.06,
  batchMax: 3,
  onEnter: els => gsap.to(els, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' })
});

/* ── Services list — top-level timeline with ST ── */
const svcItems = document.querySelectorAll('.svc');
if (svcItems.length) {
  gsap.set(svcItems, { opacity: 0, x: -24 });
  const svcTl = gsap.timeline({
    scrollTrigger: { trigger: '.services__list', start: 'top 82%', once: true },
    defaults: { ease: 'power3.out', duration: 0.55 }
  });
  svcItems.forEach((el, i) => svcTl.to(el, { opacity: 1, x: 0 }, i * 0.07));
}

/* ── Gallery items stagger ── */
const galItems = document.querySelectorAll('.gal');
gsap.set(galItems, { opacity: 0, scale: 0.97 });
ScrollTrigger.batch(galItems, {
  start: 'top 88%',
  once: true,
  interval: 0.06,
  batchMax: 3,
  onEnter: b => gsap.to(b, { opacity: 1, scale: 1, duration: 0.85, stagger: 0.08, ease: 'power2.out', overwrite: true })
});

/* ── Counters ── */
document.querySelectorAll('[data-count]').forEach(el => {
  const target  = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const isFloat = el.hasAttribute('data-float');
  gsap.fromTo({ v: 0 }, { v: target }, {
    duration: 2.2,
    ease: 'power2.out',
    onUpdate() {
      const v = this.targets()[0].v;
      el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
    },
    scrollTrigger: { trigger: el, start: 'top 82%', once: true }
  });
});

/* ── Booking strip entrance ── */
gsap.timeline({
  scrollTrigger: { trigger: '#bookingStrip', start: 'top 75%', once: true },
  defaults: { ease: 'power3.out' }
})
.fromTo('#bookingStrip .booking-strip__text', { opacity:0, y:40 }, { opacity:1, y:0, duration:1.1 })
.fromTo('#bookingStrip .booking-strip__right', { opacity:0, x:30 }, { opacity:1, x:0, duration:0.9 }, '<0.2');

/* ── WA FAB ── */
setTimeout(() => document.getElementById('waFab')?.classList.add('show'), 2200);

/* ── About image subtle parallax ── */
const aboutImg = document.querySelector('.about__img-col img');
if (aboutImg) {
  gsap.to(aboutImg, {
    yPercent: -6,
    ease: 'none',
    scrollTrigger: { trigger: '.about__img-col', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
}