import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrl: './sidebar-patient.component.css'
})
export class SidebarPatientComponent implements OnInit {
  actions: Array<any> = [];
  currentAction: any;
  patientId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.setupActions();
  }

  setupActions() {
    if (this.patientId && this.patientId!=0) {
      this.actions = [
        { title: 'Rendez Vous', route: `/patient/${this.patientId}/rendezvous`, icon: 'icon bi bi-file-earmark-medical' },
        { title: 'Dossier Medical', route: `/patient/${this.patientId}/dossier-medical`, icon: 'icon bi bi-clipboard2-pulse-fill' },
        {title: "Déconnexion", route:"/login", icon: "icon bi bi-box-arrow-left"}
      ];
    }
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
