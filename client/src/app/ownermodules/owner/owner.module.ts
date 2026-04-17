import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { ComponentsComponent } from './components/components.component';
import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    FlightsComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule
  ]
})
export class OwnerModule { }
