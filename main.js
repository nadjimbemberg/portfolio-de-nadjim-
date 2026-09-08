// ── CURSOR ──────────────────────────────────────────────
const cur = document.getElementById('cur');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .exp-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ── HEADER SCROLL SHADOW ──────────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ── SCROLL REVEAL ────────────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── SKILL BARS ───────────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      e.target.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.width + '%');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-panel').forEach(p => barObs.observe(p));

// ── SKILL TABS ───────────────────────────────────────────
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    panel.classList.add('active');
    setTimeout(() => panel.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.width + '%'), 50);
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

// ── SMOOTH SCROLL ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
