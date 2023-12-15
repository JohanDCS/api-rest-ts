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
                Fecha
            } = req.body;
            /*const HoraFormateada = await controlService.ObtenerHora(new Date(Hora));*/

            const response = await controlService.insertControl({
                NumDoc: NumDoc,
                Fecha: Fecha
            })
            return res.status(200).json({message: "Asistencia confirmada"});
        }catch(err: any){
            console.log(err);
            handleHTTP(res, "error al insertar la asistencia", err.message);
            
        }
    }
    async GetControl(req: Request, res: Response){
        try {
            const response = await controlService.mostrarAsistencia()
            return res.status(200).json(response)
        } catch (err: any) {
            console.log(err);
            handleHTTP(res, "Error al mostrar la tabla", err.message);
        }
    }
}

export const controlController = ControlController.getInstance();