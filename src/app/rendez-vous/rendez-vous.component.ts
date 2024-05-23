import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {RendezVous} from "../models/rendezvous.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezVousService} from "../services/rendez-vous.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../models/status";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent implements OnInit {
  rendezvous!: Observable<Array<RendezVous>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  saveForm!: FormGroup;
  idMedecin!: number;
  statusList = Object.values(Status);

  constructor(private rendezVousService: RendezVousService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.idMedecin = this.route.snapshot.params['idMedecin'];
    this.idMedecin = +this.route.snapshot.paramMap.get('id')!;

    this.saveForm = this.fb.group({
      patient: this.fb.control(null, [Validators.required]),
      medecin: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      status: this.fb.control(Status.EN_ATTENTE, [Validators.required])
    });

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchRendezVous();
  }

  getRendezVous() {
    this.rendezvous = this.rendezVousService.getRendezVousByMedecin(this.idMedecin).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  handleSearchRendezVous() {
    let kw = this.searchFormGroup?.value.keyword;
    this.rendezvous = this.rendezVousService.searchRendezVousByMedecin(this.idMedecin, kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  onSaveRendezVous() {
    let rendezvous: RendezVous = this.saveForm.value;
    this.rendezVousService.createRendezVous(rendezvous).subscribe(
      next => {
        alert("RendezVous has been saved!");
        this.saveForm.reset();
        this.getRendezVous();
        let closeButton = document.getElementById("closeAjouterForm");
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
