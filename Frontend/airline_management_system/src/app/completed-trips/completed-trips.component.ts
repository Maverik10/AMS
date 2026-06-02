import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookingService, Booking } from '../services/booking.service';
import { FlightService } from '../services/flight.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-completed-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './completed-trips.component.html',
  styleUrls: ['./completed-trips.component.css']
})
export class CompletedTripsComponent implements OnInit {

  trips: any[] = [];

  constructor(
  private router: Router,
  private bookingService: BookingService,
  private flightService: FlightService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {

    //   if (!localStorage.getItem('loggedInUser')) {
    //     this.router.navigate(['/login']);
    //   }

    // }
    if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const loggedInUser =
    localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    this.router.navigate(['/login']);
    return;
  }
    const passengerId =
  Number(localStorage.getItem('loggedInUser'));

this.bookingService
  .getCompletedBookings(passengerId)
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

        next: (flights: any[]) =>  {

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

        }

      });

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
}