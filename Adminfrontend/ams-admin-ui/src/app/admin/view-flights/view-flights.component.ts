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
}