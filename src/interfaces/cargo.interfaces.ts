export interface TipoCargo{
    TipoCargo: tipoCargo;
}

export enum tipoCargo{
    Vendedor = "vendedor",
    AdministradorDeVentas = "Administrador de Ventas",
    Caja = "Caja",
    Almacenero = "Almacenero"
}

export const checkEnumTipoCargo = (text: string): boolean => {
    if (text.toLocaleLowerCase() != "vendedor" && 
    text.toLocaleLowerCase() != "Administrador de Ventas" &&
    text.toLocaleLowerCase() != "Caja" &&
    text.toLocaleLowerCase() != "Almacenero") return false;
    return true;
}