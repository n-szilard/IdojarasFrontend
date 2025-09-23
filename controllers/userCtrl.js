const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registration() {
    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');
    let passwordField = document.getElementById('passwordField');
    let confirmField = document.getElementById('confirmPasswordField');

    if (nameField.value == '' || passwordField.value == '' || emailField.value == '' || confirmField.value == '') {
        toastTrigger('Hiba', 'Nem adtál meg minden adatot!')
        return;
    }

    if (passwordField.value != confirmField.value) {
        toastTrigger('Hiba', 'A két jelszó nem egyezik!');
        return;
    }

    if (!passwdRegExp.test(passwordField.value)) {
        toastTrigger('Hiba', 'A megadott jelszó nem elég biztonságos!');
        return;
    }

    if (!emailRegExp.test(emailField.value)) {
        toastTrigger('Hiba', 'Nem megfelelő e-mail cím!');
        return;
    }

    try {
        const res = await fetch(`${ServerUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameField.value,
                email: emailField.value,
                password: passwordField.value
            })

        });

        const data = await res.json();
        if (res.status == 200) {
            nameField.value = "";
            emailField.value = "";
            passwordField.value = "";
            confirmField.value = "";
            toastTrigger('Hiba', data.msg);
        } else {
            toastTrigger('Siker', data.msg);
        }
    } catch (error) {
        toastTrigger('Hiba', error);
    }
}

async function login() {
    let emailField = document.getElementById('emailField');
    let passwordField = document.getElementById('passwordField');
    if (passwordField.value == '' || emailField.value == '') {
        toastTrigger('Hiba', 'Nem adtál meg minden adatot!');
        return;
    }

    try {
        const res = await fetch(`${ServerUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailField.value,
                password: passwordField.value
            })
        });

        user = await res.json();

        if (user.id) {
            loggedUser = user;
        }

        if (!loggedUser) {
            toastTrigger('Hiba', 'Hibás belépési adatok!');
            return;
        }

        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        getLoggedUser();
        toastTrigger('Bejelentkezés', 'Sikeres bejelentkezés!');
    } catch (error) {
        toastTrigger('Hiba', error);
    }
}

function logout() {
    sessionStorage.removeItem('loggedUser');
    getLoggedUser();
    toastTrigger('Kijelentkezés', 'Sikeres kijelentkezés!')
}

function getProfile() {
    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');

    if (loggedUser) {
        nameField.value = loggedUser.name;
        emailField.value = loggedUser.email;
    }
}

function updateProfile() {
    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');

    if (nameField.value == '' || emailField.value == '') {
        toastTrigger('Hiba', 'Nem adtál meg minden adatot!');
        return;
    }

    if (!emailRegExp.test(emailField.value)) {
        toastTrigger('Hiba', 'Nem megfelelő email cím!');
        return;
    }

    try {
        
    } catch (error) {
        toastTrigger('Hiba', error);
    }

    getLoggedUser();
}

function toggleModifyProfile() {
    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');
    let modifyBtn = document.getElementById('modifyProfileBtn');
    
    if (nameField.disabled == false) {
        nameField.disabled = true;
        emailField.disabled = true;
        modifyBtn.classList.remove('btn-danger');
        modifyBtn.classList.add('btn-warning');
        modifyBtn.innerHTML = "Módosítás"
        nameField.value = loggedUser.name;
        emailField.value = loggedUser.email;
    } else {
        nameField.disabled = false;
        emailField.disabled = false;
        modifyBtn.classList.remove('btn-warning');
        modifyBtn.classList.add('btn-danger');
        modifyBtn.innerHTML = "Módosítás visszavonása"
    }
}

async function updateProfile() {
    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');
    let modifyBtn = document.getElementById('modifyProfileBtn');
    if (nameField.value != loggedUser.name || emailField.value != loggedUser.email) {
        try {
            const res = await fetch(`${ServerUrl}/users/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: loggedUser.id,
                    name: nameField.value,
                    email: emailField.value
                })
            });
    
            const reply = await res.json()
            toastTrigger('Siker', reply.msg)
    
            loggedUser.name = reply.newName;
            loggedUser.email = reply.newEmail;
            nameField.disabled = true;
            emailField.disabled = true;
            modifyBtn.classList.remove('btn-danger');
            modifyBtn.classList.add('btn-warning');
            modifyBtn.innerHTML = 'Módosítás';
        } catch (error) {
            toastTrigger('Hiba', error);
        }
    } else {
        toastTrigger('Hiba', 'Nem módosított az adatain!')
    }
}

async function updatePassword() {
    let currentPassField = document.getElementById('passwordField');
    let newPassField = document.getElementById('newPasswordField');
    let newPassConfirmField = document.getElementById('newPasswordConfirmField');

    if (newPassField.value != newPassConfirmField.value) {
        toastTrigger('Hiba', 'A két új jelszó nem egyezik!');
        return;
    }

    try {
        const res = await fetch(`${ServerUrl}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: loggedUser.id,
                currentPass: currentPassField.value,
                newPass: newPassField.value
            })
        });

        const reply = await res.json();
        if (res.status == 400) {
            toastTrigger('Hiba', reply.msg);
        } else {
            toastTrigger('Siker', reply.msg);
        }

    } catch (error) {
        toastTrigger('Hiba', error);
    }

    currentPassField.value = "";
    newPassField.value = "";
    newPassConfirmField.value = "";
}