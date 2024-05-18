import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PatientsComponent} from "./patients/patients.component";

const routes: Routes = [
  { path :"navbar", component : NavbarComponent},
  { path :"medecins", component : MedecinsComponent},
  { path :"patients", component : PatientsComponent},
  { path :"dashboard", component : DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
