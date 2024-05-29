import {Component, Input, OnInit, Output} from '@angular/core';
import {RendezVousService} from "../../services/rendez-vous.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-patient-content',
  templateUrl: './patient-content.component.html',
  styleUrl: './patient-content.component.css'
})
export class PatientContentComponent implements OnInit{
  idPatient!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idPatient = +this.route.snapshot.paramMap.get('id')!;
  }

}
