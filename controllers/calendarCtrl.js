let calendarDatas = [];

async function getCalendarData() {
    calendarDatas = [];
    try {
        let res = await fetch(`${ServerUrl}/weather/${loggedUser.id}`);
        let data = await res.json();

        data.forEach(element => {
            calendarDatas.push({
                title: `${element.min}°C - ${element.max}°C`,
                start: element.datum
            })
        });
    } catch (error) {
        toastTrigger('Hiba', error);
    }
}

function initCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'hu',
        headerToolbar: {
            left: 'prev,today,next',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        events: calendarDatas
    });

    calendar.render();
}