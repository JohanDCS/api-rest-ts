import { Request, Response } from "express"
import { GetUsers, UpdateUser, userLogin, userRegister} from "../services/user.service"
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
            TipoUsuario,
            turno, 
        } = req.body
        const response = await userRegister({
            Nombres: Nombres, 
            Apellidos: Apellidos, 
            NumDoc: NumDoc, 
            password: password,  
            TipoCargo: TipoCargo, 
            TipoDocIdentidad: TipoDocIdentidad, 
            TipoUsuario: TipoUsuario,
            turno: turno
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

const getUsers = async (req : Request, res: Response)=> {
    try {
        const responseUsers = await GetUsers();
        return res.status(200).json(responseUsers);
        } catch (err: any) {
            handleHTTP(res, 'ERROR_GET_USERS', err.message)
    }
};

const updateUser = async (req : Request, res: Response)=>{
    try {
        const { id } = req.params
        const {Nombres, Apellidos, TipoCargo} = req.body
        if(!id) return res.status(404).json({message:'Id no encontrado'});
        const responseUpdate = await UpdateUser( id, {Nombres: Nombres, Apellidos: Apellidos, TipoCargo: TipoCargo});
        if(!responseUpdate) return res.json({message: 'Los datos no lograron guardarse'});
        return res.status(200).json({message:'Guardado con exito'});
    } catch (err: any) {
        handleHTTP(res , 'ERROR_UPDATE_ITEM', err.message)
    }
};

export { PostUser, LoginUser, getUsers, updateUser}