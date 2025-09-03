// Bus Ticket Booking Website JavaScript

class BusBookingApp {
    constructor() {
        this.routes = [];
        this.cities = [];
        this.selectedRoute = null;
        this.bookingModal = null;
        this.init();
    }

    async init() {
        // Check authentication first
        if (!this.checkAuthStatus()) {
            window.location.href = '/login';
            return;
        }

        this.displayUserInfo();
        await this.loadCities();
        await this.loadRoutes();
        this.setupEventListeners();
        this.populateCityDropdowns();
        this.displayRoutes();
        this.setupDateValidation();
        
        // Clear any old booking data when returning to home page
        localStorage.removeItem('currentBookingData');
    }

    checkAuthStatus() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        return isAuthenticated === 'true';
    }

    displayUserInfo() {
        const userEmail = localStorage.getItem('userEmail') || 'User';
        document.getElementById('userEmail').textContent = userEmail;
    }

    async loadCities() {
        try {
            const response = await fetch('/api/cities', {
                headers: {
                    'x-auth-status': 'true'
                }
            });
            this.cities = await response.json();
        } catch (error) {
            console.error('Error loading cities:', error);
        }
    }

    async loadRoutes(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(`/api/routes?${queryParams}`, {
                headers: {
                    'x-auth-status': 'true'
                }
            });
            this.routes = await response.json();
        } catch (error) {
            console.error('Error loading routes:', error);
        }
    }

    setupEventListeners() {
        // Search form
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Booking modal
        this.bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        
        // Modal shown event
        document.getElementById('bookingModal').addEventListener('shown.bs.modal', () => {
            this.updateBookingDisplayFields();
        });
        
        // Confirm booking button
        document.getElementById('confirmBooking').addEventListener('click', () => {
            this.handleBookingConfirmation();
        });

        // Passenger count change
        document.getElementById('passengers').addEventListener('change', () => {
            this.updatePassengerForms();
            this.updateBookingDisplayFields();
        });

        // Travel date change
        document.getElementById('travelDate').addEventListener('change', () => {
            this.updateBookingDisplayFields();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    populateCityDropdowns() {
        const fromSelect = document.getElementById('fromCity');
        const toSelect = document.getElementById('toCity');

        this.cities.forEach(city => {
            const fromOption = document.createElement('option');
            fromOption.value = city;
            fromOption.textContent = city;
            fromSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = city;
            toOption.textContent = city;
            toSelect.appendChild(toOption);
        });
    }

    setupDateValidation() {
        const dateInput = document.getElementById('travelDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    async handleSearch() {
        const formData = new FormData(document.getElementById('searchForm'));
        const filters = {
            from: formData.get('fromCity'),
            to: formData.get('toCity'),
            date: formData.get('travelDate')
        };

        // Show loading state
        const searchBtn = document.querySelector('#searchForm button[type="submit"]');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<span class="loading"></span> Searching...';
        searchBtn.disabled = true;

        try {
            await this.loadRoutes(filters);
            this.displayRoutes();
            
            // Scroll to routes section
            document.getElementById('routes').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            this.showNotification('Error searching routes. Please try again.', 'error');
        } finally {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
        }
    }

    displayRoutes() {
        const container = document.getElementById('routesContainer');
        
        if (this.routes.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info fade-in">
                        <i class="fas fa-info-circle me-2"></i>
                        No routes found for your search criteria. Please try different cities or dates.
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.routes.map((route, index) => this.createRouteCard(route, index)).join('');
        
        // Add animation delay to each card
        const cards = container.querySelectorAll('.route-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    createRouteCard(route, index) {
        const seatClass = this.getSeatClass(route.availableSeats);
        const busTypeClass = this.getBusTypeClass(route.busType);

        return `
            <div class="col-lg-6 col-xl-4">
                <div class="card route-card h-100" style="animation-delay: ${index * 0.1}s;">
                    <div class="card-body">
                        <div class="route-info">
                            <div class="route-cities">
                                <i class="fas fa-map-marker-alt text-primary"></i>
                                ${route.from} 
                                <i class="fas fa-arrow-right route-arrow"></i> 
                                ${route.to}
                                <i class="fas fa-map-marker text-success"></i>
                            </div>
                            <span class="bus-type-badge ${busTypeClass}">
                                <i class="fas fa-bus me-1"></i>${route.busType}
                            </span>
                        </div>
                        
                        <div class="route-details">
                            <div class="route-detail">
                                <div class="route-detail-label">
                                    <i class="fas fa-clock me-1"></i>Departure
                                </div>
                                <div class="route-detail-value">${route.departureTime}</div>
                            </div>
                            <div class="route-detail">
                                <div class="route-detail-label">
                                    <i class="fas fa-flag-checkered me-1"></i>Arrival
                                </div>
                                <div class="route-detail-value">${route.arrivalTime}</div>
                            </div>
                            <div class="route-detail">
                                <div class="route-detail-label">
                                    <i class="fas fa-hourglass-half me-1"></i>Duration
                                </div>
                                <div class="route-detail-value">${route.duration}</div>
                            </div>
                        </div>
                        
                        <div class="route-price">
                            <i class="fas fa-rupee-sign me-1"></i>${route.price}
                        </div>
                        
                        <div class="route-seats">
                            <span class="${seatClass}">
                                <i class="fas fa-chair me-1"></i>
                                ${route.availableSeats} seats available
                            </span>
                        </div>
                        
                        <div class="text-center">
                            <button class="btn btn-primary w-100" onclick="app.selectRoute(${route.id})">
                                <i class="fas fa-ticket-alt me-2"></i>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSeatClass(seats) {
        if (seats === 0) return 'seats-full';
        if (seats <= 5) return 'seats-low';
        return 'seats-available';
    }

    getBusTypeClass(busType) {
        switch (busType.toLowerCase()) {
            case 'express': return 'bus-type-express';
            case 'premium': return 'bus-type-premium';
            case 'standard': return 'bus-type-standard';
            default: return 'bus-type-standard';
        }
    }

    selectRoute(routeId) {
        this.selectedRoute = this.routes.find(route => route.id === routeId);
        if (!this.selectedRoute) return;

        this.displaySelectedRouteInfo();
        this.updatePassengerForms();
        
        this.bookingModal.show();
        
        // Update display fields after modal is shown to ensure elements exist
        setTimeout(() => {
            this.updateBookingDisplayFields();
        }, 100);
    }

    displaySelectedRouteInfo() {
        const route = this.selectedRoute;
        const container = document.getElementById('selectedRouteInfo');
        
        container.innerHTML = `
            <div class="alert alert-info">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h6 class="mb-2">
                            <i class="fas fa-route me-2"></i>
                            ${route.from} → ${route.to}
                        </h6>
                        <p class="mb-1">
                            <i class="fas fa-clock me-2"></i>
                            ${route.departureTime} - ${route.arrivalTime} (${route.duration})
                        </p>
                        <p class="mb-0">
                            <i class="fas fa-bus me-2"></i>
                            ${route.busType} Bus
                        </p>
                    </div>
                    <div class="col-md-4 text-end">
                        <div class="h4 text-primary mb-0">₹${route.price}</div>
                        <small class="text-muted">per passenger</small>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('selectedRouteId').value = route.id;
    }

    updatePassengerForms() {
        const passengerCount = parseInt(document.getElementById('passengers').value);
        const container = document.getElementById('passengerForms');
        
        // Update the display fields
        this.updateBookingDisplayFields();
        
        container.innerHTML = '';
        
        for (let i = 1; i <= passengerCount; i++) {
            const formHtml = `
                <div class="passenger-form">
                    <h6>
                        <i class="fas fa-user"></i>
                        Passenger ${i}
                    </h6>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" name="firstName_${i}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" name="lastName_${i}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email_${i}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-control" name="phone_${i}" required>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += formHtml;
        }
        
        this.updateTotalAmount();
    }

    updateBookingDisplayFields() {
        // Update travel date display
        const travelDate = document.getElementById('travelDate').value;
        const displayTravelDate = document.getElementById('displayTravelDate');
        if (displayTravelDate && travelDate) {
            const formattedDate = new Date(travelDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            displayTravelDate.textContent = formattedDate;
        }

        // Update passenger count display
        const passengerCount = document.getElementById('passengers').value;
        const displayPassengerCount = document.getElementById('displayPassengerCount');
        if (displayPassengerCount && passengerCount) {
            displayPassengerCount.textContent = `${passengerCount} Passenger${passengerCount > 1 ? 's' : ''}`;
        }
    }

    updateTotalAmount() {
        if (!this.selectedRoute) return;
        
        const passengerCount = parseInt(document.getElementById('passengers').value);
        const totalAmount = this.selectedRoute.price * passengerCount;
        document.getElementById('totalAmount').textContent = totalAmount;
    }

    async handleBookingConfirmation() {
        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Collect passenger data
        const passengerCount = parseInt(document.getElementById('passengers').value);
        const passengers = [];
        
        for (let i = 1; i <= passengerCount; i++) {
            passengers.push({
                firstName: formData.get(`firstName_${i}`),
                lastName: formData.get(`lastName_${i}`),
                email: formData.get(`email_${i}`),
                phone: formData.get(`phone_${i}`)
            });
        }

        const bookingData = {
            routeId: this.selectedRoute.id,
            passengers: passengers,
            totalAmount: this.selectedRoute.price * passengerCount
        };

        // Store the complete booking data for the details page
        const completeBookingData = {
            id: `BK-${Date.now()}`, // Generate a temporary ID
            from: this.selectedRoute.from,
            to: this.selectedRoute.to,
            departureTime: this.selectedRoute.departureTime,
            arrivalTime: this.selectedRoute.arrivalTime,
            duration: this.selectedRoute.duration,
            busType: this.selectedRoute.busType,
            travelDate: document.getElementById('travelDate').value,
            totalAmount: this.selectedRoute.price * passengerCount,
            passengers: passengers
        };
        
        localStorage.setItem('currentBookingData', JSON.stringify(completeBookingData));

        // Show loading state
        const confirmBtn = document.getElementById('confirmBooking');
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<span class="loading"></span> Processing...';
        confirmBtn.disabled = true;

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-status': 'true'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

                    if (result.success) {
            this.bookingModal.hide();
            // Use the actual booking ID from the server response
            const actualBookingId = result.bookingId;
            
            // Update the stored booking data with the real ID
            const storedData = JSON.parse(localStorage.getItem('currentBookingData'));
            storedData.id = actualBookingId;
            localStorage.setItem('currentBookingData', JSON.stringify(storedData));
            
            this.showSuccessMessage(actualBookingId);
            // Refresh routes to update seat availability
            await this.loadRoutes();
            this.displayRoutes();
        } else {
            this.showNotification(result.error || 'Booking failed. Please try again.', 'error');
        }
        } catch (error) {
            this.showNotification('Error processing booking. Please try again.', 'error');
        } finally {
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        }
    }

    showSuccessMessage(bookingId) {
        const successHtml = `
            <div class="text-center py-5">
                <div class="success-checkmark mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-success mb-3">Booking Confirmed!</h3>
                <p class="lead mb-4">Your booking has been successfully confirmed.</p>
                <div class="alert alert-info">
                    <strong>Booking ID:</strong> ${bookingId}
                </div>
                <p class="mb-4">You will receive a confirmation email shortly.</p>
                <div class="d-flex justify-content-center gap-3">
                    <button class="btn btn-primary btn-lg" onclick="app.openBookingDetails('${bookingId}')">
                        <i class="fas fa-eye me-2"></i>
                        View Details
                    </button>
                    <button class="btn btn-outline-primary" onclick="location.reload()">
                        <i class="fas fa-home me-2"></i>
                        Back to Home
                    </button>
                </div>
            </div>
        `;

        // Create modal for success message
        const successModal = new bootstrap.Modal(document.createElement('div'));
        const modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        ${successHtml}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalElement);
        
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        // Clean up modal after it's hidden
        modalElement.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modalElement);
        });
    }

    async handleLogout() {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                // Clear authentication data
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('userEmail');
                
                // Show success message
                this.showNotification('Logout successful. Redirecting to login...', 'info');
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            }
        } catch (error) {
            this.showNotification('Error during logout. Please try again.', 'error');
        }
    }

    openBookingDetails(bookingId) {
        // Store the booking ID in localStorage so the confirmation page can access it
        localStorage.setItem('currentBookingId', bookingId);
        
        // Redirect to the booking details page
        window.location.href = `/booking-details.html?id=${bookingId}`;
    }

    showNotification(message, type = 'info') {
        const alertClass = type === 'error' ? 'alert-danger' : 'alert-info';
        const notification = document.createElement('div');
        notification.className = `alert ${alertClass} alert-dismissible notification`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'} me-3"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BusBookingApp();
});