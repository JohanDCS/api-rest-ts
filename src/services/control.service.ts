import { AppDataSource } from "../app.config";
import { ControlHorarios } from "../interfaces/controlAsistencia.interfaces";
import { AsistenciaDB } from "../models/asistencia";
import { ControlAsistenciaGeneralDB } from "../models/controlAsistencia";
import { FaltasDB } from "../models/faltas";
import { HorarioDB } from "../models/horarios";
import { TardanzaDB } from "../models/tardanza";
import { UsuarioDB } from "../models/usuario";
import { FechaFormat, horaformat, restarHoras } from "../utils/date.handle";


class ControlService{
    private static instance: ControlService
    public static getInstance(): ControlService{
        if(!ControlService.instance){
            this.instance = new ControlService(); 
        }
        return this.instance;
    }

    async insertControl({NumDoc, Fecha}: ControlHorarios){
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
        console.log(Fecha)
        
        const newAsistencia = new AsistenciaDB();
        const newTardanza = new TardanzaDB();
        const newFalta = new FaltasDB();
        
        const turnoInicio = checkUser.persona.turno.horario.horaInicio.split(' ')[0];
        const turnoFin = checkUser.persona.turno.horario.horaFinal.split(' ')[0];

        const horaActual = horaformat(Fecha);

        if(horaActual >= turnoInicio && horaActual <= turnoFin) {
            
            newAsistencia.fecha = FechaFormat(Fecha).toString();
            newAsistencia.hora = horaformat(Fecha);
            newAsistencia.state = true;

            await AppDataSource.getRepository(AsistenciaDB).save(newAsistencia);

            if(turnoInicio < horaActual) {
                const tardanza = restarHoras(horaActual, turnoInicio) 
                console.log(horaActual, turnoInicio, tardanza);
                newTardanza.fecha = FechaFormat(Fecha).toString();
                newTardanza.tiempoTardanza = tardanza;
                await AppDataSource.getRepository(TardanzaDB).save(newTardanza);
            }

        }else if(turnoFin < horaActual) {
            newFalta.fecha = FechaFormat(Fecha).toString();
            await AppDataSource.getRepository(FaltasDB).save(newFalta);
        }

        const newControl = new ControlAsistenciaGeneralDB();
        newControl.asistencia = [newAsistencia];
        newControl.faltas = [newFalta];
        newControl.tardanza = [newTardanza];
        newControl.usuario = [checkUser]

        const response = await AppDataSource.getRepository(ControlAsistenciaGeneralDB).save(newControl); 
        return response;
    }


    async mostrarAsistencia(){
        const response = await AppDataSource.getRepository(AsistenciaDB).find({
            where: {
                control: {
                    usuario: true,
                }
            },
            relations: {
                control: {
                    usuario: {
                        persona:true
                    },
                }
            }
        })
        return {
            recordsFiltered: response.length,
            recordsTotal:response.length,
            data: response
        }
    }
}

export const controlService = ControlService.getInstance();