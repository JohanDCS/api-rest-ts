import { AppDataSource } from "../app.config";
import { Empresa } from "../interfaces/empresa.interface";
import { EmpresaDb } from "../models/empresa";

class EmpresaService{
    private static instance: EmpresaService;
    public static getInstance(): EmpresaService{
        if(!EmpresaService.instance){
            this.instance = new EmpresaService();
        }
        return this.instance;
    }

    async InsertCode({code}: Empresa){
        const newEmpresa = new EmpresaDb();
        newEmpresa.codeEmpresa = code

        const response = await AppDataSource.getRepository(EmpresaDb).save(newEmpresa)
        return response
    }

    async getCode(){
        const response = await AppDataSource.getRepository(EmpresaDb).find();
        return response
    }
}

export const empresaService = EmpresaService.getInstance();