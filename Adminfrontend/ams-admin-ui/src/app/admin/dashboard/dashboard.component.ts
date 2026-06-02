import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
export class DashboardComponent {

  showProfileMenu = false;

  greeting = '';

  constructor() {

    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
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