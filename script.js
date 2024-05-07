document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    displayCalendar();
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function displayCalendar() {
    const calendarContainer = document.getElementById('calendarBody');
    const monthYearElem = document.getElementById('monthYear');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    calendarContainer.innerHTML = '';

    monthYearElem.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

    const table = document.createElement('table');
    table.classList.add('calendar-table');

    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth) {
                cell.textContent = '';
            } else if (dayCounter <= daysInMonth) {
                cell.textContent = dayCounter;
                const markedDate = markedDates.find(date => date.date === dayCounter && date.month === currentMonth && date.year === currentYear);
                if (markedDate) {
                    cell.classList.add('marked');
                    cell.addEventListener('click', () => openModal(markedDate.details));
                }
                dayCounter++;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    calendarContainer.appendChild(table);
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar();
}

function openModal(details) {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'flex';

    document.querySelector('.event-image').src = details.image;
    document.querySelector('.event-text h3').textContent = details.name;
    document.querySelector('.event-text p:nth-child(2)').textContent = 'Details: ' + details.details;
    document.querySelector('.event-text p:nth-child(3)').textContent = 'Dates: ' + details.dates;
    document.querySelector('.event-text p:nth-child(4)').textContent = 'Location: ' + details.location;
    document.querySelector('.event-text p:nth-child(5)').textContent = 'Time: ' + details.time;
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
}

const markedDates = [
    { date: 2, month: 2, year: 2024, details: { name: 'Oddyseus', details: 'Prijs kind: 5 euro. Prijs volwassene: 8 Euro.', dates: '02/03/2024', location: 'Pastorijstraat 1, 2830 Willebroek, Belgium', time: 'Show 1: 11am. Show 2: 5pm.', image: '20240130_-_GO!_academie_voor_Muziek_&_Woord_-_poster.jpg' } },
    { date: 25, month: 4, year: 2024, details: { name: 'Atalanta & Oddyseus', details: 'Gratis inkom!', dates: '25/05/2024', location: 'Kerkstraat 2A, 2830 Willebroek, Belgium', time: 'N/A', image: 'Atalanta.jpg' } },
];

function login() {
    // Perform authentication, for demonstration purposes, let's assume successful login
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the credentials are correct (this is a simplified example)
    if (username === 'DevBrambo' && password === 'EASPORTS') {
        document.getElementById('loginPanel').style.display = 'none'; // Hide login form
        document.getElementById('openCreateEventPanelBtn').style.display = 'block'; // Show "Create Event" button
    } else {
        // Display an error message or handle unsuccessful login
        console.log('Login failed. Please try again.');
    }
}

function openCreateEventPanel() {
    document.getElementById('createEventPanel').style.display = 'flex';
}

function closeCreateEventPanel() {
    document.getElementById('createEventPanel').style.display = 'none';
}

function submitEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventDetails = document.getElementById('eventDetails').value;
    const eventDates = document.getElementById('eventDates').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventTime = document.getElementById('eventTime').value;

    // Here, you can perform validation and send data to the backend for storage
    // For demonstration purposes, let's log the event data to the console
    console.log({
        name: eventName,
        details: eventDetails,
        dates: eventDates,
        location: eventLocation,
        time: eventTime
    });

    // Optionally, you can close the event creation panel after creating the event
    closeCreateEventPanel();
}

document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the F1 key
    if (event.key === 'F1') {
        showLoginForm();
    }
});

function showLoginForm() {
    document.getElementById('loginPanel').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.menu__toggler');
    const menu = document.querySelector('.menu');

    toggler.addEventListener('click', function() {
        toggler.classList.toggle('active');
        menu.classList.toggle('active');

        document.body.classList.toggle('menu-open');
    });
});
