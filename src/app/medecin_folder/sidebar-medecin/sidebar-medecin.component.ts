import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-medecin',
  templateUrl: './sidebar-medecin.component.html',
  styleUrl: './sidebar-medecin.component.css'
})
export class SidebarMedecinComponent {
  actions : Array<any> = [
    {title: "Dashboard", route:"/medecin/dashboard", icon: "icon ni ni-presentation"},
    {title: "Patients", route:"/medecin/1/patients", icon: "icon bi bi-person-heart"},
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
