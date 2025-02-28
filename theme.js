// // Function to apply the selected theme
// function applyTheme(theme) {
//     if (theme === 'light' || theme === 'dark') {
//         document.documentElement.setAttribute('data-theme', theme);
//         localStorage.setItem('theme', theme); // Save the selected theme in localStorage
//         console.log(`Theme applied: ${theme}`); // Debugging log
//     } else {
//         console.error(`Invalid theme: ${theme}`);
//     }
// }

// // Function to update the theme toggler buttons
// function updateToggleState(theme) {
//     document.querySelector('.light-mode').classList.toggle('active', theme === 'light');
//     document.querySelector('.dark-mode').classList.toggle('active', theme === 'dark');
// }

// // On page load, check the saved theme and apply it
// document.addEventListener('DOMContentLoaded', () => {
//     const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
//     console.log(`Saved theme on load: ${savedTheme}`); // Debugging log
//     applyTheme(savedTheme);
//     updateToggleState(savedTheme);
// });

// // Event listeners for theme toggler buttons
// document.addEventListener('click', (event) => {
//     if (event.target.classList.contains('light-mode')) {
//         console.log('Switching to light mode'); // Debugging log
//         applyTheme('light');
//         updateToggleState('light');
//     }
//     if (event.target.classList.contains('dark-mode')) {
//         console.log('Switching to dark mode'); // Debugging log
//         applyTheme('dark');
//         updateToggleState('dark');
//     }
// });

// theme.js

// Function to set the theme based on the provided theme class
function setTheme(theme) {
    const rootElement = document.documentElement;

    if (theme === "dark") {
        rootElement.classList.add("dark-theme-variables");
        localStorage.setItem("theme", "dark");
    } else {
        rootElement.classList.remove("dark-theme-variables");
        localStorage.setItem("theme", "light");
    }
}

// Function to toggle the theme
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

// On page load, apply the theme stored in localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Attach event listener to the theme toggle button (optional)
    const themeToggleButton = document.querySelector(".theme-toggler");
    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", toggleTheme);
    }
});
