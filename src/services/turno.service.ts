import { AppDataSource } from "../app.config";
import { Turno } from "../interfaces/turno.interface";
import { HorarioDB } from "../models/horarios";
import { TurnoDB } from "../models/turno";

class TurnoService{
	private static instance: TurnoService
	public static getInstance(): TurnoService{
		if(!TurnoService.instance){
			this.instance = new TurnoService();
		}
		return this.instance;
	}

	async InsertTurno(turnos: Array<Turno>) {
		try{
			const turnorepo = AppDataSource.getRepository(TurnoDB);

			for (const turno of turnos) {
				const exist = await turnorepo.exist({
					where: {
						denominacion: turno.denominacion,
					},
                    relations: {
                        horario: true,
                    }
				});

				if (!exist) {
                    const newHorario = new HorarioDB()
                    newHorario.horaInicio = turno.horainicio;
                    newHorario.horaFinal = turno.horafin;

					const newTurno = new TurnoDB();
                    newTurno.denominacion = turno.denominacion;
                    newTurno.horario = newHorario

                    await AppDataSource.getRepository(TurnoDB).save(newTurno);
				}
			}
		}catch(e: any){
			throw new Error(e.message);
		}
	
    }

    async getTurno(){
        try{
            const response = await AppDataSource.getRepository(TurnoDB).find({
                relations: {
                    horario: true,
                }
            })
    
            return response
        }catch(e: any){
            throw new Error(e.message);
        }
    }
}

export const turnoService = TurnoService.getInstance();

