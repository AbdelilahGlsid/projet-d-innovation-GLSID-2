import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../models/patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  public getPatients():Observable<Array<Patient>>{
    return this.http.get<Array<Patient>>("http://localhost:8085/patients")
  }
  public searchPatients(keyword : string):Observable<Array<Patient>>{
    return this.http.get<Array<Patient>>("http://localhost:8085/patients/search?searchTerm="+keyword)
  }
  public createPatient(patient: Patient):Observable<Patient>{
    return this.http.post<Patient>("http://localhost:8085/patients",patient);
  }
  public deletePatient(id: number){
    return this.http.delete("http://localhost:8085/patients/"+id);
  }
  public getPatientById(id: number):Observable<Patient> {
    return this.http.get<Patient>("http://localhost:8085/patients/"+id);
  }
  public updatePatient(id: number,patient: Patient):Observable<Patient>{
    return this.http.put<Patient>("http://localhost:8085/patients/"+id,patient);
  }
}
