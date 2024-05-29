import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-header-patient',
  templateUrl: './main-header-patient.component.html',
  styleUrl: './main-header-patient.component.css'
})
export class MainHeaderPatientComponent implements OnInit{
  patientId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
  }
}
