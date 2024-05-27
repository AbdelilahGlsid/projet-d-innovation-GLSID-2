import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  actions : Array<any> = [
    {title: "Dashboard", route:"/admin/dashboard", icon: "icon ni ni-presentation"},
    {title: "Medecins", route:"/admin/medecins", icon: "icon bi bi-capsule"},
    {title: "Patients", route:"/admin/patients", icon: "icon bi bi-person-heart"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
