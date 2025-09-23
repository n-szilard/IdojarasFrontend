let weather = [];

function setDate() {
    let today = new Date().toISOString().split('T')[0];
    let dateField = document.getElementById("dateField");
    dateField.setAttribute('min', today);
}