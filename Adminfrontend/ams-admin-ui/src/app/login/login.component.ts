import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  errorMessage = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // Run only in browser
    if (isPlatformBrowser(this.platformId)) {

      if (localStorage.getItem('loggedIn') === 'true') {
        this.router.navigate(['/dashboard']);
      }

    }
  }

  login() {

    this.errorMessage = '';

    if (
      this.username === 'admin' &&
      this.password === 'admin123'
    ) {

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('loggedIn', 'true');
      }

      this.router.navigate(['/dashboard']);

    } else {

      this.errorMessage =
        'Invalid Username or Password';
    }
  }
}