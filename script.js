// script.js
const themeToggle = document.getElementById('theme-toggle');
// Initialize from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.checked = true;
}
// Smooth scroll and active nav link highlighting
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', themeToggle.checked);
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

// Optional: Form submit handler
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
  });
}

// Nav click scroll and highlight
const expList = document.querySelector('.experience-list');
const expItems = Array.from(document.querySelectorAll('.experience-list .experience-item'));
const navItems = Array.from(document.querySelectorAll('.experience-nav li'));

// Hover over an experience block: highlight corresponding number
expItems.forEach((item, idx) => {
  item.addEventListener('mouseenter', () => {
    navItems.forEach(n => n.classList.remove('active'));
    navItems[idx].classList.add('active');
  });
});

// Generate floating particles
const particlesContainer = document.querySelector('.particles');
for (let i = 0; i < 30; i++) {
  const span = document.createElement('span');
  const size = Math.random() * 20 + 10;
  const x = Math.random() * 100 + '%';
  const y = Math.random() * 100 + '%';
  const duration = Math.random() * 10 + 5;
  span.style.setProperty('--size', `${size}px`);
  span.style.setProperty('--x', x);
  span.style.setProperty('--y', y);
  span.style.setProperty('--duration', `${duration}s`);
  particlesContainer.appendChild(span);
}

// Cursor circle movement
const cursorCircle = document.querySelector('.cursor-circle');
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseleave', () => {
  cursorCircle.style.display = 'none';
});
heroSection.addEventListener('mouseenter', () => {
  cursorCircle.style.display = 'block';
});
document.querySelector('.hero').addEventListener('mousemove', (e) => {
  const { width, height } = cursorCircle.getBoundingClientRect();
  const heroRect = e.currentTarget.getBoundingClientRect();
  cursorCircle.style.left = `${e.clientX - heroRect.left - width / 2}px`;
  cursorCircle.style.top = `${e.clientY - heroRect.top - height / 2}px`;
});

// Music control: always play on load, pause/resume toggle
const bgMusic = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = musicToggleBtn.querySelector('i');
const musicHint = document.getElementById('music-hint');
musicHint.style.display = 'inline';

// Play on load unless previously turned off
window.addEventListener('load', () => {
  if (localStorage.getItem('music') !== 'off') {
    bgMusic.play().catch(() => {});
    musicToggleBtn.classList.remove('paused');
    musicIcon.classList.remove('fa-pause');
    musicIcon.classList.add('fa-music');
  } else {
    bgMusic.pause();
    musicToggleBtn.classList.add('paused');
    musicIcon.classList.remove('fa-music');
    musicIcon.classList.add('fa-pause');
  }
});

musicToggleBtn.addEventListener('click', () => {
  musicHint.style.display = 'none';
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggleBtn.classList.remove('paused');
    musicIcon.classList.remove('fa-pause');
    musicIcon.classList.add('fa-music');
    localStorage.setItem('music', 'on');
  } else {
    bgMusic.pause();
    musicToggleBtn.classList.add('paused');
    musicIcon.classList.remove('fa-music');
    musicIcon.classList.add('fa-pause');
    localStorage.setItem('music', 'off');
  }
});