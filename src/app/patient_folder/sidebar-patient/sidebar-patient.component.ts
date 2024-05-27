import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrl: './sidebar-patient.component.css'
})
export class SidebarPatientComponent {
  actions : Array<any> = [
    {title: "Dashboard", route:"/patient/dashboard", icon: "icon ni ni-presentation"},
    {title: "Rendez Vous", route:"/patient/1/rendezvous", icon: "icon bi bi-file-earmark-medical"},
    {title: "Dossier Medical", route:"/patient/1/dossier-medical", icon: "icon ni bi-clipboard2-pulse-fill"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
