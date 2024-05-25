import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RendezVous} from "../models/rendezvous.model";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http : HttpClient) { }

  public getRendezVousByMedecin(idMedecin : number):Observable<Array<RendezVous>>{
    return this.http.get<Array<RendezVous>>("http://localhost:8085/medecins/"+idMedecin+"/rendezvous")
  }
  /*public searchRendezVousByMedecin(idMedecin : number, keyword : string):Observable<Array<RendezVous>>{
    return this.http.get<Array<RendezVous>>("http://localhost:8085/medecins/"+idMedecin+"/rendezvous/search?searchTerm="+keyword)
  }*/
  public createRendezVous(rendezVous: RendezVous):Observable<RendezVous>{
    return this.http.post<RendezVous>("http://localhost:8085/rendezvous",rendezVous);
  }
  public deleteRendezVous(id: number){
    return this.http.delete("http://localhost:8085/rendezvous/"+id);
  }

  public updateRendezVous(id: number,rendezVous: RendezVous):Observable<RendezVous>{
    return this.http.put<RendezVous>("http://localhost:8085/rendezvous/"+id,rendezVous);
  }
}
