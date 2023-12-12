import { AppDataSource } from "../app.config";
import { ControlHorarios } from "../interfaces/controlAsistencia.interfaces";
import { AsistenciaDB } from "../models/asistencia";
import { ControlAsistenciaGeneralDB } from "../models/controlAsistencia";
import { FaltasDB } from "../models/faltas";
import { TardanzaDB } from "../models/tardanza";
import { UsuarioDB } from "../models/usuario";
import { convertirHoraACadena24, horaformat, restarHoras } from "../utils/date.handle";


class ControlService{
    private static instance: ControlService
    public static getInstance(): ControlService{
        if(!ControlService.instance){
            this.instance = new ControlService(); 
        }
        return this.instance;
    }

    async insertControl({NumDoc, Fechaasistencia, Fechafaltas, Fechatardanza}: ControlHorarios){
        const checkUser = await AppDataSource.getRepository(UsuarioDB).findOne({
            where: {
                NumDoc: NumDoc
            },
            relations: {
                persona: {
                    turno: {
                        horario: true,  
                    }
                }
            }
        })
        if(!checkUser) throw new Error('Este trabajador no existe');
        
        const newAsistencia = new AsistenciaDB();
        const newTardanza = new TardanzaDB();
        const newFalta = new FaltasDB();
        
        const turnoInicio = checkUser.persona.turno.horario.horaInicio.split(' ')[0];

        const turnoFin = checkUser.persona.turno.horario.horaFinal.split(' ')[0];

        const horaActual = horaformat();
        console.log(turnoInicio,turnoFin,horaActual)
        if(horaActual > turnoInicio && horaActual < turnoFin) {
            
            newAsistencia.fecha = Fechaasistencia;
            newAsistencia.state = true;

            await AppDataSource.getRepository(AsistenciaDB).save(newAsistencia);

            if(turnoInicio < horaActual) {
                const tardanza = restarHoras(horaActual, turnoInicio) 
                console.log(tardanza);
                newTardanza.fecha = Fechatardanza;
                newTardanza.tiempoTardanza = tardanza;
                await AppDataSource.getRepository(TardanzaDB).save(newTardanza);
            }

        }else if(turnoFin < horaActual) {
            newFalta.fecha = Fechafaltas;
            await AppDataSource.getRepository(FaltasDB).save(newFalta);
        }
        const newControl = new ControlAsistenciaGeneralDB();
        newControl.asistencia = [newAsistencia];
        newControl.faltas = [newFalta];
        newControl.tardanza = [newTardanza];

        const response = await AppDataSource.getRepository(ControlAsistenciaGeneralDB).save(newControl); 
        return response;
    }
    async mostrarAsistencia(){
        const response = await AppDataSource.getRepository(ControlAsistenciaGeneralDB).find({
            relations:{
                asistencia: true,
                usuario: true
            }
        })
        return response;
    }
}

export const controlService = ControlService.getInstance();