import {Component, Input, OnInit} from '@angular/core';
import {catchError, forkJoin, map, Observable, throwError} from "rxjs";
import {DossierMedical} from "../../../models/dossier.model";
import {Consultation} from "../../../models/consultation.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../../models/medecin.model";
import {ConsultationService} from "../../../services/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinService} from "../../../services/medecin.service";

@Component({
  selector: 'app-consultation-medecin',
  templateUrl: './consultation-medecin.component.html',
  styleUrl: './consultation-medecin.component.css'
})
export class ConsultationMedecinComponent implements OnInit{
  @Input() dossier!: Observable<DossierMedical>
  consultation!: Observable<Array<Consultation>>;
  errorMessage!: string;
  saveForm!: FormGroup;
  idPatient!: number;
  idMedecin!: number;
  medecin!: Observable<Medecin>;

  constructor(private consultationService: ConsultationService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private medecinService: MedecinService) { }

  ngOnInit(): void {
    //this.idPatient = this.route.snapshot.params['idPatient'];
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;

    this.idMedecin = +this.route.snapshot.paramMap.get('idMed')!;
    this.medecin = this.medecinService.getMedecinById(this.idMedecin);

    this.saveForm = this.fb.group({
      date: this.fb.control([Validators.required]),
      diagnostic: this.fb.control(null, [Validators.required]),
      traitement: this.fb.control(null, [Validators.required]),
      ordonnance: this.fb.control(null, [Validators.required]),
      certificatMedical: this.fb.control(null, [Validators.required]),
    });

    this.getConsultation();
  }

  getConsultation() {
    this.consultation = this.consultationService.getConsultationsByPatient(this.idPatient).pipe(
      map(consultations => consultations.filter(consultation => consultation.medecin.id === this.idMedecin)),
      catchError(err => {
        this.errorMessage = 'Failed to load appointments';
        return throwError(err);
      })
    );
  }

  onSaveConsultation() {
    const consultation: any = this.saveForm.value;

    const medecin$ = this.medecinService.getMedecinById(this.idMedecin);

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
