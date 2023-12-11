import { Asistencia } from "./asistencia.interfaces";
import { Faltas } from "./faltas.interfaces";
import { Tardanza } from "./tardanza.interfaces";

export interface ControlHorarios extends Tardanza, Faltas, Asistencia{
    NumDoc: number;
}