const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});
