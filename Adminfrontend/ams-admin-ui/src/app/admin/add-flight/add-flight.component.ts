import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent implements OnInit {

  flight: any = this.getEmptyFlight();

  carriers: any[] = [];
  successMessage = '';
  today: string = '';

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.setTodayDate();
    this.loadCarriers();
  }

  getEmptyFlight() {
    return {
      carrierName: '',
      origin: '',
      destination: '',
      airFare: '',
      departureDate: '',
      seatCapacityBusiness: '',
      seatCapacityEconomy: '',
      seatCapacityExecutive: ''
    };
  }

  setTodayDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Required by HTML input[type="date"], keep this as yyyy-MM-dd
    this.today = `${year}-${month}-${day}`;
  }

  loadCarriers() {
    this.service.getAllCarriers().subscribe({
      next: (data: any) => {
        this.carriers = data;
      },
      error: () => {
        alert('Unable to load carriers');
      }
    });
  }

  addFlight(form: any) {

    this.successMessage = '';

    if (form.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    const carrierName = this.flight.carrierName?.trim();
    const origin = this.flight.origin?.trim();
    const destination = this.flight.destination?.trim();

    const airFare = Number(this.flight.airFare);
    const seatCapacityBusiness = Number(this.flight.seatCapacityBusiness);
    const seatCapacityEconomy = Number(this.flight.seatCapacityEconomy);
    const seatCapacityExecutive = Number(this.flight.seatCapacityExecutive);

    if (!carrierName) {
      alert('Please select a carrier');
      return;
    }

    if (!origin || origin.length < 3) {
      alert('Origin airport must contain at least 3 characters');
      return;
    }

    if (!destination || destination.length < 3) {
      alert('Destination airport must contain at least 3 characters');
      return;
    }

    if (origin.toLowerCase() === destination.toLowerCase()) {
      alert('Origin and Destination cannot be the same');
      return;
    }

    if (!this.flight.departureDate) {
      alert('Please select departure date');
      return;
    }

    if (this.flight.departureDate < this.today) {
      alert('Departure date cannot be in the past');
      return;
    }

    if (isNaN(airFare) || airFare < 100 || airFare > 200000) {
      alert('Air fare must be between ₹100 and ₹200000');
      return;
    }

    if (
      isNaN(seatCapacityBusiness) ||
      isNaN(seatCapacityEconomy) ||
      isNaN(seatCapacityExecutive)
    ) {
      alert('Seat capacity must be valid numbers');
      return;
    }

    if (
      seatCapacityBusiness < 1 ||
      seatCapacityEconomy < 1 ||
      seatCapacityExecutive < 1
    ) {
      alert('Seat counts must be greater than 0');
      return;
    }

    if (
      seatCapacityBusiness > 300 ||
      seatCapacityEconomy > 300 ||
      seatCapacityExecutive > 300
    ) {
      alert('Seat capacity cannot exceed 300');
      return;
    }

    // ✅ Exact request body with departureDate as dd-MM-yyyy
    const payload = {
      carrierName: carrierName,
      origin: origin,
      destination: destination,
      airFare: airFare,
      departureDate: this.convertDateToDDMMYYYY(this.flight.departureDate),
      seatCapacityBusiness: seatCapacityBusiness,
      seatCapacityEconomy: seatCapacityEconomy,
      seatCapacityExecutive: seatCapacityExecutive
    };

    console.log('Flight Payload Sent:', payload);

    this.service.addFlight(payload).subscribe({
      next: () => {
        this.successMessage = 'Flight Added Successfully ✅';

        this.flight = this.getEmptyFlight();
        form.resetForm();
      },
      error: () => {
        alert('Error adding flight');
      }
    });
  }

  // ✅ Converts yyyy-MM-dd to dd-MM-yyyy
  convertDateToDDMMYYYY(date: string): string {
    const parts = date.split('-');

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }
}