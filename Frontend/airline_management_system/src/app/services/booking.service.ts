import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingId: number;
  passengerId: number;
  flightId: number;
  travelClass: string;
  journeyDate: string;
  status: string;
  fare: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  getBookingsByPassenger(
    passengerId: number
  ): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.baseUrl}/passenger/${passengerId}`
    );
  }

  getUpcomingBookings(
    passengerId: number
  ): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.baseUrl}/passenger/${passengerId}/upcoming`
    );
  }

  getCompletedBookings(
    passengerId: number
  ): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.baseUrl}/passenger/${passengerId}/completed`
    );
  }

  getCancelledBookings(
    passengerId: number
  ): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.baseUrl}/passenger/${passengerId}/cancelled`
    );
  }

  cancelBooking(
  bookingId: number
): Observable<Booking> {

  return this.http.put<Booking>(
    `${this.baseUrl}/${bookingId}/cancel`,
    {}
  );
} 
}