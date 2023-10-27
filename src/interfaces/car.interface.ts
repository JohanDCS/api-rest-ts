export interface car {
    color: string;
    conbustible: tipogas;
    año: number;
    descripcion: string;
    price: number;
}

export enum tipogas{ 
    gasolina  = "gasolina" ,
    electrico = "electrico" }

export const checkEnumTipoGas = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "gasolina" && 
    text.toLocaleLowerCase() != "electrico") return false;
    return true;
}