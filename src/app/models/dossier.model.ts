import {Patient} from "./patient.model";

export interface DossierMedical {
  id : number;
  patient : Patient;
  description : string;
}
