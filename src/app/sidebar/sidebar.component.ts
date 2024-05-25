import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  actions : Array<any> = [
    {title: "Dashboard", "route":"/dashboard", icon: "icon ni ni-presentation"},
    {title: "Medecins", "route":"/medecins", icon: "icon ni ni-presentation"},
    {title: "Patients", "route":"/patients", icon: "icon ni ni-presentation"},
    //{title: "RendezVous", "route":"/rendezVous", icon: "search"},
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
