import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-carrier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-carrier.component.html',
  styleUrl: './add-carrier.component.css'
})
export class AddCarrierComponent {

  carrier: any = this.getEmptyCarrier();

  successMessage = '';

  constructor(private service: AdminService) {}

  getEmptyCarrier() {

    return {

      carrierName: '',

      discount30Days: '',
      discount60Days: '',
      discount90Days: '',

      bulkBookingDiscount: '',

      silverUserDiscount: '',
      goldUserDiscount: '',
      platinumUserDiscount: '',

      refund2Days: '',
      refund10Days: '',
      refund20Days: ''
    };
  }

  validatePercentage(field: string) {

    let value = Number(this.carrier[field]);

    if (value > 100) {
      this.carrier[field] = 100;
    }

    if (value < 0) {
      this.carrier[field] = 0;
    }
  }

  addCarrier(form: any) {

    if (form.invalid) {

      alert(
        'Please fill all required fields correctly'
      );

      return;
    }

    if (
      this.carrier.carrierName.trim().length === 0
    ) {

      alert('Carrier name is required');

      return;
    }

    if (
      this.carrier.carrierName.length > 50
    ) {

      alert(
        'Carrier name cannot exceed 50 characters'
      );

      return;
    }

    const fields = [

      'discount30Days',
      'discount60Days',
      'discount90Days',

      'bulkBookingDiscount',

      'silverUserDiscount',
      'goldUserDiscount',
      'platinumUserDiscount',

      'refund2Days',
      'refund10Days',
      'refund20Days'
    ];

    for (let f of fields) {

      const value =
        Number(this.carrier[f]);

      if (
        isNaN(value) ||
        value < 0 ||
        value > 100
      ) {

        alert(
          `${f} must be between 0 and 100`
        );

        return;
      }
    }

    this.service.addCarrier(this.carrier)
      .subscribe({

        next: () => {

          this.successMessage =
            'Carrier Added Successfully ✅';

          this.carrier =
            this.getEmptyCarrier();

          form.resetForm();
        },

        error: () => {

          alert('Error adding carrier');
        }
      });
  }
}