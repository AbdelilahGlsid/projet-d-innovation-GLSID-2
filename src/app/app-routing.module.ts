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
import {SignInComponent} from "./sign-in/sign-in.component";
import {LoginComponent} from "./login/login.component";
import {AdminContentComponent} from "./admin_folder/admin-content/admin-content.component";
import {PatientContentComponent} from "./patient_folder/patient-content/patient-content.component";
import {MedecinContentComponent} from "./medecin_folder/medecin-content/medecin-content.component";
import {Error404Component} from "./error-404/error-404.component";

const routes: Routes = [
  { path :"login", component : LoginComponent},
  { path :"", redirectTo : "/login", pathMatch : "full"},

  { path :"admin", component : AdminContentComponent, children : [
      { path :"medecins", component : MedecinsComponent},
      { path :"medecins/:id/rendezvous", component : RendezVousComponent},
      { path :"patients/:id/dossier-medical", component : DossierMedicalComponent},
      { path :"patients", component : PatientsComponent},
    ]},

  { path :"patient/:id/rendezvous", component : RendezVousPatientComponent},
  { path :"patient/:id/dossier-medical", component : DossierMedicalPatientComponent},

  { path :"medecin/:idMed/patients", component : PatientsMedecinComponent},
  { path :"medecin/:idMed/:id/dossier-medical", component : DossierMedicalMedecinComponent},

  { path: 'error', component : Error404Component },
  { path: '**', redirectTo: '/error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
