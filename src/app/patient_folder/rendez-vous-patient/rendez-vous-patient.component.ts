import {Component, OnInit} from '@angular/core';
import {catchError, forkJoin, Observable, throwError} from "rxjs";
import {RendezVous} from "../../models/rendezvous.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../models/medecin.model";
import {Status} from "../../models/status";
import {Patient} from "../../models/patient.model";
import {RendezVousService} from "../../services/rendez-vous.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {MedecinService} from "../../services/medecin.service";

@Component({
  selector: 'app-rendez-vous-patient',
  templateUrl: './rendez-vous-patient.component.html',
  styleUrl: './rendez-vous-patient.component.css'
})
export class RendezVousPatientComponent implements OnInit {
  rendezvous!: Observable<Array<RendezVous>>;
  errorMessage!: string;
  idPatient!: number;

  constructor(private rendezVousService: RendezVousService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;

    this.getRendezVous();
  }

  getRendezVous() {
    this.rendezvous = this.rendezVousService.getRendezVousByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
