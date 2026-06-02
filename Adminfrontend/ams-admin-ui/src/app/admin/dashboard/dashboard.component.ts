import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showProfileMenu = false;

  greeting = '';

  flightsCount = 0;

  carriersCount = 0;

  constructor(
    private service: AdminService
  ) {

    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  ngOnInit(): void {

    this.loadFlightsCount();

    this.loadCarriersCount();
  }

  loadFlightsCount() {

    this.service.getAllFlights()
      .subscribe({

        next: (data: any) => {

          this.flightsCount = data.length;
        },

        error: () => {

          console.error('Unable to load flights');
        }
      });
  }

  loadCarriersCount() {

    this.service.getAllCarriers()
      .subscribe({

        next: (data: any) => {

          this.carriersCount = data.length;
        },

        error: () => {

          console.error('Unable to load carriers');
        }
      });
  }

  toggleProfileMenu() {

    this.showProfileMenu =
      !this.showProfileMenu;
  }

  viewProfile() {

    alert(
      '👨‍✈️ ADMIN PROFILE\n\n' +
      'Name: Admin\n' +
      'Role: System Administrator\n' +
      'System: CloudScanner AMS\n' +
      'Status: Active'
    );
  }

  logout() {

    const confirmation = confirm(
      'Are you sure you want to logout?'
    );

    if (confirmation) {

      localStorage.removeItem(
        'loggedIn'
      );

      window.location.href = '/';
    }
  }
}