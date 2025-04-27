// js/mobile-nav.js

const primaryNav = document.getElementById('primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const menuIcon = navToggle?.querySelector('.icon-menu'); // Use optional chaining
const closeIcon = navToggle?.querySelector('.icon-close');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    // Toggle Visibility
    const isVisible = primaryNav.getAttribute('data-visible') === 'true';
    primaryNav.setAttribute('data-visible', !isVisible);

    // Toggle Button Aria-Expanded Attribute
    navToggle.setAttribute('aria-expanded', !isVisible);

    // Toggle Menu/Close Icons (Optional)
    if (menuIcon && closeIcon) {
      menuIcon.hidden = !isVisible;
      closeIcon.hidden = isVisible;
    }

    // Optional: Toggle body class for e.g. disabling scroll
    // document.body.classList.toggle('nav-open', !isVisible);
  });
} else {
   console.warn("Mobile nav elements not found (toggle/primaryNav).");
}

// Optional: Close mobile menu if user clicks outside of it
document.addEventListener('click', (event) => {
    const isVisible = primaryNav?.getAttribute('data-visible') === 'true';
    // If menu is visible AND click is outside nav AND outside toggle button
    if (isVisible && !primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
         if (menuIcon && closeIcon) {
            menuIcon.hidden = false;
            closeIcon.hidden = true;
         }
        // document.body.classList.remove('nav-open');
    }
});