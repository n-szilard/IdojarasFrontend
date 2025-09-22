const AppTitle = 'Időjárás App';
const Author = 'Nagyapáti Szilárd';
const ServerUrl = 'http://localhost:3000'
const Copyright = '2025 ©'

let title = document.getElementById('appTitle');
let author = document.getElementById('author');
let copyright = document.getElementById('copyright');

let main = document.querySelector('main');

let loggedInMenu = document.getElementById('loggedInMenu');
let loggedOutMenu = document.getElementById('loggedOutMenu');


title.innerHTML = AppTitle;
author.innerHTML = Author;
copyright.innerHTML = Copyright;

let loggedUser = null;

async function render(view) {
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();

    switch (view) {
        case "profile":
            getProfile();
            break;
    
        default:
            break;
    }
}

async function getLoggedUser() {
    if (sessionStorage.getItem('loggedUser')) {
        loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
        loggedOutMenu.classList.add('hide');
        loggedInMenu.classList.remove('hide');
        await render('profile');
    } else {
        loggedUser = null;
        loggedOutMenu.classList.remove('hide');
        loggedInMenu.classList.add('hide');
        await render('login');
    }
    return loggedUser;
}

getLoggedUser();