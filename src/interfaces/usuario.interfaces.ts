import { Auth } from "./auth.interface";

export interface Usuario extends Auth{
    TipoUsuario: tipoUser;
}

export enum tipoUser{
    Usuario = "Usuario",
    Administrador = "Administador"
}

export const checkEnumTipoUser = (text: string):boolean => {
    if (text.toLocaleLowerCase() != "Trabajador" &&
    text.toLocaleLowerCase() != "Administrador") return false;
    return true;
}