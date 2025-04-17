const express = require('express');
const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


let events = [
    { name: 'Tech Expo 2025', date: '2025-05-10' },
    { name: 'Campus Game Night', date: '2025-05-15' }
];

app.get('/events', (req, res) => {
    res.render('events', { title: 'Events - Eventify', events });
});


app.get('/', (req, res) => {
    res.render('index', { title: 'Home - Eventify', events });
});


app.get('/submit', (req, res) => {
    res.render('submit', { title: 'Submit Event - Eventify' });
});


app.post('/submit', (req, res) => {
    const { name, date } = req.body;
    events.push({ name, date });
    res.redirect('/');
});


app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - Eventify' });
});


app.get('/register', (req, res) => {
    res.render('register', { title: 'Register - Eventify' });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
