import {Component, Input, OnInit} from '@angular/core';
import {catchError, forkJoin, Observable, throwError} from "rxjs";
import {DossierMedical} from "../../models/dossier.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DossierService} from "../../services/dossier.service";
import {Patient} from "../../models/patient.model";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrl: './dossier-medical.component.css'
})
export class DossierMedicalComponent implements OnInit{
  dossier!: Observable<DossierMedical>;
  updateForm!: FormGroup;
  idPatient!: number;
  patient!: Observable<Patient>
  constructor(private dossierService: DossierService,
              private patientService: PatientService,
              private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;
    this.patient = this.patientService.getPatientById(this.idPatient);
    this.getDossier();
  }

  getDossier() {
    this.dossier = this.dossierService.getDossierByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  handleUpdateDossier(c: DossierMedical) {
    let openModel = document.getElementById("openModal");
    if (openModel) {
      openModel.click();
    }
  }

  /*onUpdateDossier() {
    let dossier: DossierMedical = this.updateForm.value;
    this.dossierService.updateDossier(dossier.id,dossier).subscribe(
      next =>{
        alert("Dossier a été modifier !");
        this.updateForm.reset();
        this.getDossier();
        // Close the modal
        let closeButton = document.getElementById("closeUpdateForm");
        if (closeButton) {
          closeButton.click();
        }
      },
      err => {
        console.log(err);
      });
  }*/
  onUpdateDossier() {
    const dossier: any = this.updateForm.value;

    forkJoin([this.patient]).subscribe(
      ([patient]) => {
        dossier.patient = patient;

        this.dossierService.updateDossier(dossier.id, dossier).subscribe(
          () => {
            alert("Dossier Medical has been updated!");
            this.updateForm.reset();
            this.getDossier();
            const closeButton = document.getElementById("closeUpdateForm");
            if (closeButton) {
              closeButton.click();
            }
          },
          err => {
            console.error(err);
          }
        );
      }
    );
  }


}
