import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import User from './models/User.js';
import Event from './models/events.js';
import Events from "./models/events.js";

const app = express();
const PORT = 3000;

dotenv.config();//Used for DB
app.use(express.static('public'));
app.set('view engine', 'ejs');//Set view engine as EJS
app.use(express.urlencoded({ extended: true }));

app.use(session({//Session handeling
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

mongoose.connect(process.env.MONGO_URI)//Managed DB running locally
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', async (req, res) => {//Displays main page and gets events from Event collection 
    try {
        const events = await Event.find();
        res.render('index', { events });
    } catch (err) {
        res.status(500).send('Error fetching events');
    }
});

app.get('/submit', isLoggedIn, (req, res) => {//Displays submit
    res.render('submit', { title: 'Submit Event - Eventify' });
});

app.post('/submit', isLoggedIn, async (req, res) => {//Posts the info in the text boxes to DB
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

app.get('/login', (req, res) => {//Displays login page
    res.render('login', { title: 'Login - Eventify' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;//Session Handling 
            res.redirect('/');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.get('/register', (req, res) => {//Displays Register page
    res.render('register', { title: 'Register - Eventify' });
});

app.post('/register', async (req, res) => {//Sends info to User DB
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error');
    }
});

app.get('/events', async (req, res) => {//Pulls events from DB
    try {
        const events = await Events.find();
        res.render('events', { events, title: 'Upcoming Events' });
    } catch (err) {
        res.status(500).send('Error fetching events');
    }
});

app.listen(PORT, () => {//Port lol
    console.log(`Server running at http://localhost:${PORT}`);
});
