import { BookingService, Booking } from '../services/booking.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  bookings: Booking[] = [];

  upcomingTrips = 0;
  completedTrips = 0;
  cancelledTrips = 0;
  travelSpend = 0;

  constructor(
    private router: Router,
    private bookingService: BookingService,
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

    const passengerId = Number(loggedInUser);

    this.bookingService
      .getBookingsByPassenger(passengerId)
      .subscribe({

        next: (data) => {

          this.bookings = data;

          this.upcomingTrips =
            data.filter(
              booking => booking.status === 'UPCOMING'
            ).length;

          this.completedTrips =
            data.filter(
              booking => booking.status === 'COMPLETED'
            ).length;

          this.cancelledTrips =
            data.filter(
              booking => booking.status === 'CANCELLED'
            ).length;

          this.travelSpend =
            data.reduce(
              (sum, booking) => sum + booking.fare,
              0
            );

          console.log('Bookings:', data);
        },

        error: (err) => {
          console.error('Failed to load bookings', err);
        }

      });
  }

  logout(): void {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInPassenger');
    }

    this.router.navigate(['/login']);
  }
}