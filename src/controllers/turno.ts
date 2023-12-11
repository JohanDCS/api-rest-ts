import { Request, Response } from "express";
import { handleHTTP } from "../utils/error.handle";
import { turnoService } from "../services/turno.service";

class TurnoController{
    private static instance: TurnoController
    public static getInstance(): TurnoController{
        if(!TurnoController.instance){
            this.instance = new TurnoController();

        }
        return this.instance; 
    }

    async getTurno(req: Request, res: Response){
        try{
            const response = await turnoService.getTurno();
            return res.status(200).json(response);
        }catch(e: any){
            handleHTTP(res, "error al obtener los registros", e.message);
        }
    }
}

export const turnoController = TurnoController.getInstance();