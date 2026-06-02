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

      // ✅ Discount
      discount30Days: '',
      discount60Days: '',
      discount90Days: '',
      bulkBooking: '',
      silverUser: '',
      goldUser: '',
      platinumUser: '',

      // ✅ Refund
      refund2Days: '',
      refund10Days: '',
      refund20Days: ''
    };
  }

  addCarrier(form: any) {

    if (form.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    // ✅ Name validation
    if (this.carrier.carrierName.length > 50) {
      alert('Carrier name cannot exceed 50 characters');
      return;
    }

    // ✅ Validate all percentages (0–100)
    const fields = [
      'discount30Days','discount60Days','discount90Days',
      'bulkBooking','silverUser','goldUser','platinumUser',
      'refund2Days','refund10Days','refund20Days'
    ];

    for (let f of fields) {
      const val = this.carrier[f];
      if (val < 0 || val > 100) {
        alert(`${f} must be between 0 and 100`);
        return;
      }
    }

    this.service.addCarrier(this.carrier).subscribe({
      next: () => {
        this.successMessage = 'Carrier Added Successfully ✅';
        this.carrier = this.getEmptyCarrier();
        form.resetForm();
      },
      error: () => {
        alert('Error adding carrier');
      }
    });
  }
}
