import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Consultation} from "../models/consultation.model";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http : HttpClient) { }

  public getConsultations():Observable<Array<Consultation>>{
    return this.http.get<Array<Consultation>>("http://localhost:8085/consultations")
  }
  public getConsultationsByPatient(id: number):Observable<Array<Consultation>>{
    return this.http.get<Array<Consultation>>("http://localhost:8085/patients/"+id+"/consultations")
  }
  public getConsultationById(id: number):Observable<Consultation>{
    return this.http.get<Consultation>("http://localhost:8085/consultations/"+id);
  }
  public createConsultation(consultation: Consultation):Observable<Consultation>{
    return this.http.post<Consultation>("http://localhost:8085/consultations",consultation);
  }
  public deleteConsultation(id: number){
    return this.http.delete("http://localhost:8085/consultations/"+id);
  }
  public updateConsultation(id: number,consultation: Consultation):Observable<Consultation>{
    return this.http.put<Consultation>("http://localhost:8085/consultations/"+id,consultation);
  }
}
