import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  address: string;
  contactNumber: string;
  password?: string;
}

export interface RegisterResponse {
  message: string;
  passengerId: number;
  password: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, user);
  }

  loginUser(loginData: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, user: RegisterRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}