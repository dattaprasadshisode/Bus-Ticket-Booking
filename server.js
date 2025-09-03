const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data
const busRoutes = [
    { id: 1, from: 'Mumbai', to: 'Delhi', departureTime: '08:00 AM', arrivalTime: '08:00 PM', price: 2500, availableSeats: 25, busType: 'Express', duration: '12h' },
    { id: 2, from: 'Delhi', to: 'Bangalore', departureTime: '09:30 AM', arrivalTime: '02:30 PM', price: 3500, availableSeats: 18, busType: 'Premium', duration: '17h' },
    { id: 3, from: 'Bangalore', to: 'Chennai', departureTime: '10:00 AM', arrivalTime: '02:00 PM', price: 1200, availableSeats: 30, busType: 'Express', duration: '4h' },
    { id: 4, from: 'Chennai', to: 'Hyderabad', departureTime: '11:00 AM', arrivalTime: '04:00 PM', price: 1800, availableSeats: 22, busType: 'Premium', duration: '5h' },
    { id: 5, from: 'Hyderabad', to: 'Pune', departureTime: '12:30 PM', arrivalTime: '03:30 PM', price: 1500, availableSeats: 28, busType: 'Standard', duration: '3h' },
    { id: 6, from: 'Pune', to: 'Mumbai', departureTime: '02:00 PM', arrivalTime: '05:00 PM', price: 800, availableSeats: 32, busType: 'Standard', duration: '3h' }
];

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];

let bookings = [];
let bookingIdCounter = 1;

// Demo user + registered users
const demoUser = { email: 'demo@busticket.com', password: 'demo123', name: 'Demo User' };
const registeredUsers = [demoUser];

// Authentication middleware
const requireAuth = (req, res, next) => {
    const isAuthenticated = req.headers['x-auth-status'] === 'true';
    if (!isAuthenticated) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    next();
};

// Serve static pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/booking-confirmation/:id', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'confirmation.html'));
});

app.get('/booking-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking-details.html'));
});

// 🔐 Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name
            }
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'Invalid email or password'
        });
    }
});

// 🆕 Register endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const newUser = { name, email, password };
    registeredUsers.push(newUser);

    res.json({
        success: true,
        message: 'Registration successful',
        user: {
            email: newUser.email,
            name: newUser.name
        }
    });
});

// 🔓 Logout endpoint
app.post('/api/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

// 📍 API Routes
app.get('/api/routes', requireAuth, (req, res) => {
    const { from, to } = req.query;
    let filteredRoutes = busRoutes;

    if (from) {
        filteredRoutes = filteredRoutes.filter(route => route.from.toLowerCase().includes(from.toLowerCase()));
    }

    if (to) {
        filteredRoutes = filteredRoutes.filter(route => route.to.toLowerCase().includes(to.toLowerCase()));
    }

    res.json(filteredRoutes);
});

app.get('/api/cities', requireAuth, (req, res) => {
    res.json(cities);
});

// 🚌 Booking
app.post('/api/book', requireAuth, (req, res) => {
    const { routeId, passengers, totalAmount } = req.body;
    const route = busRoutes.find(r => r.id === parseInt(routeId));

    if (!route) {
        return res.status(404).json({ error: 'Route not found' });
    }

    if (route.availableSeats < passengers.length) {
        return res.status(400).json({ error: 'Not enough seats available' });
    }

    const booking = {
        id: bookingIdCounter++,
        routeId: parseInt(routeId),
        route,
        passengers,
        totalAmount,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };

    bookings.push(booking);
    route.availableSeats -= passengers.length;

    res.json({
        success: true,
        bookingId: booking.id,
        message: 'Booking confirmed successfully!'
    });
});

app.get('/api/booking/:id', requireAuth, (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚍 Bus Booking App is running at http://localhost:${PORT}`);
});
