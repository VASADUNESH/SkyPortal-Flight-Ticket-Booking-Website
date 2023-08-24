import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { FlightsComponent } from './components/flights/flights.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
    children: [
      {
        path:'bookings',
        component:BookingsComponent
      },
      {
        path:'flights',
        component:FlightsComponent
      },
      {
        path: '', redirectTo: '/owner/flights', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
