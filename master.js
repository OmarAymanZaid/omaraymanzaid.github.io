// Navigation elements
const header = document.querySelector('header');
const nav = document.querySelector('.nav-container');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');

// Toggle mobile navigation
navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
});

// Smooth scrolling for internal navigation links with fixed header offset
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = header.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        // Close mobile nav after click (if open)
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Handle other in-page anchors (logo/skip links)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        if (a.closest('.nav-links')) return; // already handled above
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = header.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simple UI feedback instead of blocking alert
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, 700);
    });
}

// Active link highlighting on scroll (accounts for fixed header)
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

function onScroll() {
    const navHeight = header.offsetHeight || 0;
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 30;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
document.addEventListener('DOMContentLoaded', onScroll);
