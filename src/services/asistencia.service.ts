import { AppDataSource } from "../app.config";
import { Asistencia } from "../interfaces/asistencia.interfaces";
import { AsistenciaDB } from "../models/asistencia";
import { ControlAsistenciaGeneralDB } from "../models/controlAsistencia";

class AsistenciaService{
    private static instance: AsistenciaService;
    public static getInstance(): AsistenciaService{
        if(!AsistenciaService.instance){
            this.instance = new AsistenciaService();
        }
        return this.instance;
    }

    async insertAsistencia({Fechaasistencia}: Asistencia){
        const newAsistencia = new AsistenciaDB();
        newAsistencia.fecha = Fechaasistencia;

        const response = await AppDataSource.getRepository(AsistenciaDB).save(newAsistencia)
        return response;
    }
}


export const asistenciaService = AsistenciaService.getInstance();