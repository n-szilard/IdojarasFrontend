let themeSwitchButton = document.getElementById('themeSwitch');

let theme = 'light';

themeSwitchButton.addEventListener('click', () => {
    toggleTheme();
})

function toggleTheme() {
    if (theme == 'light') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        theme = 'dark';
        saveTheme();
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        theme = 'light';
        saveTheme();
    }
}

function setTheme() {
    document.documentElement.setAttribute('data-bs-theme', theme);
}

function saveTheme() {
    localStorage.setItem("WTheme", theme);
}

function loadTheme() {
    theme = 'light';
    if (localStorage.getItem('WTheme')) {
        theme = localStorage.getItem('WTheme');
    }
    setTheme(theme);
}

loadTheme();