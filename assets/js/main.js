/* ============================================
   DevOps Roadmap 2026 — Site JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initTableWrappers();
  initTableOfContents();
  initMobileMenu();
  initBackToTop();
  initActiveTocHighlight();
});

/* --- Copy-to-clipboard for code blocks --- */
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code') || pre;
      const text = code.innerText || code.textContent;

      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        /* Fallback for older browsers */
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        } catch (e) {
          btn.textContent = 'Failed';
        }
        document.body.removeChild(textarea);
      });
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

/* --- Wrap tables for horizontal scroll --- */
function initTableWrappers() {
  document.querySelectorAll('.prose table').forEach(table => {
    if (table.parentElement.classList.contains('table-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

/* --- Table of Contents generation --- */
function initTableOfContents() {
  const tocList = document.querySelector('.toc-list');
  const content = document.querySelector('.prose');
  if (!tocList || !content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    const sidebar = document.querySelector('.toc-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    return;
  }

  headings.forEach((heading, i) => {
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    if (heading.tagName === 'H3') {
      a.classList.add('toc-h3');
    }
    li.appendChild(a);
    tocList.appendChild(li);
  });
}

/* --- Active TOC highlight on scroll --- */
function initActiveTocHighlight() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length === 0) return;

  const headings = [];
  tocLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) headings.push({ el, link });
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollPos = window.scrollY + 100;
      let current = null;

      for (let i = headings.length - 1; i >= 0; i--) {
        if (headings[i].el.offsetTop <= scrollPos) {
          current = headings[i];
          break;
        }
      }

      tocLinks.forEach(l => l.classList.remove('active'));
      if (current) current.link.classList.add('active');
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile menu toggle --- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    }
  });
}

/* --- Back to top button --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
