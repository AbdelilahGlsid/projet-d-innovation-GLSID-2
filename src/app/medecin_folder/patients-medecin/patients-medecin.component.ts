import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Patient} from "../../models/patient.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patients-medecin',
  templateUrl: './patients-medecin.component.html',
  styleUrl: './patients-medecin.component.css'
})
export class PatientsMedecinComponent implements OnInit {
  patients!: Observable<Array<Patient>>;
  errorMessage!: string;
  idMedecin!:number;

  constructor(private patientService: PatientService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMedecin = +this.route.snapshot.paramMap.get('idMed')!;
    console.log(this.idMedecin)
    this.getPatients();
  }

  getPatients() {
    this.patients = this.patientService.getPatients().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }
}
