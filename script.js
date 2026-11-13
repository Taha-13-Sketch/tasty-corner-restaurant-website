// 1. Glowing light that follows the mouse
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (event) => {
  cursorGlow.style.left = event.clientX + 'px';
  cursorGlow.style.top = event.clientY + 'px';
});

// 2. Floating food emojis
const foods = ['🍔', '🍕', '🍟', '🌮', '🥤', '🍗', '🍩'];

for (let i = 0; i < 18; i++) {
  const item = document.createElement('span');
  item.className = 'floating-food';
  item.textContent = foods[Math.floor(Math.random() * foods.length)];
  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = 18 + Math.random() * 28 + 'px';
  item.style.animationDuration = 14 + Math.random() * 16 + 's';
  item.style.animationDelay = Math.random() * -30 + 's';
  document.body.appendChild(item);
}

// 3. Make the banner loop forever (copy its content once)
const track = document.querySelector('.marquee-track');
track.innerHTML += track.innerHTML;

// 4. Reveal things when you scroll to them
const revealItems = document.querySelectorAll(
  '.menu h2, .menu-card, .about-text, .about-box, .contact h2, .contact-info div, .contact-form'
);

revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.animationDelay = (index % 3) * 0.15 + 's';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => observer.observe(item));

// Contact form: send in the background and show a thank-you message
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button');
  button.textContent = 'Sending...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.innerHTML = '<p class="form-message">✅ Thank you! Your message was sent. We will reply soon.</p>';
    } else {
      button.textContent = 'Send message';
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    button.textContent = 'Send message';
    alert('Network problem. Please try again.');
  }
});