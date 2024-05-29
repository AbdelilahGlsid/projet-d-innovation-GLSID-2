import {Component, input, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {DossierMedical} from "../../models/dossier.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Patient} from "../../models/patient.model";
import {DossierService} from "../../services/dossier.service";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consultation} from "../../models/consultation.model";
import {ConsultationService} from "../../services/consultation.service";

@Component({
  selector: 'app-dossier-medical-patient',
  templateUrl: './dossier-medical-patient.component.html',
  styleUrl: './dossier-medical-patient.component.css'
})
export class DossierMedicalPatientComponent implements OnInit{
  dossier!: Observable<DossierMedical>;
  idPatient!: number;
  patient!: Observable<Patient>;
  consultation!: Observable<Array<Consultation>>;
  errorMessage!: string;

  constructor(private dossierService: DossierService,
              private patientService: PatientService,
              private consultationService: ConsultationService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;
    this.patient = this.patientService.getPatientById(this.idPatient);
    this.getDossier();
    this.getConsultation();
  }

  getDossier() {
    this.dossier = this.dossierService.getDossierByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getConsultation() {
    this.consultation = this.consultationService.getConsultationsByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
