// js/theme-switcher.js

// Get references to the button and the <html> element
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; 

/**
 * Updates the button's visible icon (sun/moon) and aria-label
 * based on the currently active theme.
 * @param {'light' | 'dark'} theme - The theme that is currently active.
 */
const updateToggleButton = (theme) => {
    if (!themeToggle) return; // Exit if button isn't found

    // Find the spans containing the icons within the button
    const sunIcon = themeToggle.querySelector('.icon-sun');
    const moonIcon = themeToggle.querySelector('.icon-moon');

    if (!sunIcon || !moonIcon) return; // Exit if icons aren't found

    if (theme === 'dark') {
        // Dark mode is active, show the sun icon (to switch to light)
        sunIcon.hidden = false; 
        moonIcon.hidden = true;  
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        // Light mode is active, show the moon icon (to switch to dark)
        sunIcon.hidden = true;   
        moonIcon.hidden = false; 
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
};

/**
 * Sets the theme attribute on the <html> tag, saves the preference
 * to localStorage, and updates the toggle button's appearance.
 * @param {'light' | 'dark'} theme - The theme to apply.
 */
const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); 
    updateToggleButton(theme); 
};

// --- Event Listener for the Button Click ---
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
      // Get the theme currently set on the <html> tag
      const activeTheme = htmlElement.getAttribute('data-theme');
      // Determine the theme to switch to
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      // Apply the new theme
      setTheme(newTheme);
  });
} else {
  console.warn("Theme toggle button not found (ID: theme-toggle)");
}

// --- Initial Setup When Script Loads ---
// Read the theme already set on the <html> tag by the inline script
const initialTheme = htmlElement.getAttribute('data-theme') || 'light'; 
// Update the button's icon/label to match the initial theme
updateToggleButton(initialTheme); 

// --- Optional: OS Preference Change Listener ---
// Listens for OS theme changes while the page is open
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (mediaQuery.addEventListener) { // Check for modern browser support
  mediaQuery.addEventListener('change', event => {
      const storedTheme = localStorage.getItem('theme');
      // Only react if the user hasn't explicitly set a theme via the button
      if (!storedTheme) {
          const osTheme = event.matches ? "dark" : "light";
          htmlElement.setAttribute('data-theme', osTheme); // Update theme attribute
          updateToggleButton(osTheme); // Update button icon/label
          // We don't save to localStorage here to keep respecting OS preference
      }
  });
}