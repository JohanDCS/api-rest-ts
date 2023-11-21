export interface Personal {
    Nombres: string;
    Apellidos: number;
    TipoDocIdentidad: tipodoc;
    NumDeIdenti: string;
}

export enum tipodoc{ 
    DNI,
    Carnet_Extranjeria}

export const checkEnumTipoGas = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "DNI" && 
    text.toLocaleLowerCase() != "Carnet_Extranjeria") return false;
    return true;
}