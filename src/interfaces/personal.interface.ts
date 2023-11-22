export interface Personal {
    Nombres: string;
    Apellidos: string;
    TipoDocIdentidad: tipodoc;
    NumDeIdenti: string;
}

export enum tipodoc{ 
    DNI = "DNI",
    Carnet_Extranjeria = "Carnet Extranjeria"}

export const checkEnumTipoDoc = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "DNI" && 
    text.toLocaleLowerCase() != "Carnet Extranjeria") return false;
    return true;
}