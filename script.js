document.getElementById('year').textContent = new Date().getFullYear();

const typedTextEl = document.getElementById('typed-text');
const linesToType = [
  "console.log('Hello, World!');",
  "Welcome to my portfolio 🚀"
];

let lineIndex = 0;   
let charIndex = 0;   

function typeEffect() {
  const currentLine = linesToType[lineIndex];

  if (charIndex < currentLine.length) {
    typedTextEl.textContent += currentLine.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 55); 
  } else {
    setTimeout(eraseEffect, 1400);
  }
}

function eraseEffect() {
  const currentLine = linesToType[lineIndex];

  if (charIndex > 0) {
    typedTextEl.textContent = currentLine.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 30); 
  } else {
    lineIndex = (lineIndex + 1) % linesToType.length;
    setTimeout(typeEffect, 400);
  }
}

typeEffect();


const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); 
    }
  });
}, { threshold: 0.15 }); 

revealEls.forEach(el => revealObserver.observe(el));



const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width'); // reading the % from the HTML
      bar.style.width = targetWidth + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(bar => skillObserver.observe(bar));


const sections = document.querySelectorAll('section[id], header[id]');
const tabs = document.querySelectorAll('.tab');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));


const hamburger = document.getElementById('hamburger');
const tabsList = document.querySelector('.tabs');

hamburger.addEventListener('click', () => {
  tabsList.classList.toggle('mobile-open');
});


tabsList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    tabsList.classList.remove('mobile-open');
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); 

  formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
  contactForm.reset(); 

  setTimeout(() => { formStatus.textContent = ''; }, 4000);
});