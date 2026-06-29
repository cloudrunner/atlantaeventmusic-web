const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const siteNav = document.getElementById('site-nav');

mobileMenuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('nav-open');
});

const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute('aria-expanded', 'false');
      otherButton.closest('.faq-item')?.classList.remove('active');
    });

    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      item?.classList.add('active');
    }
  });
});

const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsContainer = document.querySelector('.carousel-dots');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let intervalId;

function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    if (index === currentSlide) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
  renderDots();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoPlay() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 6000);
}

prevButton?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startAutoPlay();
});

nextButton?.addEventListener('click', () => {
  nextSlide();
  startAutoPlay();
});

showSlide(0);
startAutoPlay();

window.addEventListener('visibilitychange', () => {
  if (document.hidden) clearInterval(intervalId);
  else startAutoPlay();
});
