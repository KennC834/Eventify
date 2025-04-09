const express = require('express');
const app = express();
const PORT = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Sample event data
let events = [
    { name: 'Tech Expo 2025', date: '2025-05-10' },
    { name: 'Campus Game Night', date: '2025-05-15' }
];

// Home page route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home - Eventify', events });
});

// Submit event page
app.get('/submit', (req, res) => {
    res.render('submit', { title: 'Submit Event - Eventify' });
});

// Handle event submission
app.post('/submit', (req, res) => {
    const { name, date } = req.body;
    events.push({ name, date });
    res.redirect('/');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - Eventify' });
});

// Register page
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register - Eventify' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
