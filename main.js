/* ── Mobile Menu ─────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMenu() {
  mobileMenu.classList.add('open');
  burger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileClose?.addEventListener('click', closeMenu);
mobileMenu?.querySelectorAll('.mobile-link, .mobile-btn').forEach(el => {
  el.addEventListener('click', closeMenu);
});

/* ── Price Tabs ──────────────────────────────────────────── */
document.querySelectorAll('.price-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.price-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

/* ── FAQ ─────────────────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Reviews slider ──────────────────────────────────────── */
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('reviewPrev');
const nextBtn = document.getElementById('reviewNext');
if (track && prevBtn && nextBtn) {
  nextBtn.addEventListener('click', () => track.scrollBy({ left: 320, behavior: 'smooth' }));
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -320, behavior: 'smooth' }));
}

/* ── Scroll Reveal ───────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0');
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

/* ── Smooth anchor ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Sticky CTA hide when hero visible ───────────────────── */
const stickyCta = document.getElementById('stickyCta');
const heroActions = document.querySelector('.hero-actions');
if (stickyCta && heroActions) {
  const heroObs = new IntersectionObserver(entries => {
    stickyCta.style.opacity = entries[0].isIntersecting ? '0' : '1';
    stickyCta.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'all';
  }, { threshold: 0.5 });
  heroObs.observe(heroActions);
}
