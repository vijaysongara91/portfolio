/* =========================================================
   1) FOOTER YEAR — show the current year automatically
   This way you never need to manually edit the HTML every year.
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();


/* =========================================================
   2) TYPING EFFECT — types text inside the terminal box
========================================================= */
const typedTextEl = document.getElementById('typed-text');
const linesToType = [
  "console.log('Hello, World!');",
  "Welcome to my portfolio 🚀"
];

let lineIndex = 0;   // which line is currently being typed
let charIndex = 0;   // which character within that line

function typeEffect() {
  const currentLine = linesToType[lineIndex];

  if (charIndex < currentLine.length) {
    // add one character at a time
    typedTextEl.textContent += currentLine.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 55); // next character after 55ms
  } else {
    // the full line is typed -> wait a bit, then erase it
    setTimeout(eraseEffect, 1400);
  }
}

function eraseEffect() {
  const currentLine = linesToType[lineIndex];

  if (charIndex > 0) {
    typedTextEl.textContent = currentLine.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 30); // erasing is a bit faster than typing
  } else {
    // move to the next line (and loop back to the first line if this was the last one)
    lineIndex = (lineIndex + 1) % linesToType.length;
    setTimeout(typeEffect, 400);
  }
}

typeEffect(); // start typing as soon as the page loads


/* =========================================================
   3) SCROLL REVEAL — fade sections in as they enter the screen
   IntersectionObserver is a built-in browser tool that tells us
   whether an element has become visible on screen or not.
========================================================= */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // stop checking once it has shown up
    }
  });
}, { threshold: 0.15 }); // trigger once 15% of the element is on screen

revealEls.forEach(el => revealObserver.observe(el));


/* =========================================================
   4) SKILL BARS ANIMATION — once the Skills section is on screen,
   animate the progress bars from 0% to their actual percentage
========================================================= */
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


/* =========================================================
   5) ACTIVE TAB HIGHLIGHT — while scrolling, automatically
   highlight the tab for whichever section is on screen
========================================================= */
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


/* =========================================================
   6) MOBILE HAMBURGER MENU
========================================================= */
const hamburger = document.getElementById('hamburger');
const tabsList = document.querySelector('.tabs');

hamburger.addEventListener('click', () => {
  tabsList.classList.toggle('mobile-open');
});

// close the mobile menu as soon as a link inside it is clicked
tabsList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    tabsList.classList.remove('mobile-open');
  });
});


/* =========================================================
   7) CONTACT FORM — demo submit for now (no real backend yet)
   NOTE: To actually send emails, use a service like Formspree or
   EmailJS. They give you an "action URL" which you plug in below.
========================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stop the page from reloading (default browser behaviour)

  // in the future, you can add fetch() here to call a real backend/Formspree
  formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
  contactForm.reset(); // clear the form fields

  setTimeout(() => { formStatus.textContent = ''; }, 4000);
});