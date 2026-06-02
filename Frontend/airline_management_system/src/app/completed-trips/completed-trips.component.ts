import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-completed-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './completed-trips.component.html',
  styleUrls: ['./completed-trips.component.css']
})
export class CompletedTripsComponent implements OnInit {

  trips = [
    { flightName: 'Vistara UK-911', origin: 'Delhi', destination: 'Bengaluru', travelDate: '2026-01-12', price: 7600 },
    { flightName: 'Indigo 6E-301', origin: 'Hyderabad', destination: 'Kolkata', travelDate: '2026-02-20', price: 6900 },
    { flightName: 'Air India AI-808', origin: 'Mumbai', destination: 'Goa', travelDate: '2026-03-11', price: 4300 }
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
}