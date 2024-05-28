import {Component, OnInit} from '@angular/core';
import {catchError, forkJoin, Observable, throwError} from "rxjs";
import {DossierMedical} from "../../models/dossier.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../models/patient.model";
import {DossierService} from "../../services/dossier.service";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinService} from "../../services/medecin.service";
import {Medecin} from "../../models/medecin.model";

@Component({
  selector: 'app-dossier-medical-medecin',
  templateUrl: './dossier-medical-medecin.component.html',
  styleUrl: './dossier-medical-medecin.component.css'
})
export class DossierMedicalMedecinComponent implements OnInit{
  dossier!: Observable<DossierMedical>;
  updateForm!: FormGroup;
  idPatient!: number;
  patient!: Observable<Patient>;
  constructor(private dossierService: DossierService,
              private patientService: PatientService,
              private medecinService: MedecinService,
              private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;
    this.patient = this.patientService.getPatientById(this.idPatient);

    this.updateForm=this.fb.group({
      id : this.fb.control(null),
      description : this.fb.control(null,[Validators.required])
    });

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

    this.updateForm.patchValue({
      id: c.id,
      description: c.description
    });

    let openModel = document.getElementById("openModal_dossier");
    if (openModel) {
      openModel.click();
    }
  }

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
            const closeButton = document.getElementById("closeUpdateForm_dossier");
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
