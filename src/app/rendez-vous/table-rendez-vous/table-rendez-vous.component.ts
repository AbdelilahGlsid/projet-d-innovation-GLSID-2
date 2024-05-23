import {Component, Input, OnInit} from '@angular/core';
import {RendezVous} from "../../models/rendezvous.model";
import {catchError, Observable, throwError} from "rxjs";
import {RendezVousService} from "../../services/rendez-vous.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";

@Component({
  selector: 'app-table-rendez-vous',
  templateUrl: './table-rendez-vous.component.html',
  styleUrl: './table-rendez-vous.component.css'
})
export class TableRendezVousComponent implements OnInit {
  @Input() rendezvous!: Observable<Array<RendezVous>>;
  updateForm!: FormGroup;
  selectedRendezVous!: RendezVous;
  statusList = Object.values(Status);

  constructor(private rendezVousService: RendezVousService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: this.fb.control(null),
      patient: this.fb.control(null, [Validators.required]),
      medecin: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required])
    });
  }

  handleDeleteRendezVous(rdv: RendezVous) {
    let conf = confirm("Voulez-vous vraiment supprimer ce RendezVous?");
    if (!conf) return;
    this.rendezVousService.deleteRendezVous(rdv.id).subscribe({
      next: (resp) => {
        this.getRendezVous();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getRendezVous() {
    this.rendezvous = this.rendezVousService.getRendezVousByMedecin(this.selectedRendezVous.medecin.id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  handleUpdateRendezVous(rdv: RendezVous) {
    this.selectedRendezVous = rdv;
    this.updateForm.patchValue({
      id: rdv.id,
      patient: rdv.patient.nom,
      medecin: rdv.medecin.nom,
      date: rdv.date,
      status: rdv.status
    });

    let openModel = document.getElementById("openModal");
    if (openModel) {
      openModel.click();
    }
  }

  onUpdateRendezVous() {
    let updatedRendezVous: RendezVous = this.updateForm.value;
    this.rendezVousService.updateRendezVous(updatedRendezVous.id, updatedRendezVous).subscribe(
      next => {
        alert("RendezVous a été modifié !");
        this.updateForm.reset();
        this.getRendezVous();
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
