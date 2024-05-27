import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients!: Observable<Array<Patient>>;
  errorMessage!: string;
  //searchFormGroup: FormGroup | undefined;
  saveForm!: FormGroup;

  constructor(private patientService: PatientService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.saveForm = this.fb.group({
      nom: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      dateNaissance: this.fb.control(null, [Validators.required]),
      adresse: this.fb.control(null, [Validators.required]),
      cni: this.fb.control(null, [Validators.required])
    });

    /*this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });*/

    //this.handleSearchPatients();
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

  /*handleSearchPatients() {
    let kw = this.searchFormGroup?.value.keyword;
    this.patients = this.patientService.searchPatients(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }*/

  onSavePatient() {
    let patient: Patient = this.saveForm.value;
    this.patientService.createPatient(patient).subscribe(
      next => {
        alert("Patient a été enregistré !");
        this.saveForm.reset();
        this.getPatients();
        // Close the modal
        let closeButton = document.getElementById("closeAjouterForm");
        if (closeButton) {
          closeButton.click();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
