import {Component, OnInit} from '@angular/core';
import {catchError, forkJoin, Observable, throwError} from "rxjs";
import {RendezVous} from "../../models/rendezvous.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezVousService} from "../../services/rendez-vous.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../models/status";
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../models/patient.model";
import {MedecinService} from "../../services/medecin.service";
import {Medecin} from "../../models/medecin.model";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent implements OnInit {
  rendezvous!: Observable<Array<RendezVous>>;
  errorMessage!: string;
  //searchFormGroup!: FormGroup;
  saveForm!: FormGroup;
  idMedecin!: number;
  medecin!: Observable<Medecin>;
  statusList = Object.values(Status);
  patients!: Observable<Array<Patient>>;

  constructor(private rendezVousService: RendezVousService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private patientService: PatientService,
              private medecinService: MedecinService) { }

  ngOnInit(): void {
    //this.idMedecin = this.route.snapshot.params['idMedecin'];
    this.idMedecin = +this.route.snapshot.paramMap.get('id')!;
    this.medecin = this.medecinService.getMedecinById(this.idMedecin);

    this.saveForm = this.fb.group({
      patient: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      status: this.fb.control(Status.EN_ATTENTE, [Validators.required])
    });
    this.getRendezVous();
    this.loadPatients();
  }

  loadPatients() {
    this.patients = this.patientService.getPatients();
  }

  getRendezVous() {
    this.rendezvous = this.rendezVousService.getRendezVousByMedecin(this.idMedecin).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  onSaveRendezVous() {
    const rendezvous: any = this.saveForm.value;
    const patientId = rendezvous.patient;

    const patient$ = this.patientService.getPatientById(patientId);

    forkJoin([patient$, this.medecin]).subscribe(
      ([patient, medecin]) => {
        rendezvous.patient = patient;
        rendezvous.medecin = medecin;

        this.rendezVousService.createRendezVous(rendezvous).subscribe(
          () => {
            alert("Rendez-vous has been saved!");
            this.saveForm.reset();
            this.getRendezVous();
            const closeButton = document.getElementById("closeAjouterForm");
            if (closeButton) {
              closeButton.click();
            }
          },
          err => {
            console.error(err);
            this.errorMessage = 'Failed to save the appointment';
          }
        );
      },
      err => {
        console.error(err);
        this.errorMessage = 'Failed to fetch patient or doctor details';
      }
    );
  }
}
