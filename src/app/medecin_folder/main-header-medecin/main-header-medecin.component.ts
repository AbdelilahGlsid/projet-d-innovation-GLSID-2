import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-header-medecin',
  templateUrl: './main-header-medecin.component.html',
  styleUrl: './main-header-medecin.component.css'
})
export class MainHeaderMedecinComponent implements OnInit{
  idMedecin!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idMedecin = +this.route.snapshot.paramMap.get('idMed')!;
  }
}
