import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Medecin} from "../models/medecin.model";
import {Patient} from "../models/patient.model";
import {AuthService} from "../services/auth.service";
import {PatientService} from "../services/patient.service";
import {MedecinService} from "../services/medecin.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  medecins!: Observable<Array<Medecin>>;
  patients!: Observable<Array<Patient>>;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private patientService: PatientService,
    private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.getMedecins();
    this.getPatients();
  }

  getMedecins() {
    this.medecins = this.medecinService.getMedecins().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getPatients() {
    this.patients = this.patientService.getPatients().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /*handleLogin() {
    const { username, password, role } = this.formLogin.value;
    const hardcodedUsers = [
      { username: 'admin', password: 'admin', role: 'admin' },
      { username: 'medecin', password: 'medecin', role: 'medecin' },
      { username: 'patient', password: 'patient', role: 'patient' }
    ];

    const user = hardcodedUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      this.router.navigate([`/${role}`]);
    } else {
      this.loginError = 'Invalid username, password, or role';
    }
  }*/

  handleLogin() {
    const { username, password, role } = this.formLogin.value;

    if (role === 'medecin') {
      this.medecins.subscribe(medecins => {
        const user = medecins.find(u => u.nom === username && u.nom === password);
        if (user) {
          this.router.navigate([`/${role}/${user.id}/patients`]);
        } else {
          this.loginError = 'Invalid username, password, or role';
        }
      });
    } else if (role === 'patient') {
      this.patients.subscribe(patients => {
        const user = patients.find(u => u.nom === username && u.nom === password);
        if (user) {
          this.router.navigate([`/${role}/${user.id}/rendezvous`]);
        } else {
          this.loginError = 'Invalid username, password, or role';
        }
      });
    } else if (role === 'admin') {
      const user = { username: 'admin', password: 'admin', role: 'admin' };
      if (username === 'admin' && password === 'admin') {
        this.router.navigate([`/${role}/medecins`]);
      } else {
        this.loginError = 'Invalid username, password, or role';
      }
    } else {
      this.loginError = 'Invalid role selected';
    }
  }

}



/*handleLogin() {
  let username = this.formLogin.value.username;
  let pwd = this.formLogin.value.password;
  this.authService. login(username, pwd).subscribe({
    next: data => {
      console.log(data)
      this.authService.loadProfile(data);
      this.router.navigateByUrl("/admin");
    },
      error : err => {
        console.log(err);
    }
  })
}*/

