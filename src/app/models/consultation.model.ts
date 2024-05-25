import {Medecin} from "./medecin.model";
import {DossierMedical} from "./dossier.model";

export interface Consultation {
  id : number;
  medecin : Medecin;
  description : string;
  dossierMedical : DossierMedical;
  date : Date;
  diagnostic : string;
  traitement : string;
  ordonnance : string;
  certificatMedical : string;
}
