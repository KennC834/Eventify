import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import User from './models/User.js';
import Event from './models/events.js';

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false
}));

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ✅ FIXED: Main page route no longer passes events to index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// API route for Leaflet map
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Submit Event
app.get('/submit', isLoggedIn, (req, res) => {
    res.render('submit', { title: 'Submit Event - Eventify' });
});

app.post('/submit', isLoggedIn, async (req, res) => {
    const { event_name, host_name, event_date, event_location, event_time } = req.body;
    try {
        const newEvent = new Event({
            event_name,
            host_name,
            event_date,
            event_location,
            event_time
        });
        await newEvent.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error submitting event');
    }
});

// Login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - Eventify' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Register
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register - Eventify' });
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error');
    }
});

// View all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('events', { events, title: 'Upcoming Events' });
    } catch (err) {
        res.status(500).send('Error fetching events');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
