function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date').textContent = dateString;
}

updateDate();
setInterval(updateDate, 3600000);

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});

const appIcons = document.querySelectorAll('.app-icon');

appIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const appName = icon.getAttribute('data-app');
        openApp(appName);
    });
});

function openApp(appName) {
    if (appName === 'map') {
        openMapApp();
    } else if (appName === 'projects') {
        openAboutMeApp();
    } else if (appName === 'contact') {
        openContactApp();
    } else {
        alert('App not available.');
    }
}

function openMapApp() {
    const appWindow = document.createElement('div');
    appWindow.className = 'window';
    appWindow.innerHTML = `
        <div class="window-header">
            <h3>Map App</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="window-content">
            <div id="map"></div>
        </div>
    `;
    document.body.appendChild(appWindow);

    const map = L.map('map').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([40.7128, -74.0060]).addTo(map);
    marker.bindPopup('<b>Hello!</b><br>This is New York City.').openPopup();

    makeWindowDraggable(appWindow);
    setupCloseButton(appWindow);
}

function openAboutMeApp() {
    const appWindow = document.createElement('div');
    appWindow.className = 'window';
    appWindow.innerHTML = `
        <div class="window-header">
            <h3>About Me</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="window-content">
            <div class="about-me-content">
                ${getAboutMeContent()}
            </div>
        </div>
    `;
    document.body.appendChild(appWindow);

    makeWindowDraggable(appWindow);
    setupCloseButton(appWindow);
}

function getAboutMeContent() {
    return `
Helloooooooooooooo
    `;
}

function openContactApp() {
    const appWindow = document.createElement('div');
    appWindow.className = 'window';
    appWindow.innerHTML = `
        <div class="window-header">
            <h3>Contact Me</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="window-content">
            <form class="contact-form">
                <label for="name">Name:</label>
                <input type="text" id="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" required>

                <label for="message">Message:</label>
                <textarea id="message" rows="5" required></textarea>

                <button type="submit">Send Message</button>
            </form>
        </div>
    `;
    document.body.appendChild(appWindow);

    const form = appWindow.querySelector('.contact-form');
    form.addEventListener('submit', handleFormSubmit);

    makeWindowDraggable(appWindow);
    setupCloseButton(appWindow);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = e.target.querySelector('#name').value;
    const email = e.target.querySelector('#email').value;
    const message = e.target.querySelector('#message').value;

    console.log('Message Sent:', { name, email, message });

    alert('Thank you for your message!');
    e.target.reset();
}

function makeWindowDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
    });

    function drag(e) {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function stopDragging() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDragging);
    }
}

function setupCloseButton(win) {
    const closeBtn = win.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        win.remove();
    });
}
