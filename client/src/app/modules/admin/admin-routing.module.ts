import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'bookings',
        component:BookingsComponent
      },
      {
        path:'flights',
        component:FlightsComponent
      },
      {
        path:'add-flight',
        component:AddFlightComponent
      },
      {
        path:'users',
        component:UsersComponent
      },
      {
        path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
