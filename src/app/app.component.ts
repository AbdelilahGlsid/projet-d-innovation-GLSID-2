import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PI';

  actions : Array<any> = [
    {title: "Dashboard", "route":"/dashboard", icon: "house"},
    {title: "Medecins", "route":"/medecins", icon: "search"},
    {title: "New Medecin", "route":"/new-medecin", icon: "safe"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
