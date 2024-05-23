import {Patient} from "./patient.model";
import {Medecin} from "./medecin.model";
import {Status} from "./status";

export interface RendezVous {
  id: number;
  patient: Patient;
  medecin: Medecin;
  date: Date;
  status: Status;
}
