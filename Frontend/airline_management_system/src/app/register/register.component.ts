import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passenger = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    address: '',
    contact: ''
  };

  errorMessage: string = '';
  ackVisible: boolean = false;

  passengerId: number | null = null;
  generatedPassword: string = '';

  todayDate: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
  }

  onRegister(form: NgForm): void {
    this.errorMessage = '';

    const nameRegex = /^[A-Za-z]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[1-9][0-9]{9}$/;

    const firstName = this.passenger.firstName.trim();
    const lastName = this.passenger.lastName.trim();
    const dob = this.passenger.dob;
    const email = this.passenger.email.trim();
    const address = this.passenger.address.trim();
    const contact = this.passenger.contact.trim();

    if (!nameRegex.test(firstName)) {
      this.showError('First Name must be at least 3 characters and contain only alphabets.');
      return;
    }

    if (!nameRegex.test(lastName)) {
      this.showError('Last Name must be at least 3 characters and contain only alphabets.');
      return;
    }

    if (!dob) {
      this.showError('Please select your Date of Birth.');
      return;
    }

    if (new Date(dob) > new Date()) {
      this.showError('Date of Birth cannot be a future date.');
      return;
    }

    if (!emailRegex.test(email)) {
      this.showError('Please enter a valid Email ID.');
      return;
    }

    if (address.length < 5) {
      this.showError('Address must be at least 5 characters.');
      return;
    }

    if (!contactRegex.test(contact)) {
      this.showError('Contact Number must be 10 digits and should not start with 0.');
      return;
    }

    const password = this.generatePassword(firstName);

    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      address: address,
      contactNumber: contact,
      password: password
    };

    this.userService.registerUser(requestBody).subscribe({
      next: (response) => {
        this.passengerId = response.passengerId;
        this.generatedPassword = response.password;
        this.ackVisible = true;
      },
      error: (error) => {
        console.error(error);
        this.showError('Registration failed. Please try again.');
      }
    });
  }

  onReset(form: NgForm): void {
    form.resetForm();

    this.passenger = {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      address: '',
      contact: ''
    };

    this.errorMessage = '';
    this.ackVisible = false;
    this.passengerId = null;
    this.generatedPassword = '';
  }

  showError(message: string): void {
    this.errorMessage = message;
  }

  generatePassword(fname: string): string {
    return fname.substring(0, 4).toLowerCase() + '@123';
  }

  validateContact(): void {
    this.passenger.contact = this.passenger.contact.replace(/\D/g, '');

    if (this.passenger.contact.startsWith('0')) {
      this.passenger.contact = this.passenger.contact.substring(1);
    }

    if (this.passenger.contact.length > 10) {
      this.passenger.contact = this.passenger.contact.substring(0, 10);
    }
  }

  validateName(fieldName: 'firstName' | 'lastName'): void {
    this.passenger[fieldName] =
      this.passenger[fieldName].replace(/[^A-Za-z]/g, '');
  }
}