let weather = [];
let weatherTipus = "";


function setDate() {
    let today = new Date().toISOString().split('T')[0];
    let dateField = document.getElementById("dateField");
    dateField.setAttribute('min', today);
}

function selectWeatherType(tipus) {
    let naposBtn = document.getElementById('napos');
    let esosBtn = document.getElementById('esos');
    let viharosBtn = document.getElementById('viharos');
    let havasBtn = document.getElementById('havas');
    let szelesBtn = document.getElementById('szeles');
    let tornadoBtn = document.getElementById('tornado');

    let tipusGombok = [naposBtn, esosBtn, viharosBtn, havasBtn, szelesBtn, tornadoBtn]
    weatherTipus = tipus;

    tipusGombok.forEach(gomb => {
        if (gomb.id == tipus) {
            gomb.classList.add('weatherSelected');
        } else {
            gomb.classList.remove('weatherSelected');
        }
    });
}

// Tavasz, nyár, ősz, tél
let evszakHatarok = [[-5, 28], [10, 40], [-5, 30], [-20, 10]];

function uploadWeather() {
    let minField = document.getElementById('minHofok');
    let maxField = document.getElementById('maxHofok');
    let szazelek = document.getElementById('csapadekSzazalek');
    let mmCsapadek = document.getElementById('csapadekMM');

    if (weatherTipus == "") {
        toastTrigger('Hiba', 'Nincs kiválasztott időjárás típus')
    }

    
}