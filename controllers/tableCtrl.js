function loadTable() {
    let tbody = document.getElementById('weatherTableBody');
    tbody.innerHTML = '';

    weather.forEach((adat, index) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let td7 = document.createElement('td');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        td1.innerHTML = (index + 1) + '.';
        td2.innerHTML = adat.min + ' °C';
        td3.innerHTML = adat.max + ' °C';
        td4.innerHTML = adat.szazalek + ' %';
        td5.innerHTML = adat.mm + ' mm';
        td6.innerHTML = adat.tipus;

        editBtn.setAttribute('onclick', `editStep(${index})`);
        deleteBtn.setAttribute('onclick', `deleteStep(${index})`);
        editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
        deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>'

        editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');

        td7.appendChild(editBtn);
        td7.appendChild(deleteBtn);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbody.appendChild(tr);
    })
}