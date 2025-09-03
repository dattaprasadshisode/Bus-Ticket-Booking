# Bus Ticket Booking Website

A modern, responsive bus ticket booking website built with Node.js, Express.js, and Bootstrap. This application allows users to search for bus routes, book tickets, and view booking confirmations.

## Features

### 🚌 Core Functionality
- **Route Search**: Search for bus routes by departure/arrival cities and travel date
- **Real-time Availability**: View available seats and pricing for each route
- **Multi-passenger Booking**: Book tickets for 1-5 passengers
- **Booking Confirmation**: Complete booking process with confirmation page
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Bootstrap 5**: Latest Bootstrap framework for responsive layout
- **Font Awesome Icons**: Beautiful icons throughout the interface
- **Print-friendly**: Ticket confirmation pages are optimized for printing

### 🔧 Technical Features
- **Express.js Backend**: RESTful API endpoints for data management
- **In-memory Storage**: Temporary data storage for routes and bookings
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback during API calls

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd bus-ticket-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For development with auto-restart
   npm run dev
   
   # For production
   npm start
   ```

4. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - The application will be running on port 3000

## Project Structure

```
bus-ticket-booking/
├── server.js              # Main Express server file
├── package.json           # Project dependencies and scripts
├── README.md             # This file
└── public/               # Static files (frontend)
    ├── index.html        # Main homepage
    ├── confirmation.html # Booking confirmation page
    ├── styles.css        # Custom CSS styles
    └── script.js         # Frontend JavaScript
```

## API Endpoints

### Routes
- `GET /` - Serve the main homepage
- `GET /api/routes` - Get all bus routes (with optional filters)
- `GET /api/cities` - Get list of available cities
- `POST /api/book` - Create a new booking
- `GET /api/booking/:id` - Get booking details by ID
- `GET /booking-confirmation/:id` - Serve booking confirmation page

### Sample Data
The application includes dummy data for:
- 6 bus routes between major cities
- Multiple bus types (Express, Premium, Standard)
- Various departure times and pricing
- Seat availability tracking

## Usage Guide

### For Users

1. **Search for Routes**
   - Select departure and arrival cities
   - Choose travel date
   - Select number of passengers
   - Click "Search Buses"

2. **Book Tickets**
   - Browse available routes
   - Click "Book Now" on your preferred route
   - Fill in passenger details for each traveler
   - Review total amount and confirm booking

3. **View Confirmation**
   - After successful booking, view confirmation details
   - Print or download your ticket
   - Note your booking ID for future reference

### For Developers

#### Adding New Routes
Edit the `busRoutes` array in `server.js`:
```javascript
{
    id: 7,
    from: 'New City',
    to: 'Another City',
    departureTime: '10:00 AM',
    arrivalTime: '02:00 PM',
    price: 40,
    availableSeats: 20,
    busType: 'Standard',
    duration: '4h'
}
```

#### Customizing Styles
- Main styles are in `public/styles.css`
- Bootstrap classes are used for layout
- Custom CSS handles animations and special effects

#### Extending Functionality
- Add database integration (MongoDB, PostgreSQL)
- Implement user authentication
- Add payment gateway integration
- Include email notifications

## Features in Detail

### Search Functionality
- **City Selection**: Dropdown menus with all available cities
- **Date Validation**: Prevents booking for past dates
- **Real-time Filtering**: Routes are filtered based on search criteria
- **No Results Handling**: User-friendly message when no routes are found

### Booking Process
- **Dynamic Forms**: Passenger forms are generated based on count
- **Form Validation**: Required fields and email format validation
- **Real-time Pricing**: Total amount updates automatically
- **Seat Management**: Available seats are updated after booking

### Confirmation System
- **Detailed Ticket**: Complete booking information display
- **Passenger List**: All passenger details with contact information
- **Print Support**: Optimized layout for printing tickets
- **QR Code**: Visual representation for ticket scanning

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Optimized Images**: SVG patterns for backgrounds
- **Minimal Dependencies**: Only essential libraries included
- **Efficient JavaScript**: Modern ES6+ syntax with async/await
- **Responsive Images**: Scalable vector graphics

## Security Considerations

- **Input Validation**: Both client and server-side validation
- **XSS Prevention**: Proper HTML escaping
- **CSRF Protection**: Form validation and token checking
- **Error Handling**: Secure error messages without exposing internals

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin panel for route management
- [ ] Real-time seat availability updates
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Booking history and management

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in server.js
   const PORT = process.env.PORT || 3001;
   ```

2. **Dependencies not installed**
   ```bash
   npm install
   ```

3. **Node.js version too old**
   ```bash
   # Update Node.js to version 14 or higher
   node --version
   ```

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Monitor server logs for API issues
- Test on different screen sizes for responsiveness

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the code comments for implementation details

