(function() {
  'use strict';

  const CONFIG = {
    enableAnimations: true,
    enableFormEnhancements: true,
    enableAccessibility: true,
    enableBackToTop: true,
    enableReadingProgress: true,
    enableSearch: true,
    enableExtraFeatures: true
  };

  if (CONFIG.enableAnimations) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s';
    window.addEventListener('load', () => { document.body.style.opacity = '1'; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.card, .card-secondary, article').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.4s, transform 0.4s';
        observer.observe(el);
      });
    });
  }

 /*Back To Top*/
  if (CONFIG.enableBackToTop) {
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.createElement('button');
      btn.innerHTML = '↑';
      btn.id = 'btt';
      btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:44px;height:44px;background:#FF6B35;color:#0D0D0D;border:2px solid #FF6B35;font:bold 18px monospace;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s;z-index:50';
      document.body.appendChild(btn);

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const show = window.scrollY > 400;
            btn.style.opacity = show ? '1' : '0';
            btn.style.visibility = show ? 'visible' : 'hidden';
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
      btn.onmouseenter = () => { btn.style.background = 'transparent'; btn.style.color = '#FF6B35'; };
      btn.onmouseleave = () => { btn.style.background = '#FF6B35'; btn.style.color = '#0D0D0D'; };
    });
  }

 /*Reading Progress*/
  if (CONFIG.enableReadingProgress && /\/posts\/\d+$/.test(location.pathname)) {
    document.addEventListener('DOMContentLoaded', () => {
      const bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#FF6B35,#00E5FF);width:0;z-index:100;transition:width 0.1s';
      document.body.appendChild(bar);

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            bar.style.width = Math.min(progress, 100) + '%';
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    });
  }

 /*Form*/
  if (CONFIG.enableFormEnhancements) {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
          const btn = this.querySelector('button[type="submit"]');
          if (btn && !btn.disabled) {
            btn.dataset.originalText = btn.textContent;
            btn.textContent = 'PROCESSING...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
          }
        });
      });

      document.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
          this.style.borderColor = this.value.trim() ? '' : '#FF6B35';
        });
        input.addEventListener('input', function() {
          if (this.value.trim()) this.style.borderColor = '';
        });
      });

      document.querySelectorAll('a[href*="delete"], form[action*="delete"] button').forEach(el => {
        el.addEventListener('click', function(e) {
          if (!confirm('⚠️ Confirm destruction? This cannot be undone.')) {
            e.preventDefault();
          }
        });
      });
    });
  }

 /*Accessibility*/
  if (CONFIG.enableAccessibility) {
    document.addEventListener('DOMContentLoaded', () => {
      const skip = document.createElement('a');
      skip.href = '#main-content';
      skip.textContent = 'Skip to content';
      skip.style.cssText = 'position:absolute;top:-40px;left:0;background:#FF6B35;color:#0D0D0D;padding:8px 16px;z-index:100;transition:top 0.2s;font:12px monospace';
      skip.onfocus = () => skip.style.top = '0';
      skip.onblur = () => skip.style.top = '-40px';
      document.body.insertBefore(skip, document.body.firstChild);

      const main = document.querySelector('main');
      if (main) { main.id = 'main-content'; main.tabIndex = -1; }

      const style = document.createElement('style');
      style.textContent = '*:focus-visible{outline:2px solid #FF6B35!important;outline-offset:2px}';
      document.head.appendChild(style);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.text-3xl.font-display');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          const final = parseInt(e.target.textContent) || 0;
          if (final > 0) {
            e.target.dataset.counted = '1';
            let current = 0;
            const step = Math.max(1, Math.ceil(final / 20));
            const timer = setInterval(() => {
              current = Math.min(current + step, final);
              e.target.textContent = current;
              if (current >= final) clearInterval(timer);
            }, 40);
          }
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  });


 /*Features*/
  if (CONFIG.enableExtraFeatures) {
    document.addEventListener('DOMContentLoaded', () => {
      if (/\/posts\/\d+$/.test(location.pathname)) {
        const header = document.querySelector('header.card');
        if (header) {
          const title = document.querySelector('h1')?.textContent || 'Preserved Text';
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(`📚 "${title}" - Preserved in the Memory Vault`);

          const share = document.createElement('div');
          share.style.cssText = 'display:flex;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);flex-wrap:wrap;align-items:center';
          share.innerHTML = `
            <span style="font-family:monospace;font-size:11px;color:#666">SHARE:</span>
            <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" style="padding:6px 12px;background:transparent;border:1px solid #1DA1F2;color:#1DA1F2;font:10px monospace;text-decoration:none">TWITTER</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" style="padding:6px 12px;background:transparent;border:1px solid #0077B5;color:#0077B5;font:10px monospace;text-decoration:none">LINKEDIN</a>
            <button id="copy-link" style="padding:6px 12px;background:transparent;border:1px solid #FF6B35;color:#FF6B35;font:10px monospace;cursor:pointer">COPY LINK</button>
          `;
          header.appendChild(share);

          document.getElementById('copy-link')?.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href);
            this.textContent = 'COPIED!';
            setTimeout(() => this.textContent = 'COPY LINK', 2000);
          });
        }

        const textContent = document.querySelector('.whitespace-pre-wrap');
        if (textContent) {
          const text = textContent.textContent || '';
          const words = text.trim().split(/\s+/).length;
          const chars = text.length;
          const time = Math.ceil(words / 200);

          const stats = document.createElement('div');
          stats.style.cssText = 'display:flex;gap:16px;padding:12px;background:rgba(255,107,53,0.1);border-left:3px solid #FF6B35;margin-bottom:16px;font:11px monospace';
          stats.innerHTML = `<div>WORDS: <span style="color:#FF6B35">${words}</span></div><div>CHARS: <span style="color:#00E5FF">${chars}</span></div><div>TIME: <span style="color:#22c55e">${time} min</span></div>`;
          textContent.parentElement.insertBefore(stats, textContent);
        }
      }

      const helpBtn = document.createElement('button');
      helpBtn.innerHTML = '⌨️';
      helpBtn.title = 'Keyboard Shortcuts (?)';
      helpBtn.style.cssText = 'position:fixed;bottom:24px;left:24px;width:40px;height:40px;background:#1a1a1a;border:1px solid #333;color:#666;font-size:16px;cursor:pointer;z-index:50';
      document.body.appendChild(helpBtn);

      const shortcuts = {
        'h': () => location.href = '/home',
        'l': () => location.href = '/posts',
        'n': () => location.href = '/posts/new',
        'p': () => location.href = '/profile',
        '/': () => document.getElementById('search-input')?.focus(),
        'Escape': () => { document.activeElement.blur(); document.getElementById('shortcuts-modal')?.remove(); },
        '?': showHelp
      };

      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          if (e.key === 'Escape') e.target.blur();
          return;
        }
        if (shortcuts[e.key]) { e.preventDefault(); shortcuts[e.key](); }
      });

      helpBtn.onclick = showHelp;

      function showHelp() {
        document.getElementById('shortcuts-modal')?.remove();
        const modal = document.createElement('div');
        modal.id = 'shortcuts-modal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:100';
        modal.innerHTML = `
          <div style="background:#1a1a1a;border:2px solid #FF6B35;padding:24px;max-width:360px;width:90%">
            <div style="display:flex;justify-content:space-between;margin-bottom:16px">
              <span style="font:bold 14px monospace;color:#FF6B35">[SHORTCUTS]</span>
              <button onclick="this.closest('#shortcuts-modal').remove()" style="background:none;border:none;color:#666;font-size:20px;cursor:pointer">×</button>
            </div>
            <div style="font:12px monospace">
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #333"><span style="color:#888">Home</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">H</kbd></div>
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #333"><span style="color:#888">Library</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">L</kbd></div>
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #333"><span style="color:#888">New Post</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">N</kbd></div>
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #333"><span style="color:#888">Profile</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">P</kbd></div>
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #333"><span style="color:#888">Search</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">/</kbd></div>
              <div style="display:flex;justify-content:space-between;padding:8px 0"><span style="color:#888">This Help</span><kbd style="background:#333;padding:2px 8px;color:#00E5FF">?</kbd></div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
      }
    });
  }

  console.log('Project 451 All-in-One loaded');
})();














