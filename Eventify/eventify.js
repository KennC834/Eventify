import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Event from './models/events.js';
const app = express();
const PORT = 3000;


dotenv.config();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.redirect('/');
    }catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).send('Error');
    }
})

app.post('/submit-event', async (req, res) => {
    const {event_name, host_name, event_date, event_location, event_time} = req.body;
    try {
        const newEvent = new Event({
            event_name,
            host_name,
            event_date,
            event_location,
            event_time,
        });
        await newEvent.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).send('Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
