import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> = [
    {title: "Dashboard", "route":"/dashboard", icon: "house"},
    {title: "Medecins", "route":"/medecins", icon: "search"},
    {title: "Patients", "route":"/patients", icon: "search"},
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
