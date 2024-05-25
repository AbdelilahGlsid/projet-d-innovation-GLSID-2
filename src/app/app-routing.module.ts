import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedecinsComponent } from './medecins/medecins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PatientsComponent} from "./patients/patients.component";
import {RendezVousComponent} from "./rendez-vous/rendez-vous.component";
import {DossierMedicalComponent} from "./dossier-medical/dossier-medical.component";

const routes: Routes = [
  { path :"medecins", component : MedecinsComponent},
  { path :"medecins/:id/rendezvous", component : RendezVousComponent},
  { path :"patients/:id/dossier-medical", component : DossierMedicalComponent},
  { path :"patients", component : PatientsComponent},
  { path :"dashboard", component : DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
