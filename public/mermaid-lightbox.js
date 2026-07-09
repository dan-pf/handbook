// Click-to-expand lightbox for Mermaid diagrams (astro-mermaid renders each
// diagram as <pre class="mermaid"><svg/></pre>). Dependency-free; uses event
// delegation so it works regardless of when mermaid finishes rendering.
(function () {
  function init() {
    if (document.querySelector('.pf-lightbox')) return;
    var overlay = document.createElement('div');
    overlay.className = 'pf-lightbox';
    overlay.innerHTML =
      '<button class="pf-lightbox-close" aria-label="Close diagram">✕</button>' +
      '<div class="pf-lightbox-inner"></div>';
    document.body.appendChild(overlay);
    var inner = overlay.querySelector('.pf-lightbox-inner');

    function close() {
      overlay.classList.remove('is-open');
      inner.innerHTML = '';
      document.body.style.overflow = '';
    }

    function open(svg) {
      var clone = svg.cloneNode(true);
      var vb = svg.viewBox && svg.viewBox.baseVal;
      var rect = svg.getBoundingClientRect();
      var ar = vb && vb.width ? vb.width / vb.height : rect.width / rect.height || 1.6;
      var maxW = window.innerWidth * 0.92;
      var maxH = window.innerHeight * 0.88;
      var w = maxW;
      var h = w / ar;
      if (h > maxH) { h = maxH; w = h * ar; }
      clone.removeAttribute('style');
      clone.setAttribute('width', Math.round(w));
      clone.setAttribute('height', Math.round(h));
      clone.style.width = Math.round(w) + 'px';
      clone.style.height = Math.round(h) + 'px';
      clone.style.maxWidth = 'none';
      inner.innerHTML = '';
      inner.appendChild(clone);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      if (overlay.contains(e.target)) return;
      var pre = e.target.closest('pre.mermaid');
      if (!pre) return;
      var svg = pre.querySelector('svg');
      if (svg) open(svg);
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.pf-lightbox-close')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
