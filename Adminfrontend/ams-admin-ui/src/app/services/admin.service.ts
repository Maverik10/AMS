import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private carrierApi = 'http://localhost:8080/api/carriers';
  private flightApi = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  // =========================
  // CARRIER APIs
  // =========================

  addCarrier(data: any) {
    return this.http.post(this.carrierApi, data);
  }

  getAllCarriers() {
    return this.http.get(this.carrierApi);
  }

  getCarriersCount() {
    return this.http.get<number>(`${this.carrierApi}/count`);
  }

  // =========================
  // FLIGHT APIs
  // =========================

  addFlight(data: any) {
    return this.http.post(this.flightApi, data);
  }

  getAllFlights() {
    return this.http.get(this.flightApi);
  }

  getFlightsCount() {
    return this.http.get<number>(`${this.flightApi}/count`);
  }

  deleteFlight(id: number) {
    return this.http.delete(
      `${this.flightApi}/${id}`
    );
  }

}