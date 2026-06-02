import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfileComponent } from './profile/profile.component';
import { TripsComponent } from './trips/trips.component';
import { UpcomingTripsComponent } from './upcoming-trips/upcoming-trips.component';
import { CancelledTripsComponent } from './cancelled-trips/cancelled-trips.component';
import { CompletedTripsComponent } from './completed-trips/completed-trips.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: DashboardHomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'trips',
    component: TripsComponent
  },
  {
    path: 'trips/upcoming',
    component: UpcomingTripsComponent
  },
  {
    path: 'trips/cancelled',
    component: CancelledTripsComponent
  },
  {
    path: 'trips/completed',
    component: CompletedTripsComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];