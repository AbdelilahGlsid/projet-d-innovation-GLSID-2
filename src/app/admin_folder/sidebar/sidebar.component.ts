import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  actions : Array<any> = [
    {title: "Medecins", route:"/admin/medecins", icon: "icon bi bi-capsule"},
    {title: "Patients", route:"/admin/patients", icon: "icon bi bi-person-heart"},
    {title: "Déconnexion", route:"/login", icon: "icon bi bi-box-arrow-left"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
