import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-cancelled-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cancelled-trips.component.html',
  styleUrls: ['./cancelled-trips.component.css']
})
export class CancelledTripsComponent implements OnInit {

  trips = [
    { flightName: 'SpiceJet SG-145', origin: 'Mumbai', destination: 'Delhi', travelDate: '2026-04-08', price: 4500 },
    { flightName: 'Air India AI-702', origin: 'Goa', destination: 'Hyderabad', travelDate: '2026-04-18', price: 6100 },
    { flightName: 'Indigo 6E-517', origin: 'Pune', destination: 'Chennai', travelDate: '2026-05-02', price: 5800 }
  ];

  constructor(private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      if (!localStorage.getItem('loggedInUser')) {
        this.router.navigate(['/login']);
      }

    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInPassenger');
    }

    this.router.navigate(['/login']);
  }


  cancelFlight(trip: any) {
    let cancelledTrips = JSON.parse(localStorage.getItem('cancelledTrips') || '[]');

    cancelledTrips.push(trip);

    localStorage.setItem('cancelledTrips', JSON.stringify(cancelledTrips));

    alert('Flight cancelled ✅');

    // update UI
    this.trips = cancelledTrips;
  }
}



