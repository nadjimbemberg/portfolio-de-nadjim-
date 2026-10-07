// ── HEADER SCROLL SHADOW ──────────────────────────────────
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });
}

// ── SCROLL REVEAL ────────────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── SKILL TABS ───────────────────────────────────────────
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── EXPERIENCE ───────────────────────────────────────────
document.querySelectorAll('.exp-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.exp-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.exp-detail').forEach(d => d.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('exp-' + item.dataset.exp).classList.add('active');
  });
});

// ── SMOOTH SCROLL (in-page anchors) ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── SUBTLE 3D TILT + PARALLAX (skipped for reduced-motion / touch) ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!prefersReducedMotion && !isCoarsePointer) {
  const MAX_TILT = 6; // degrees — kept low so it reads as refined, not gimmicky
  document.querySelectorAll('.home-avatar, .photo-frame, .skill-item').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  const parallaxLayers = [
    { el: document.querySelector('.home-avatar-col'), speed: 0.06 },
    { el: document.querySelector('.about-photo'),      speed: 0.08 },
  ].filter(p => p.el);

  if (parallaxLayers.length) {
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY;
      parallaxLayers.forEach(p => { p.el.style.transform = `translateY(${(y * p.speed).toFixed(1)}px)`; });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    });
  }
}
