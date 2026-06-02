import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Protect home page from direct access without login
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      this.router.navigate(['/login']);
    }
  }

  // Navigate to Flights page
  goToFlights(): void {
    this.router.navigate(['/flights']);
  }

  // Navigate to Bookings page
  goToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  // Navigate to Profile page
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  // Logout with confirmation
  logout(): void {
    const confirmLogout = confirm(
      'You are about to logout from AMS. Do you want to continue?'
    );

    if (confirmLogout) {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['/login']);
    }
  }
}