import { Request, Response } from "express"
import { userLogin, userRegister } from "../services/user.service"
import { handleHTTP } from "../utils/error.handle"


const PostUser = async (req: Request, res: Response) => {
    try{
        const { 
            Nombres, 
            Apellidos, 
            NumDoc, 
            password, 
            TipoCargo, 
            TipoDocIdentidad, 
            TipoUsuario 
        } = req.body
        const response = await userRegister({
            Nombres: Nombres, 
            Apellidos: Apellidos, 
            NumDoc: NumDoc, 
            password: password,  
            TipoCargo: TipoCargo, 
            TipoDocIdentidad: TipoDocIdentidad, 
            TipoUsuario: TipoUsuario
        })

        return res.status(200).json({message: "usuario agregado correctamente"});
    }catch(err: any){
        handleHTTP(res, "Error al insertar el usuario", err.message);
    }
}

const LoginUser = async (req: Request, res: Response) => {
    try{
        const {
            codeEmpresa,
            NumDoc,
            password
        } = req.body 
        const response = await userLogin({
            codeEmpresa,
            NumDoc,
            password
        })
        return res.status(200).json(response);
    }catch(err: any){
        handleHTTP(res, "Error al logear el usuario", err.message);
    }
}

export { PostUser, LoginUser}