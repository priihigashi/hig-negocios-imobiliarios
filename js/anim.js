/* ==========================================================================
   anim.js — Hig Negócios Imobiliários · lightweight motion layer
   --------------------------------------------------------------------------
   - Zero dependencies. Self-injects its own CSS.
   - No-JS safe: markup is fully visible without this file (JS adds the
     hiding class). If JS errors, a fallback timer reveals everything.
   - Honors prefers-reduced-motion (no hiding, no parallax, no count-up).
   - Three effects: (1) reveal-on-scroll (staggered), (2) subtle hero
     parallax, (3) count-up on stat numbers (preserves prefix/suffix).
   Used by the Labs prototype pages (index-b/c/d + inner -b). Not on the
   live Version A (kept static for now).
   ========================================================================== */
(function () {
  'use strict';
  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- inject CSS ---- */
  var css = '' +
    '.reveal{opacity:0;transform:translateY(26px);will-change:opacity,transform;' +
    'transition:opacity .8s cubic-bezier(.22,.61,.36,1),transform .8s cubic-bezier(.22,.61,.36,1)}' +
    '.reveal.in{opacity:1;transform:none}' +
    '@media (prefers-reduced-motion: reduce){.reveal,.reveal.in{opacity:1!important;transform:none!important}}';
  var st = document.createElement('style'); st.textContent = css;
  document.head.appendChild(st);

  /* selectors that get the reveal treatment (hero/nav excluded on purpose) */
  var SEL = [
    '.shead', '.section-header', '.featured', '.about', '.efeature', '.strip',
    '.statbar', '.cta', '.intro', '.amen-head', '.facts',
    '.grid > *', '.life-card', '.amen-card', '.rows .prow', '.vcard',
    '.bairro', '.step', '.testi-card'
  ].join(',');

  function revealNow(el) {
    // stagger within the same parent
    var sibs = el.parentNode ? Array.prototype.filter.call(el.parentNode.children, function (c) {
      return c.classList && c.classList.contains('reveal');
    }) : [];
    var idx = sibs.indexOf(el);
    var delay = Math.min(idx < 0 ? 0 : idx * 70, 350);
    el.style.transitionDelay = delay + 'ms';
    el.classList.add('in');
  }

  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
    if (!els.length) return;
    if (REDUCE || !('IntersectionObserver' in window)) { return; } // leave visible
    els.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealNow(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) * 0.95) { revealNow(el); } // above-fold: show immediately
      else { io.observe(el); }
    });

    // safety net: never leave anything hidden
    setTimeout(function () {
      els.forEach(function (el) { if (!el.classList.contains('in')) revealNow(el); });
    }, 3000);
  }

  /* ---- hero parallax (subtle) ---- */
  function initParallax() {
    if (REDUCE) return;
    var bgs = Array.prototype.slice.call(document.querySelectorAll('.hero-bg'));
    if (!bgs.length) return;
    var baseScale = 1.06, ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.pageYOffset || 0;
        bgs.forEach(function (bg) {
          var hero = bg.parentNode;
          if (!hero) return;
          if (y < hero.offsetHeight + 100) {
            bg.style.transform = 'scale(' + baseScale + ') translateY(' + (y * 0.18) + 'px)';
          }
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- count-up on stat numbers (keeps prefix/suffix) ---- */
  function parseNum(txt) {
    var m = String(txt).match(/^(\D*?)([\d]+(?:[.,]\d+)?)(.*)$/);
    if (!m) return null;
    var num = parseFloat(m[2].replace(',', '.'));
    var decimals = (m[2].indexOf('.') > -1 || m[2].indexOf(',') > -1) ? 1 : 0;
    return { pre: m[1], num: num, dec: decimals, suf: m[3] };
  }
  function animateCount(el) {
    var parsed = parseNum(el.textContent.trim());
    if (!parsed || isNaN(parsed.num)) return;
    if (REDUCE) return;
    var start = null, dur = 1100, from = 0, to = parsed.num;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = from + (to - from) * eased;
      el.textContent = parsed.pre + (parsed.dec ? val.toFixed(1) : Math.round(val)) + parsed.suf;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  function initCount() {
    var nums = Array.prototype.slice.call(document.querySelectorAll('.strip .num, .stat-num, .statbar .n'));
    nums = nums.filter(function (el) { return /\d/.test(el.textContent); });
    if (!nums.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function init() { initReveal(); initParallax(); initCount(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
