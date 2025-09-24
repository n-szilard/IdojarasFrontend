let weather = [];
let weatherTipus = "";

function resetWeatherType() {
    weatherTipus = "";
}

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
    let kicsitfelhosBtn = document.getElementById('kicsitfelhos');
    let felhosBtn = document.getElementById('felhos');
    let jegesoBtn = document.getElementById('jegeso');

    let tipusGombok = [naposBtn, esosBtn, viharosBtn, havasBtn, szelesBtn, tornadoBtn, kicsitfelhosBtn, jegesoBtn, felhosBtn]
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

async function uploadWeather() {
    let minField = document.getElementById('minHofok');
    let maxField = document.getElementById('maxHofok');
    let szazelek = document.getElementById('csapadekSzazalek');
    let mmCsapadek = document.getElementById('csapadekMM');
    let dateField = document.getElementById('dateField');

    if (dateField.value == "" || minField.value == "" || maxField.value == "" || szazelek.value == "" || mmCsapadek.value == "") {
        toastTrigger('Hiba', 'Nem adtál meg minden adatot!');
        return;
    }

    if (weatherTipus == "") {
        toastTrigger('Hiba', 'Nincs kiválasztott időjárás típus');
        return;
    }

    if (Number(minField.value) > Number(maxField.value)) {
        toastTrigger('Hiba', 'A minimum hőmérséklet nagyobb, mint a maximum');
        return;
    }

    let honap = Number(dateField.value.split('-'[1]));

    let evszakIndex = getEvszakIndex(honap);
    evszakMin = evszakHatarok[evszakIndex][0];
    evszakMax = evszakHatarok[evszakIndex][1];

    if (Number(minField.value) < evszakMin || Number(maxField.value) > evszakMax) {
        toastTrigger('Hiba', 'A hőmérsékletek nem felelnek meg az évszakhoz tartozó határértékeknek!');
        return;
    }

    try {
         const res = await fetch(`${ServerUrl}/weather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  // uid, min, max, szazalek, mm, datum, tipus
                uid: loggedUser.id,
                min: Number(minField.value),
                max: Number(maxField.value),
                szazalek: Number(szazelek.value),
                mm: Number(mmCsapadek.value),
                datum: dateField.value,
                tipus: weatherTipus
            })
        });

        let response = await res.json();

        if (res.status == 200) {
            toastTrigger('Sikeres adatfelvétel', response.msg);
            dateField.value = '';
            minField.value = '';
            maxField.value = '';
            szazelek.value = '';
            mmCsapadek.value = '';
        } else {
            toastTrigger('Hiba', response.msg);
        }

    } catch (error) {
        toastTrigger('Hiba', error)
    }
}

async function getWeather() {
    weather = [];
    try {
        const res = await fetch(`${ServerUrl}/weather/${loggedUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let data = await res.json();
        data.sort((a,b) => new Date(a.datum) - new Date(b.datum));
        weather = data;
    } catch (error) {
        console.log(error)
    }
}

function getEvszakIndex(honap) {
    if (honap == 1 || honap == 2 || honap == 12) {
        return 3;
    } else if (honap == 3 || honap == 4 || honap == 5) {
        return 0;
    } else if (honap == 6 || honap == 7 || honap == 8) {
        return 1;
    } else {
        return 2;
    }
}

async function editStep(index) {
    // Szerkesző megjelenítése:


    try {
        let res = await fetch(`${ServerUrl}/weather/modify`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: weather[index].id,
                uid: loggedUser.uid,
                // min, max, szazalek, mm, datum, tipus
            })
        });
    } catch (error) {
        toastTrigger('Hiba', error)
    }
}

async function deleteStep(index) {
    try {
        let res = await fetch(`${ServerUrl}/weather/del`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: weather[index].id,
            })
        })
        let response = await res.json();
        if (res.status == 200) {
            toastTrigger('Siker', response.msg);
            await getWeather();
            loadTable();
        } else {
            toastTrigger('Hiba', response.msg);
        }
    } catch (error) {
        toastTrigger('Hiba', error)
    }
}