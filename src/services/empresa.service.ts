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

    async InsertCode(codes: Array<Empresa>){
        try{
            const empresarepo = AppDataSource.getRepository(EmpresaDb);

            for (const code of codes) {
                const exist = await empresarepo.exist({
                    where: {
                        codeEmpresa: code.code,
                    },
                });
                if (!exist) {
                    const newEmpresa = new EmpresaDb();
                    newEmpresa.codeEmpresa = code.code
                    await AppDataSource.getRepository(EmpresaDb).save(newEmpresa)
                }
            }
        }catch(e: any){
            throw new Error(e.message);
        }   
    }

    async getCode(){
        const response = await AppDataSource.getRepository(EmpresaDb).find();
        return response
    }
}

export const empresaService = EmpresaService.getInstance();