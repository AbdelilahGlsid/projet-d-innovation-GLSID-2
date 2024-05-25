import { Component, Input, OnInit } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RendezVousService } from "../../services/rendez-vous.service";
import { PatientService } from "../../services/patient.service";
import { MedecinService } from "../../services/medecin.service";
import { RendezVous } from "../../models/rendezvous.model";
import { Status } from "../../models/status";
import { Patient } from "../../models/patient.model";
import { Medecin } from "../../models/medecin.model";

@Component({
  selector: 'app-table-rendez-vous',
  templateUrl: './table-rendez-vous.component.html',
  styleUrls: ['./table-rendez-vous.component.css'] // Corrected here
})
export class TableRendezVousComponent implements OnInit {
  @Input() rendezvous!: Observable<Array<RendezVous>>;
  updateForm!: FormGroup;
  selectedRendezVous!: RendezVous;
  errorMessage!: string;
  statusList = Object.values(Status);
  idMedecin!: number;
  patients!: Observable<Array<Patient>>;
  medecin!: Observable<Medecin>;

  constructor(
    private rendezVousService: RendezVousService,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idMedecin = +this.route.snapshot.paramMap.get('id')!;
    this.medecin = this.medecinService.getMedecinById(this.idMedecin);
    this.initForms();
    this.loadPatients();
  }

  initForms() {
    this.updateForm = this.fb.group({
      id: this.fb.control(null),
      patient: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required])
    });
  }

  loadPatients() {
    this.patients = this.patientService.getPatients();
  }

  getRendezVous() {
    this.rendezvous = this.rendezVousService.getRendezVousByMedecin(this.idMedecin).pipe(
      catchError(err => {
        this.errorMessage = 'Failed to load appointments';
        return throwError(err);
      })
    );
  }

  handleDeleteRendezVous(rdv: RendezVous) {
    let conf = confirm("Voulez-vous vraiment supprimer ce RendezVous?");
    if (!conf) return;
    this.rendezVousService.deleteRendezVous(rdv.id).subscribe({
      next: (resp) => {
        this.getRendezVous();
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Failed to delete the appointment';
      }
    });
  }

  handleUpdateRendezVous(rdv: RendezVous) {
    this.selectedRendezVous = rdv;
    this.updateForm.patchValue({
      id: rdv.id,
      patient: rdv.patient.id,
      date: rdv.date,
      status: rdv.status
    });

    let openModel = document.getElementById('openModal');
    if (openModel) {
      openModel.click();
    }
  }

  onUpdateRendezVous() {
    const rendezvous: any = this.updateForm.value;
    const patientId = rendezvous.patient;

    const patient$ = this.patientService.getPatientById(patientId);

    forkJoin([patient$, this.medecin]).subscribe(
      ([patient, medecin]) => {
        rendezvous.patient = patient;
        rendezvous.medecin = medecin;

        this.rendezVousService.createRendezVous(rendezvous).subscribe(
          () => {
            alert("Rendez-vous has been updated!");
            this.updateForm.reset();
            this.getRendezVous();
            const closeButton = document.getElementById("closeUpdateForm");
            if (closeButton) {
              closeButton.click();
            }
          },
          err => {
            console.error(err);
            this.errorMessage = 'Failed to update the appointment';
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
