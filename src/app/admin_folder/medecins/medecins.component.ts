import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Medecin } from '../../models/medecin.model';
import { MedecinService } from '../../services/medecin.service';
import { Router } from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  medecins!: Observable<Array<Medecin>>;
  errorMessage!: string;
  saveForm!: FormGroup;

  constructor(private medecinService: MedecinService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.saveForm=this.fb.group({
      nom : this.fb.control(null, [Validators.required]),
      specialite : this.fb.control(null,[Validators.required])
    });

    this.getMedecins();
  }

  getMedecins() {
    this.medecins = this.medecinService.getMedecins().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  onSaveMedecin() {
    let medecin:Medecin = this.saveForm.value;
    this.medecinService.createMedecin(medecin).subscribe(
      next =>{
      alert("Médecin a été enregistrer !");
      this.saveForm.reset();
      this.getMedecins();
      // Close the modal
        let closeButton = document.getElementById("closeAjouterForm");
        if (closeButton) {
          closeButton.click();
        }
    },
      err => {
      console.log(err);
    });
  }
}
