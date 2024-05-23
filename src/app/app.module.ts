import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableMedecinsComponent } from './medecins/table-medecins/table-medecins.component';
import { PatientsComponent } from './patients/patients.component';
import { TablePatientsComponent } from './patients/table-patients/table-patients.component';
import { DossierMedicalComponent } from './dossier-medical/dossier-medical.component';
import { TableDossierMedicalComponent } from './dossier-medical/table-dossier-medical/table-dossier-medical.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { TableRendezVousComponent } from './rendez-vous/table-rendez-vous/table-rendez-vous.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MedecinsComponent,
    DashboardComponent,
    TableMedecinsComponent,
    PatientsComponent,
    TablePatientsComponent,
    DossierMedicalComponent,
    TableDossierMedicalComponent,
    RendezVousComponent,
    TableRendezVousComponent,
    SidebarComponent,
    MainHeaderComponent,
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
