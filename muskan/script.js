// ===========================
// PORTFOLIO SCRIPT - Rama Kumari
// ===========================

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(255,255,255,0.95)';
  navLinks.style.backdropFilter = 'blur(20px)';
  navLinks.style.padding = '16px 20px 24px';
  navLinks.style.borderBottom = '2px solid rgba(167,139,250,0.2)';
  navLinks.style.boxShadow = '0 8px 32px rgba(124,58,237,0.12)';
  navLinks.style.zIndex = '999';
  navLinks.style.gap = '4px';
});

if (hamburger) {
  hamburger.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
}

// Close hamburger on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navLinks.style.display = 'none';
    }
  });
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .cert-card, .edu-card, .achievement-card, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Staggered delay for grid children
document.querySelectorAll('.skills-grid, .projects-grid, .cert-grid, .edu-grid, .achievements-grid, .contact-grid').forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// --- ACTIVE NAV LINK HIGHLIGHT ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.cta-btn)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.style.background = '';
        link.style.color = '';
      });
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.style.background = 'rgba(192,132,252,0.15)';
        activeLink.style.color = '#7c3aed';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// --- AVATAR PARALLAX ---
const avatarClay = document.getElementById('avatar-clay');
if (avatarClay) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    avatarClay.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// --- CLAY CARD TILT EFFECT ---
document.querySelectorAll('.clay-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) scale(1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
  });
});

// --- TYPING EFFECT on hero tagline ---
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const originalText = tagline.textContent;
  tagline.textContent = '';
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      tagline.textContent += originalText[i];
      i++;
      if (i >= originalText.length) clearInterval(interval);
    }, 40);
  }, 700);
}

// --- COUNTER ANIMATION for highlights ---
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target;
      const text = numEl.textContent;
      const num = parseFloat(text);
      if (!isNaN(num)) {
        const suffix = text.replace(num.toString(), '');
        animateCounter(numEl, num, suffix);
      }
      counterObserver.unobserve(numEl);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.h-num, .stat-val').forEach(el => {
  counterObserver.observe(el);
});

// --- SMOOTH SCROLL polish ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- CLICKABLE CARDS (Projects / Certificates / Achievements) ---
document.querySelectorAll('.project-card[data-url], .cert-card[data-url], .achievement-card[data-url]').forEach(card => {
  const url = card.getAttribute('data-url');
  if (!url) return;

  card.addEventListener('click', (e) => {
    if (e.target && e.target.closest && e.target.closest('a')) return;
    window.open(url, '_blank', 'noopener');
  });

  card.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      window.open(url, '_blank', 'noopener');
    }
  });
});

// --- CONSOLE BANNER ---
console.log('%c👋 Rama Kumari Portfolio', 'color: #7c3aed; font-weight:900; font-size:18px;');
console.log('%c🚀 CS Engineer · ML Developer · Problem Solver', 'color: #ec4899; font-weight:600;');

// --- FOOTER YEAR ---
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// --- PROFILE IMAGE FALLBACK ---
const profileImg = document.getElementById('profile-img');
const avatarInner = document.getElementById('avatar-inner');
if (profileImg && avatarInner) {
  const syncAvatarPhotoState = () => {
    if (profileImg.complete && profileImg.naturalWidth > 0) {
      avatarInner.classList.add('has-photo');
    } else {
      avatarInner.classList.remove('has-photo');
    }
  };

  profileImg.addEventListener('load', () => {
    syncAvatarPhotoState();
  });
  profileImg.addEventListener('error', () => {
    syncAvatarPhotoState();
  });

  // Handle instant/cached loads where `load` may fire before listeners attach.
  syncAvatarPhotoState();
}
