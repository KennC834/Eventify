document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([39.9526, -75.1652], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const events = [
        { name: 'Tech Expo', lat: 39.9526, lng: -75.1652 },
        { name: 'Game Night', lat: 39.95, lng: -75.17 }
    ];

    events.forEach(event => {
        L.marker([event.lat, event.lng])
            .addTo(map)
            .bindPopup(`<b>${event.name}</b>`);
    });
});
