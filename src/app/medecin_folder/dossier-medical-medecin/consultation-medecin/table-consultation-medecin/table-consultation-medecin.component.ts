import {Component, Input, OnInit} from '@angular/core';
import {catchError, forkJoin, map, Observable, throwError} from "rxjs";
import {Consultation} from "../../../../models/consultation.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../../../models/medecin.model";
import {DossierMedical} from "../../../../models/dossier.model";
import {ConsultationService} from "../../../../services/consultation.service";
import {MedecinService} from "../../../../services/medecin.service";
import {DossierService} from "../../../../services/dossier.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-consultation-medecin',
  templateUrl: './table-consultation-medecin.component.html',
  styleUrl: './table-consultation-medecin.component.css'
})
export class TableConsultationMedecinComponent implements OnInit{
  @Input() consultation!: Observable<Array<Consultation>>;
  //@Input() dossier!: Observable<DossierMedical>;
  updateForm!: FormGroup;
  selectedConsultation!: Consultation;
  errorMessage!: string;
  idPatient!: number;
  dossier!: Observable<DossierMedical>;

  idMedecin!: number;
  medecin!: Observable<Medecin>;
  selectedFile!: File;

  constructor(
    private consultationService: ConsultationService,
    private medecinService: MedecinService,
    private dossierService: DossierService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;
    //this.medecin = this.medecinService.getMedecinById(this.idPatient);
    this.idMedecin = +this.route.snapshot.paramMap.get('idMed')!;
    this.medecin = this.medecinService.getMedecinById(this.idMedecin);

    this.initForms();
    this.getConsultation();
    this.getDossier();
  }

  getDossier() {
    this.dossier = this.dossierService.getDossierByPatient(this.idPatient).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  initForms() {
    this.updateForm = this.fb.group({
      id: this.fb.control(null),
      date: this.fb.control(null, [Validators.required]),
      diagnostic: this.fb.control(null, [Validators.required]),
      traitement: this.fb.control(null, [Validators.required]),
      ordonnance: this.fb.control(null, [Validators.required]),
      certificatMedical: this.fb.control(null, [Validators.required])
    });
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

  handleDeleteConsultation(c: Consultation) {
    let conf = confirm("Voulez-vous vraiment supprimer ce Consultation?");
    if (!conf) return;
    this.consultationService.deleteConsultation(c.id).subscribe({
      next: (resp) => {
        this.getConsultation();
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Failed to delete the appointment';
      }
    });
  }

  handleUpdateConsultation(c: Consultation) {
    this.selectedConsultation = c;
    this.updateForm.patchValue({
      id: c.id,
      date: c.date,
      diagnostic: c.diagnostic,
      traitement: c.traitement,
      ordonnance: c.ordonnance,
      certificatMedical: c.certificatMedical
    });

    let openModel = document.getElementById('openModal');
    if (openModel) {
      openModel.click();
    }
  }

  onUpdateConsultation() {
    const consultation: any = this.updateForm.value;

    forkJoin([this.medecin , this.dossier]).subscribe(
      ([medecin, dossier]) => {
        consultation.medecin = medecin;
        consultation.dossierMedical = dossier;

        this.consultationService.updateConsultation(consultation.id, consultation).subscribe(
          () => {
            alert("Consultation has been updated!");
            this.updateForm.reset();
            this.getConsultation();
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
        this.errorMessage = 'Failed to fetch doctor details';
      }
    );
  }

}
