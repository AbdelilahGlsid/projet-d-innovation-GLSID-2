import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedecinsComponent } from './admin_folder/medecins/medecins.component';
import { DashboardComponent } from './admin_folder/dashboard/dashboard.component';
import {PatientsComponent} from "./admin_folder/patients/patients.component";
import {RendezVousComponent} from "./admin_folder/rendez-vous/rendez-vous.component";
import {DossierMedicalComponent} from "./admin_folder/dossier-medical/dossier-medical.component";
import {DashboardPatientComponent} from "./patient_folder/dashboard-patient/dashboard-patient.component";
import {RendezVousPatientComponent} from "./patient_folder/rendez-vous-patient/rendez-vous-patient.component";
import {
  DossierMedicalPatientComponent
} from "./patient_folder/dossier-medical-patient/dossier-medical-patient.component";
import {DashboardMedecinComponent} from "./medecin_folder/dashboard-medecin/dashboard-medecin.component";
import {PatientsMedecinComponent} from "./medecin_folder/patients-medecin/patients-medecin.component";
import {
  DossierMedicalMedecinComponent
} from "./medecin_folder/dossier-medical-medecin/dossier-medical-medecin.component";

const routes: Routes = [
  { path :"admin/medecins", component : MedecinsComponent},
  { path :"admin/medecins/:id/rendezvous", component : RendezVousComponent},
  { path :"admin/patients/:id/dossier-medical", component : DossierMedicalComponent},
  { path :"admin/patients", component : PatientsComponent},
  { path :"admin/dashboard", component : DashboardComponent},

  { path :"patient/dashboard", component : DashboardPatientComponent},
  { path :"patient/:id/rendezvous", component : RendezVousPatientComponent},
  { path :"patient/:id/dossier-medical", component : DossierMedicalPatientComponent},

  { path :"medecin/dashboard", component : DashboardMedecinComponent},
  { path :"medecin/:id/patients", component : PatientsMedecinComponent},
  { path :"medecin/:id/:id/dossier-medical", component : DossierMedicalMedecinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
