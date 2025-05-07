document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([39.9526, -75.1652], 13); // Set initial map view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                geocodeAddress(event.event_location, (lat, lon) => {
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`<b>${event.event_name}</b>`);
                });
            });
        })
        .catch(error => console.error('Error fetching events:', error));


    function geocodeAddress(address, callback) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    callback(lat, lon);
                }
            })
            .catch(error => console.error('Error geocoding address:', error));
    }
});
