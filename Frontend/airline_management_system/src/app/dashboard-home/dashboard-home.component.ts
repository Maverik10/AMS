import { FlightService, Flight } from '../services/flight.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  passengerName = 'Passenger';
  greeting = '';
  todayDate = '';

  locations: string[] = [
    'Delhi',
    'Mumbai',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
    'Goa'
  ];

  search = {
    origin: '',
    destination: '',
    departure: '',
    travellers: 1,
    travelClass: ''
  };

  errorMessage = '';
  searchDone = false;

  flights: Flight[] = [];
  filteredFlights: Flight[] = [];

  constructor(
    private router: Router,
    private flightService: FlightService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.todayDate = new Date().toISOString().split('T')[0];

    const passengerData = localStorage.getItem('loggedInPassenger');

    if (passengerData) {
      const passenger = JSON.parse(passengerData);
      this.passengerName = passenger.firstName || 'Passenger';
    }

    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }

    // Load flights from backend
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        console.log('Flights from backend:', data);
      },
      error: (err) => {
        console.error('Failed to load flights', err);
      }
    });
  }

  searchFlights(): void {

    this.errorMessage = '';
    this.searchDone = false;

    if (!this.search.origin) {
      this.errorMessage = 'Please select origin.';
      return;
    }

    if (!this.search.destination) {
      this.errorMessage = 'Please select destination.';
      return;
    }

    if (this.search.origin === this.search.destination) {
      this.errorMessage = 'Origin and Destination cannot be same.';
      return;
    }

    if (!this.search.departure) {
      this.errorMessage = 'Please select departure date.';
      return;
    }

    if (!this.search.travellers || this.search.travellers < 1) {
      this.errorMessage = 'No of Travellers must be at least 1.';
      return;
    }

    if (!this.search.travelClass) {
      this.errorMessage = 'Please select travel class.';
      return;
    }

//     this.filteredFlights = this.flights.filter(
//   flight =>
//     flight.origin.toLowerCase() === this.search.origin.toLowerCase() &&
//     flight.destination.toLowerCase() === this.search.destination.toLowerCase()
// );

// this.searchDone = true;

// if (this.filteredFlights.length === 0) {
//   this.errorMessage = 'No flights found for the selected route.';
// }

    

    const formattedDate =
    this.formatDateForBackend(
      this.search.departure
    );

  this.flightService.searchFlights(
    this.search.origin,
    this.search.destination,
    formattedDate,
    this.search.travellers,
    this.search.travelClass
  )
  .subscribe({

    next: (data) => {

      console.log(
        'Flights returned from backend:',
        data
      );

      this.filteredFlights = data;

      this.searchDone = true;

      if (data.length === 0) {
        this.errorMessage =
          'No flights found for the selected route.';
      }
    },

    error: (err) => {

      console.error(err);

      this.errorMessage =
        'Failed to fetch flights.';
    }
  });
  }
  
  private formatDateForBackend(date: string): string {

    const parts = date.split('-');

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

getAvailableSeats(flight: any): number {

  switch (this.search.travelClass) {

    case 'Economy':
      return flight.leftSeatCapacityEconomy;

    case 'Executive':
      return flight.leftSeatCapacityExecutive;

    case 'Business':
      return flight.leftSeatCapacityBusiness;

    default:
      return 0;
  }
}

  logout(): void {

    const confirmLogout = confirm(
      'You are about to logout from AMS. Do you want to continue?'
    );

    if (confirmLogout) {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInPassenger');
      this.router.navigate(['/login']);
    }
  }

  
// bookFlight(flight: any) {

//     let bookedTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');

//     const bookedData = {
//       flightName: flight.carrierName,
//       origin: flight.origin,
//       destination: flight.destination,
//       travelDate: flight.departureDate,
//       price: flight.airFare
//     };

//     bookedTrips.push(bookedData);

//     localStorage.setItem('bookedTrips', JSON.stringify(bookedTrips));

//     alert('Flight booked ✅');
//   }

bookFlight(flight: any) {

  const passengerData = localStorage.getItem('loggedInUser'); 

  if (!passengerData) {
    alert('Please login again');
    return;
  }

  if (!this.search.travelClass || !this.search.departure) {
    alert("Please select travel class and departure date");
    return;
  }

  const passenger = JSON.parse(passengerData);

  console.log("Passenger:", passenger);

  const requestBody = {
    passengerId: passenger.passengerId || passenger.id,
    flightId: flight.flightId,
    travelClass: this.search.travelClass,
    journeyDate: this.search.departure,
    fare: flight.airFare
  };

  console.log("Request Body:", requestBody);

  this.flightService.bookFlight(requestBody).subscribe({
    next: (response) => {

      alert('Flight booked successfully ✅');

      let bookedTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');

      const bookedData = {
  passengerId: passenger.passengerId || passenger.id,
  flightId: flight.flightId,
  flightName: flight.carrierName,
  origin: flight.origin,
  destination: flight.destination,
  travelClass: this.search.travelClass,
  journeyDate: this.search.departure,
  fare: flight.airFare
};


      bookedTrips.push(bookedData);
      localStorage.setItem('bookedTrips', JSON.stringify(bookedTrips));
    },

    error: (err) => {
      console.error("Booking Error:", err);
      alert('Booking failed ❌');
    }
  });
}


}

