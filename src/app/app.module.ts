import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableMedecinsComponent } from './medecins/table-medecins/table-medecins.component';
import { PatientsComponent } from './patients/patients.component';
import { TablePatientsComponent } from './patients/table-patients/table-patients.component';
import { DossierMedicalComponent } from './dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { TableRendezVousComponent } from './rendez-vous/table-rendez-vous/table-rendez-vous.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ConsultationComponent } from './dossier-medical/consultation/consultation.component';
import { TableConsultationComponent } from './dossier-medical/consultation/table-consultation/table-consultation.component';

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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
