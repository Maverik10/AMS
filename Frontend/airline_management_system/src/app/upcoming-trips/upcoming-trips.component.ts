import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookingService, Booking } from '../services/booking.service';
import { forkJoin } from 'rxjs';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-upcoming-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upcoming-trips.component.html',
  styleUrls: ['./upcoming-trips.component.css']
})
export class UpcomingTripsComponent implements OnInit {

  // trips = [
  //   { flightName: 'Indigo 6E-204', origin: 'Delhi', destination: 'Mumbai', travelDate: '2026-06-10', price: 5200 },
  //   { flightName: 'Air India AI-310', origin: 'Bengaluru', destination: 'Delhi', travelDate: '2026-06-15', price: 6800 },
  //   { flightName: 'Vistara UK-822', origin: 'Chennai', destination: 'Goa', travelDate: '2026-06-22', price: 7400 }
  // ];

trips: any[] = [];

  // constructor(private router: Router,
  // @Inject(PLATFORM_ID) private platformId: Object) {}

constructor(
  private router: Router,
  private bookingService: BookingService,
  private flightService: FlightService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {

  //     if (!localStorage.getItem('loggedInUser')) {
  //       this.router.navigate(['/login']);
  //     }

  //   }
  // }

  
// ngOnInit(): void {
//   if (isPlatformBrowser(this.platformId)) {

//     if (!localStorage.getItem('loggedInUser')) {
//       this.router.navigate(['/login']);
//     }

//     // ✅ LOAD BOOKED TRIPS
//     // const data = localStorage.getItem('bookedTrips');
    
//     this.bookingService
//     .getBookingsByPassenger(passengerId)
//     .subscribe({
//       next: (data) => {
//         this.trips =
//           data.filter(
//             booking => booking.status === 'UPCOMING'
//           );
//       }
//     });
//     // this.trips = data ? JSON.parse(data) : [];
//   }
// }
ngOnInit(): void {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const loggedInUser =
    localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    this.router.navigate(['/login']);
    return;
  }

  const passengerId = Number(loggedInUser);

  this.bookingService
    .getBookingsByPassenger(passengerId)
    .subscribe({

      next: (bookings: Booking[]) => {

        const upcomingBookings =
          bookings.filter(
            booking => booking.status === 'UPCOMING'
          );

        const requests =
          upcomingBookings.map(
            booking =>
              this.flightService.getFlightById(
                booking.flightId
              )
          );

        forkJoin(requests).subscribe({

          next: (flights) => {

            this.trips =
              upcomingBookings.map(
                (booking, index) => ({

                  ...booking,

                  flightName:
                    flights[index].carrierName,

                  origin:
                    flights[index].origin,

                  destination:
                    flights[index].destination

                })
              ) as any;

            console.log('Upcoming Trips:', this.trips);
          },

          error: (err) => {
            console.error('Flight fetch failed', err);
          }

        });

      },

      error: (err) => {
        console.error('Booking fetch failed', err);
      }

    });

    
}
  logout(): void {

  if (typeof window !== 'undefined') {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInPassenger');
  }

  this.router.navigate(['/login']);
}

showCancelModal = false;

selectedBookingId: number | null = null;

openCancelModal(bookingId: number): void {

  console.log('Button clicked', bookingId);

  this.selectedBookingId = bookingId;

  this.showCancelModal = true;
}

closeCancelModal(): void {

  this.showCancelModal = false;

  this.selectedBookingId = null;
}

confirmCancel(): void {

  if (!this.selectedBookingId) {
    return;
  }

  this.bookingService
    .cancelBooking(this.selectedBookingId)
    .subscribe({

      next: () => {

        this.trips =
          this.trips.filter(
            trip =>
              trip.bookingId !== this.selectedBookingId
          );

        this.closeCancelModal();
      },

      error: (err) => {

        console.error(err);

        alert('Cancellation failed');
      }

    });
}
}