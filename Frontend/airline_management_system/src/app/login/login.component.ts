import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userId: string = '';
  password: string = '';
  errorMsg: string = '';
  showPassword: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onUserIdInput(): void {
    this.userId = this.userId.replace(/\D/g, '');

    if (this.userId.length > 5) {
      this.userId = this.userId.substring(0, 5);
    }
  }

  loginUser(): void {
    this.errorMsg = '';

    const userId = this.userId.trim();
    const password = this.password.trim();

    if (!/^\d{1,5}$/.test(userId)) {
      this.errorMsg = 'User ID must be numeric and max 5 digits';
      return;
    }

    if (password.length < 6 || password.length > 30) {
      this.errorMsg = 'Password must be between 6 and 30 characters';
      return;
    }

    const loginData = {
      userId: userId,
      password: password
    };

    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('loggedInUser', userId);
        localStorage.setItem('loggedInPassenger', JSON.stringify(response));

        // alert('Login successful ✅');

        // this.router.navigate(['/home']);
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3600);
      },
      error: (error) => {
        console.error(error);

        if (error.status === 404) {
          this.errorMsg = 'ID not valid';
        } else if (error.status === 401) {
          this.errorMsg = 'Password not valid';
        } else {
          this.errorMsg = 'Login failed. Please try again.';
        }
      }
    });
  }
}