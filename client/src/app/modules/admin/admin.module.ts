import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    BookingsComponent,
    HomeComponent,
    FlightsComponent,
    AddFlightComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
