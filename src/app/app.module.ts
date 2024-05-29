import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SidebarComponent } from './admin_folder/sidebar/sidebar.component';
import { MainHeaderComponent } from './admin_folder/main-header/main-header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {MedecinsComponent} from "./admin_folder/medecins/medecins.component";
import {DashboardComponent} from "./admin_folder/dashboard/dashboard.component";
import {TableMedecinsComponent} from "./admin_folder/medecins/table-medecins/table-medecins.component";
import {PatientsComponent} from "./admin_folder/patients/patients.component";
import {TablePatientsComponent} from "./admin_folder/patients/table-patients/table-patients.component";
import {DossierMedicalComponent} from "./admin_folder/dossier-medical/dossier-medical.component";
import {RendezVousComponent} from "./admin_folder/rendez-vous/rendez-vous.component";
import {TableRendezVousComponent} from "./admin_folder/rendez-vous/table-rendez-vous/table-rendez-vous.component";
import {ConsultationComponent} from "./admin_folder/dossier-medical/consultation/consultation.component";
import {
  TableConsultationComponent
} from "./admin_folder/dossier-medical/consultation/table-consultation/table-consultation.component";
import { DashboardPatientComponent } from './patient_folder/dashboard-patient/dashboard-patient.component';
import { DossierMedicalPatientComponent } from './patient_folder/dossier-medical-patient/dossier-medical-patient.component';
import { RendezVousPatientComponent } from './patient_folder/rendez-vous-patient/rendez-vous-patient.component';
import { Error404Component } from './error-404/error-404.component';
import { AdminContentComponent } from './admin_folder/admin-content/admin-content.component';
import { PatientContentComponent } from './patient_folder/patient-content/patient-content.component';
import { MedecinContentComponent } from './medecin_folder/medecin-content/medecin-content.component';
import { SidebarMedecinComponent } from './medecin_folder/sidebar-medecin/sidebar-medecin.component';
import { MainHeaderMedecinComponent } from './medecin_folder/main-header-medecin/main-header-medecin.component';
import { MainHeaderPatientComponent } from './patient_folder/main-header-patient/main-header-patient.component';
import { SidebarPatientComponent } from './patient_folder/sidebar-patient/sidebar-patient.component';
import { DashboardMedecinComponent } from './medecin_folder/dashboard-medecin/dashboard-medecin.component';
import { DossierMedicalMedecinComponent } from './medecin_folder/dossier-medical-medecin/dossier-medical-medecin.component';
import { PatientsMedecinComponent } from './medecin_folder/patients-medecin/patients-medecin.component';
import { ConsultationMedecinComponent } from './medecin_folder/dossier-medical-medecin/consultation-medecin/consultation-medecin.component';
import { TableConsultationMedecinComponent } from './medecin_folder/dossier-medical-medecin/consultation-medecin/table-consultation-medecin/table-consultation-medecin.component';
import { LoginComponent } from './login/login.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MedecinsComponent,
    DashboardComponent,
    TableMedecinsComponent,
    PatientsComponent,
    TablePatientsComponent,
    DossierMedicalComponent,
    RendezVousComponent,
    TableRendezVousComponent,
    SidebarComponent,
    MainHeaderComponent,
    SignInComponent,
    ConsultationComponent,
    TableConsultationComponent,
    DashboardPatientComponent,
    DossierMedicalPatientComponent,
    RendezVousPatientComponent,
    Error404Component,
    AdminContentComponent,
    PatientContentComponent,
    MedecinContentComponent,
    SidebarMedecinComponent,
    MainHeaderMedecinComponent,
    MainHeaderPatientComponent,
    SidebarPatientComponent,
    DashboardMedecinComponent,
    DossierMedicalMedecinComponent,
    PatientsMedecinComponent,
    ConsultationMedecinComponent,
    TableConsultationMedecinComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
