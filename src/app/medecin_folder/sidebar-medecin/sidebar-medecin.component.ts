import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar-medecin',
  templateUrl: './sidebar-medecin.component.html',
  styleUrl: './sidebar-medecin.component.css'
})
export class SidebarMedecinComponent  implements OnInit {
  actions: Array<any> = [];
  currentAction: any;
  medecinId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medecinId = +this.route.snapshot.paramMap.get('idMed')!;
    this.setupActions();
  }

  setupActions() {
    if (this.medecinId) {
      this.actions = [
        // { title: "Dashboard", route: `/medecin/${this.medecinId}/dashboard`, icon: "icon ni ni-presentation" },
        { title: "Patients", route: `/medecin/${this.medecinId}/patients`, icon: "icon bi bi-person-heart" },
        {title: "Déconnexion", route:"/login", icon: "icon bi bi-box-arrow-left"}

      ];
    }
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
