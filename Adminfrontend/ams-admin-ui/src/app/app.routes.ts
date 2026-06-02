import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { AddCarrierComponent } from './admin/add-carrier/add-carrier.component';

import { AddFlightComponent } from './admin/add-flight/add-flight.component';

import { ViewFlightsComponent } from './admin/view-flights/view-flights.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'add-carrier',
    component: AddCarrierComponent
  },

  {
    path: 'add-flight',
    component: AddFlightComponent
  },

  {
    path: 'view-flights',
    component: ViewFlightsComponent
  }
];