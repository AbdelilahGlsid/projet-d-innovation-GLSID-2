import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DossierMedical} from "../models/dossier.model";

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private http : HttpClient) { }

  public getDossierByPatient(id: number):Observable<DossierMedical>{
    return this.http.get<DossierMedical>("http://localhost:8085/patients/"+id+"/dossier-medical")
  }
  public getDossierById(id: number):Observable<DossierMedical>{
    return this.http.get<DossierMedical>("http://localhost:8085/dossiers-medicaux/"+id);
  }

  public updateDossier(id: number,dossier: DossierMedical):Observable<DossierMedical>{
    return this.http.put<DossierMedical>("http://localhost:8085/dossiers-medicaux/"+id,dossier);
  }
}
