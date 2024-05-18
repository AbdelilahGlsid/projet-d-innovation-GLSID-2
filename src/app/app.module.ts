import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableMedecinsComponent } from './medecins/table-medecins/table-medecins.component';
import { PatientsComponent } from './patients/patients.component';
import { TablePatientsComponent } from './patients/table-patients/table-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MedecinsComponent,
    DashboardComponent,
    TableMedecinsComponent,
    PatientsComponent,
    TablePatientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
