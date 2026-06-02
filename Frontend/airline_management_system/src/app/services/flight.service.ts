import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Flight {
  flightId: number;
  carrierName: string;
  origin: string;
  destination: string;
  airFare: number;
  seatCapacityBusiness: number;
  seatCapacityEconomy: number;
  seatCapacityExecutive: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.baseUrl);
  }

  searchFlights(
    origin: string,
    destination: string,
    date: string,
    noOfTravellers: number,
    travelClass: string
  ): Observable<Flight[]> {

    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('date', date)
      .set('noOfTravellers', noOfTravellers.toString())
      .set('travelClass', travelClass);

    return this.http.get<Flight[]>(
      `${this.baseUrl}/search`,
      { params }
    );
  }
  
  bookFlight(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/bookings', data);
  }

  getFlightById(
  flightId: number
): Observable<Flight> {

  return this.http.get<Flight>(
    `${this.baseUrl}/${flightId}`
  );
}



}