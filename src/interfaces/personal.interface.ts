export interface Personal {
    Nombres: string;
    Apellidos: string;
    TipoDocIdentidad: tipodoc;
    NumDoc: number;
}

export enum tipodoc{ 
    DNI = "dni",
    Carnet_Extranjeria = "carnet extranjeria"}

export const checkEnumTipoDoc = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "dni" && 
    text.toLocaleLowerCase() != "carnet extranjeria") return false;
    return true;
}