---

**Happy Booking! 🚌✨** # Bus Ticket Booking Website

A modern, responsive bus ticket booking website built with Node.js, Express.js, and Bootstrap. This application allows users to search for bus routes, book tickets, and view booking confirmations.

## Features

### 🚌 Core Functionality
- **Route Search**: Search for bus routes by departure/arrival cities and travel date
- **Real-time Availability**: View available seats and pricing for each route
- **Multi-passenger Booking**: Book tickets for 1-5 passengers
- **Booking Confirmation**: Complete booking process with confirmation page
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Bootstrap 5**: Latest Bootstrap framework for responsive layout
- **Font Awesome Icons**: Beautiful icons throughout the interface
- **Print-friendly**: Ticket confirmation pages are optimized for printing

### 🔧 Technical Features
- **Express.js Backend**: RESTful API endpoints for data management
- **In-memory Storage**: Temporary data storage for routes and bookings
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback during API calls

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd bus-ticket-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For development with auto-restart
   npm run dev
   
   # For production
   npm start
   ```

4. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - The application will be running on port 3000

## Project Structure

```
bus-ticket-booking/
├── server.js              # Main Express server file
├── package.json           # Project dependencies and scripts
├── README.md             # This file
└── public/               # Static files (frontend)
    ├── index.html        # Main homepage
    ├── confirmation.html # Booking confirmation page
    ├── styles.css        # Custom CSS styles
    └── script.js         # Frontend JavaScript
```

## API Endpoints

### Routes
- `GET /` - Serve the main homepage
- `GET /api/routes` - Get all bus routes (with optional filters)
- `GET /api/cities` - Get list of available cities
- `POST /api/book` - Create a new booking
- `GET /api/booking/:id` - Get booking details by ID
- `GET /booking-confirmation/:id` - Serve booking confirmation page

### Sample Data
The application includes dummy data for:
- 6 bus routes between major cities
- Multiple bus types (Express, Premium, Standard)
- Various departure times and pricing
- Seat availability tracking

## Usage Guide

### For Users

1. **Search for Routes**
   - Select departure and arrival cities
   - Choose travel date
   - Select number of passengers
   - Click "Search Buses"

2. **Book Tickets**
   - Browse available routes
   - Click "Book Now" on your preferred route
   - Fill in passenger details for each traveler
   - Review total amount and confirm booking

3. **View Confirmation**
   - After successful booking, view confirmation details
   - Print or download your ticket
   - Note your booking ID for future reference

### For Developers

#### Adding New Routes
Edit the `busRoutes` array in `server.js`:
```javascript
{
    id: 7,
    from: 'New City',
    to: 'Another City',
    departureTime: '10:00 AM',
    arrivalTime: '02:00 PM',
    price: 40,
    availableSeats: 20,
    busType: 'Standard',
    duration: '4h'
}
```

#### Customizing Styles
- Main styles are in `public/styles.css`
- Bootstrap classes are used for layout
- Custom CSS handles animations and special effects

#### Extending Functionality
- Add database integration (MongoDB, PostgreSQL)
- Implement user authentication
- Add payment gateway integration
- Include email notifications

## Features in Detail

### Search Functionality
- **City Selection**: Dropdown menus with all available cities
- **Date Validation**: Prevents booking for past dates
- **Real-time Filtering**: Routes are filtered based on search criteria
- **No Results Handling**: User-friendly message when no routes are found

### Booking Process
- **Dynamic Forms**: Passenger forms are generated based on count
- **Form Validation**: Required fields and email format validation
- **Real-time Pricing**: Total amount updates automatically
- **Seat Management**: Available seats are updated after booking

### Confirmation System
- **Detailed Ticket**: Complete booking information display
- **Passenger List**: All passenger details with contact information
- **Print Support**: Optimized layout for printing tickets
- **QR Code**: Visual representation for ticket scanning

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Optimized Images**: SVG patterns for backgrounds
- **Minimal Dependencies**: Only essential libraries included
- **Efficient JavaScript**: Modern ES6+ syntax with async/await
- **Responsive Images**: Scalable vector graphics

## Security Considerations

- **Input Validation**: Both client and server-side validation
- **XSS Prevention**: Proper HTML escaping
- **CSRF Protection**: Form validation and token checking
- **Error Handling**: Secure error messages without exposing internals

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin panel for route management
- [ ] Real-time seat availability updates
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Booking history and management

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in server.js
   const PORT = process.env.PORT || 3001;
   ```

2. **Dependencies not installed**
   ```bash
   npm install
   ```

3. **Node.js version too old**
   ```bash
   # Update Node.js to version 14 or higher
   node --version
   ```

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Monitor server logs for API issues
- Test on different screen sizes for responsiveness

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the code comments for implementation details

---

**Happy Booking! 🚌✨**  