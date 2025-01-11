function initializeDarkMode() {
    const darkModeBtn = document.querySelector('.dark-mode-btn')
    const darkModeToggle = document.querySelector('.dark-mode-btn .toggle');
    if (darkModeToggle) {
        // Check localStorage or system for dark mode prefernce
        const systemPreferenceDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedPreference = localStorage.getItem('dark-mode');

        if (savedPreference === 'enabled' || (systemPreferenceDark && savedPreference === null)) {
            document.body.classList.add('dark-mode');
            darkModeBtn.setAttribute('aria-pressed', 'true');
        }
        
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            darkModeBtn.setAttribute('aria-pressed', isDarkMode ? 'true' : 'false');
            // Save preference to localStorage
            localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
        });
    }
}
document.addEventListener('DOMContentLoaded', initializeDarkMode);