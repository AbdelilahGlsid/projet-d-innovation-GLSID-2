import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medecin} from "../models/medecin.model";

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private http : HttpClient) { }

  public getMedecins():Observable<Array<Medecin>>{
    return this.http.get<Array<Medecin>>("http://localhost:8085/medecins")
  }
  public getMedecinById(id: number):Observable<Medecin>{
    return this.http.get<Medecin>("http://localhost:8085/medecins/"+id);
  }
  public createMedecin(medecin: Medecin):Observable<Medecin>{
    return this.http.post<Medecin>("http://localhost:8085/medecins",medecin);
  }
  public deleteMedecin(id: number){
    return this.http.delete("http://localhost:8085/medecins/"+id);
  }
  public updateMedecin(id: number,medecin: Medecin):Observable<Medecin>{
    return this.http.put<Medecin>("http://localhost:8085/medecins/"+id,medecin);
  }

}
