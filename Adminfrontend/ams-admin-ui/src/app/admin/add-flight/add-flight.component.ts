import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent implements OnInit {

  flight: any = this.getEmptyFlight();

  carriers: any[] = [];

  successMessage = '';

  today = '';

  constructor(
    private service: AdminService
  ) {}

  ngOnInit(): void {

    this.setTodayDate();

    this.loadCarriers();
  }

  convertDate(date: string): string {

    const parts = date.split('-');

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }

  getEmptyFlight() {

    return {

      carrierName: '',

      origin: '',

      destination: '',

      economyFare: '',

      businessFare: '',

      executiveFare: '',

      departureDate: '',

      seatCapacityBusiness: '',

      seatCapacityEconomy: '',

      seatCapacityExecutive: ''
    };
  }

  setTodayDate() {

    const date = new Date();

    const year = date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, '0');

    const day =
      String(date.getDate()).padStart(2, '0');

    this.today = `${year}-${month}-${day}`;
  }

  loadCarriers() {

    this.service.getAllCarriers()
      .subscribe({

        next: (data: any) => {

          this.carriers = data;
        },

        error: () => {

          alert('Unable to load carriers');
        }
      });
  }

  calculatePricing() {

    const economy =
      Number(this.flight.economyFare);

    if (!economy || economy <= 0) {

      this.flight.businessFare = '';

      this.flight.executiveFare = '';

      return;
    }

    // Business Fare = 2x Economy Fare
    this.flight.businessFare =
      economy * 2;

    // Executive Fare = 5x Economy Fare
    this.flight.executiveFare =
      economy * 5;
  }

  addFlight(form: NgForm) {

    this.successMessage = '';

    if (form.invalid) {

      alert('Please fill all required fields correctly');

      return;
    }

    const carrierName =
      this.flight.carrierName?.trim();

    const origin =
      this.flight.origin?.trim();

    const destination =
      this.flight.destination?.trim();

    const economyFare =
      Number(this.flight.economyFare);

    const businessFare =
      Number(this.flight.businessFare);

    const executiveFare =
      Number(this.flight.executiveFare);

    const seatCapacityBusiness =
      Number(this.flight.seatCapacityBusiness);

    const seatCapacityEconomy =
      Number(this.flight.seatCapacityEconomy);

    const seatCapacityExecutive =
      Number(this.flight.seatCapacityExecutive);

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

    if (
      origin.toLowerCase() ===
      destination.toLowerCase()
    ) {

      alert('Origin and Destination cannot be the same');

      return;
    }

    if (!this.flight.departureDate) {

      alert('Please select departure date');

      return;
    }

    if (
      this.flight.departureDate <
      this.today
    ) {

      alert('Departure date cannot be in the past');

      return;
    }

    if (
      isNaN(economyFare) ||
      economyFare < 100
    ) {

      alert('Economy Fare must be greater than ₹100');

      return;
    }

    const payload = {

      carrierName: carrierName,

      origin: origin,

      destination: destination,

      economyFare: economyFare,

      businessFare: businessFare,

      executiveFare: executiveFare,

      departureDate:
        this.convertDate(
          this.flight.departureDate
        ),

      seatCapacityBusiness:
        seatCapacityBusiness,

      seatCapacityEconomy:
        seatCapacityEconomy,

      seatCapacityExecutive:
        seatCapacityExecutive
    };

    console.log(
      'Flight Payload Sent:',
      payload
    );

    this.service.addFlight(payload)
      .subscribe({

        next: () => {

          this.successMessage =
            'Flight Added Successfully ✅';

          this.flight =
            this.getEmptyFlight();

          form.resetForm();
        },

        error: (err) => {

          console.error(err);

          alert('Error adding flight');
        }
      });
  }
}