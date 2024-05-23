import { Component, OnInit, Input } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-table-patients',
  templateUrl: './table-patients.component.html',
  styleUrls: ['./table-patients.component.css']
})
export class TablePatientsComponent implements OnInit {
  @Input() patients!: Observable<Array<Patient>>;
  updateForm!: FormGroup;
  selectedPatient!: Patient;

  constructor(private patientService: PatientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: this.fb.control(null),
      nom: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      dateNaissance: this.fb.control(null, [Validators.required]),
      adresse: this.fb.control(null, [Validators.required]),
      cni: this.fb.control(null, [Validators.required])
    });
  }

  handleDeletePatient(c: Patient) {
    let conf = confirm("Voulez-vous vraiment supprimer ce patient?");
    if (!conf) return;
    this.patientService.deletePatient(c.id).subscribe({
      next: (resp) => {
        this.getPatients();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getPatients() {
    this.patients = this.patientService.getPatients().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  handleUpdatePatient(c: Patient) {
    this.selectedPatient = c;
    this.updateForm.patchValue({
      id: c.id,
      nom: c.nom,
      prenom: c.prenom,
      dateNaissance: c.dateNaissance,
      adresse: c.adresse,
      cni: c.cni
    });

    let openModal = document.getElementById("openModal");
    if (openModal) {
      openModal.click();
    }
  }

  onUpdatePatient() {
    let patient: Patient = this.updateForm.value;
    this.patientService.updatePatient(patient.id, patient).subscribe(
      next => {
        alert("Patient a été modifié !");
        this.updateForm.reset();
        this.getPatients();
        // Close the modal
        let closeButton = document.getElementById("closeUpdateForm");
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
