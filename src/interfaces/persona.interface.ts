import { TipoCargo } from "./cargo.interfaces";
import { Usuario } from "./usuario.interfaces";

export interface Persona extends TipoCargo, Usuario {
    Nombres: string;
    Apellidos: string;
    TipoDocIdentidad: tipodoc;
    turno: number;
}

export enum tipodoc{ 
    DNI = "dni",
    Carnet_Extranjeria = "carnet extranjeria"}

export const checkEnumTipoDoc = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "dni" && 
    text.toLocaleLowerCase() != "carnet extranjeria") return false;
    return true;
}