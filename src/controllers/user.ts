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
    }catch(err){
        handleHTTP(res, "Error al insertar el usuario", err);
    }
}

const LoginUser = async (req: Request, res: Response) => {
    try{
        const {
            NumDoc,
            password
        } = req.body 
        const response = await userLogin({
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
        } catch (error) {
            handleHTTP(res, 'ERROR_GET_USERS')
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
    } catch (error) {
        console.log(error);
        handleHTTP(res , 'ERROR_UPDATE_ITEM')
    }
};

export { PostUser, LoginUser, getUsers, updateUser}