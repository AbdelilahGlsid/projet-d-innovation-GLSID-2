import {Component, Input, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Medecin} from "../../models/medecin.model";
import {MedecinService} from "../../services/medecin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-medecins',
  templateUrl: './table-medecins.component.html',
  styleUrl: './table-medecins.component.css'
})
export class TableMedecinsComponent implements OnInit {
  @Input() medecins!: Observable<Array<Medecin>>;
  updateForm!: FormGroup;
  selectedMedecin!: Medecin;

  constructor(private medecinService: MedecinService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm=this.fb.group({
      id : this.fb.control(null),
      nom : this.fb.control(null, [Validators.required]),
      specialite : this.fb.control(null,[Validators.required])
    });
  }

  handleDeleteMedecin(c: Medecin) {
    let conf = confirm("Voulez vous vraiment supprimer ce Medecin?");
    if (!conf) return;
    this.medecinService.deleteMedecin(c.id).subscribe({
      next: (resp) => {
        this.getMedecins()
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getMedecins() {
    this.medecins = this.medecinService.getMedecins().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  handleUpdateMedecin(c: Medecin) {
    this.selectedMedecin = c;
    this.updateForm.patchValue({
      id: c.id,
      nom: c.nom,
      specialite: c.specialite
    });

    let openModel = document.getElementById("openModal");
    if (openModel) {
      openModel.click();
    }
  }

  onUpdateMedecin() {
    let medecin:Medecin = this.updateForm.value;
    this.medecinService.updateMedecin(medecin.id,medecin).subscribe(
      next =>{
        alert("Médecin a été modifier !");
        this.updateForm.reset();
        this.getMedecins();
        // Close the modal
        let closeButton = document.getElementById("closeUpdateForm");
        if (closeButton) {
          closeButton.click();
        }
      },
      err => {
        console.log(err);
      });
  }
}
