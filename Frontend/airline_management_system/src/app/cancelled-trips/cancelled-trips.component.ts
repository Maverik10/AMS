import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookingService, Booking } from '../services/booking.service';
import { FlightService } from '../services/flight.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cancelled-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cancelled-trips.component.html',
  styleUrls: ['./cancelled-trips.component.css']
})
export class CancelledTripsComponent implements OnInit {

  trips: any[] = [];

  constructor(
  private router: Router,
  private bookingService: BookingService,
  private flightService: FlightService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

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
    .getCancelledBookings(passengerId)
    .subscribe({

      next: (bookings: Booking[]) => {

        const requests =
          bookings.map(
            (booking: Booking) =>
              this.flightService.getFlightById(
                booking.flightId
              )
          );

        forkJoin(requests).subscribe({

          next: (flights: any[]) => {

            this.trips =
              bookings.map(
                (booking: Booking, index: number) => ({

                  ...booking,

                  flightName:
                    flights[index].carrierName,

                  origin:
                    flights[index].origin,

                  destination:
                    flights[index].destination

                })
              );

          },

          error: (err) => {
            console.error(err);
          }

        });

      },

      error: (err) => {
        console.error(err);
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


  // cancelFlight(trip: any) {
  //   let cancelledTrips = JSON.parse(localStorage.getItem('cancelledTrips') || '[]');

  //   cancelledTrips.push(trip);

  //   localStorage.setItem('cancelledTrips', JSON.stringify(cancelledTrips));

  //   alert('Flight cancelled ✅');

  //   // update UI
  //   this.trips = cancelledTrips;
  // }
}



