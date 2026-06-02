import { BookingService, Booking } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode = false;
  message = '';
  bookings: Booking[] = [];

  completedTrips = 0;
  upcomingTrips = 0;

  passenger: any = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    address: '',
    contactNumber: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
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

      this.completedTrips =
        data.filter(
          booking => booking.status === 'COMPLETED'
        ).length;

      this.upcomingTrips =
        data.filter(
          booking => booking.status === 'UPCOMING'
        ).length;

      console.log('Profile Bookings:', data);
    },

    error: (err) => {
      console.error('Failed to load bookings', err);
    }
  });

    this.userService.getUserById(passengerId).subscribe({
      next: (data) => {
        this.passenger = data;
        localStorage.setItem('loggedInPassenger', JSON.stringify(data));
      },
      error: () => {
        const stored = localStorage.getItem('loggedInPassenger');

        if (stored) {
          this.passenger = JSON.parse(stored);
        }
      }
    });
  }

  enableEdit(): void {
    this.editMode = true;
    this.message = '';
  }

  saveProfile(): void {
    const id = Number(this.passenger.id);

    this.userService.updateUser(id, this.passenger).subscribe({
      next: (updatedUser) => {
        this.passenger = updatedUser;
        localStorage.setItem('loggedInPassenger', JSON.stringify(updatedUser));
        this.editMode = false;
        this.message = 'Profile updated successfully.';
      },
      error: () => {
        this.message = 'Unable to update profile. Please try again.';
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
