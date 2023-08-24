import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { OwnerRegiterComponent } from './components/owner-regiter/owner-regiter.component';
import { OwnerLoginComponent } from './components/owner-login/owner-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'airline-login', component: OwnerLoginComponent },
  { path: 'bookings', component:BookingsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'airline-register', component: OwnerRegiterComponent },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'owner',
    loadChildren: () => import('./ownermodules/owner/owner.module').then((m) => m.OwnerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
