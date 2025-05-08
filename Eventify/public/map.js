document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([39.9526, -75.1652], 13); // Set initial map view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Leaflets Website on How to Implement this into Project
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    fetch('/api/events')//Refers to eventify.js
        .then(response => response.json())//parse
        .then(events => {
            events.forEach(event => {
                geocodeAddress(event.event_location, (lat, lon) => {
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`<b>${event.event_name}</b>`);//Adds to map events
                });
            });
        })
        .catch(error => console.error('Error fetching events:', error));//Error Handeling 


    function geocodeAddress(address, callback) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;//converts street address to lat and long 
                    const lon = data[0].lon;
                    callback(lat, lon);
                }
            })
            .catch(error => console.error('Error geocoding address:', error));
    }
});
