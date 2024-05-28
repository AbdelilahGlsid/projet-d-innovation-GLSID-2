import {Component, Input, OnInit} from '@angular/core';
import {catchError, forkJoin, Observable, throwError} from "rxjs";
import {Consultation} from "../../../models/consultation.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../../models/medecin.model";
import {Status} from "../../../models/status";
import {Patient} from "../../../models/patient.model";
import {ConsultationService} from "../../../services/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../services/patient.service";
import {MedecinService} from "../../../services/medecin.service";
import {DossierMedical} from "../../../models/dossier.model";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent implements OnInit{
  @Input() dossier!: Observable<DossierMedical>
  consultation!: Observable<Array<Consultation>>;
  errorMessage!: string;
  saveForm!: FormGroup;
  idPatient!: number;
  medecins!: Observable<Array<Medecin>>;

  constructor(private consultationService: ConsultationService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private medecinService: MedecinService) { }

  ngOnInit(): void {
    //this.idPatient = this.route.snapshot.params['idPatient'];
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;

    this.saveForm = this.fb.group({
      medecin: this.fb.control(null, [Validators.required]),
      date: this.fb.control([Validators.required]),
      diagnostic: this.fb.control(null, [Validators.required]),
      traitement: this.fb.control(null, [Validators.required]),
      ordonnance: this.fb.control(null, [Validators.required]),
      certificatMedical: this.fb.control(null, [Validators.required]),
    });

    this.getConsultation();
    this.loadMedecins();
  }

  loadMedecins() {
    this.medecins = this.medecinService.getMedecins();
  }

  getConsultation() {
    this.consultation = this.consultationService.getConsultationsByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  onSaveConsultation() {
    const consultation: any = this.saveForm.value;
    const medecinId = consultation.medecin;

    const medecin$ = this.medecinService.getMedecinById(medecinId);

    forkJoin([medecin$, this.dossier]).subscribe(
      ([medecin,dossier]) => {
        consultation.medecin = medecin;
        consultation.dossierMedical = dossier;

        this.consultationService.createConsultation(consultation).subscribe(
          () => {
            alert("Consultation has been saved!");
            this.saveForm.reset();
            this.getConsultation();
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
