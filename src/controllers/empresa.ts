import { Request, Response } from "express";
import { handleHTTP } from "../utils/error.handle";
import { empresaService } from "../services/empresa.service";

class EmpresaController{
    private static instance: EmpresaController;
    public static getInstance(): EmpresaController{
        if(!EmpresaController.instance){
            this.instance = new EmpresaController();
        }
        return this.instance;
    }

    async postEmpresa(req: Request, res: Response){
        try{
            const {code} = req.body;
            const response = await empresaService.InsertCode({code: code});
            return res.status(200).json({message: "insertado correctamente"});
        }catch(e: any){
            handleHTTP(res, "error al insertar los datos", e.message)
        }
    }

    async getEmpresa(req: Request, res: Response){
        try{
            const response = await empresaService.getCode();
            return res.status(200).json(response);
        }catch(e: any){
            handleHTTP(res, "error al obtener datos", e.message)
        }
    }

}

export const empresaController = EmpresaController.getInstance();