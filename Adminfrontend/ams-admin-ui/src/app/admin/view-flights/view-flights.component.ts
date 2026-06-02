import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-flights',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './view-flights.component.html',

  styleUrl: './view-flights.component.css'
})

export class ViewFlightsComponent implements OnInit {

  flights:any[] = [];

  showDeletePopup = false;

  selectedFlightId:number = 0;

  constructor(
    private service: AdminService
  ) {}

  ngOnInit(): void {

    this.loadFlights();
  }

  loadFlights(){

    this.service.getAllFlights()
      .subscribe({

        next: (data:any) => {

          this.flights = data;
        },

        error: () => {

          alert('Unable to load flights');
        }
      });
  }

  openDeletePopup(id:number){

    this.selectedFlightId = id;

    this.showDeletePopup = true;
  }

  closePopup(){

    this.showDeletePopup = false;
  }

  confirmDelete(){

    this.service.deleteFlight(this.selectedFlightId)
      .subscribe({

        next: () => {

          this.flights =
            this.flights.filter(
              flight =>
                flight.flightId !== this.selectedFlightId
            );

          this.showDeletePopup = false;

          alert('Flight cancelled successfully');
        },

        error: () => {

          alert('Unable to delete flight');
        }
      });
  }

}