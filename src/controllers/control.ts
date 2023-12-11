import { Request, Response } from "express";
import { handleHTTP } from "../utils/error.handle";
import { controlService } from "../services/control.service";

class ControlController{
    private static instance: ControlController
    public static getInstance(): ControlController{
        if(!ControlController.instance){
            this.instance = new ControlController(); 
        }
        return this.instance;
    }

    async PostControl(req: Request, res: Response){
        try{
            const {
                NumDoc,
                Fechaasistencia,
                Fechafaltas, 
                Fechatardanza
            } = req.body;
            const response = await controlService.insertControl({
                NumDoc: NumDoc, 
                Fechaasistencia: Fechaasistencia, 
                Fechafaltas: Fechafaltas, 
                Fechatardanza: Fechatardanza
            })
            return res.status(200).json({message: "Asistencia confirmada"});
        }catch(err: any){
            console.log(err);
            handleHTTP(res, "error al insertar la asistencia", err.message);
            
        }
    }
}

export const controlController = ControlController.getInstance();