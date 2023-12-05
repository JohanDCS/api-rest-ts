import { Request, Response } from "express";
import { handleHTTP } from "../utils/error.handle";
import { deleteUser, getUser, insertUser, updateUser } from "../services/item.service";
import { checkEnumTipoDoc, tipodoc } from "../interfaces/persona.interface";

const getItem = async (req: Request, res: Response)=> {
    try {
        const {id} = req.params;
        const responsePerson = await getUser(id);
        return res.status(200).json(responsePerson)
    } catch (error) {
        handleHTTP(res, 'ERROR_GET_ITEM');
    }
};

const updateItem = async (req : Request, res: Response)=>{
    try {
        const { id } = req.params
        const {Nombres, Apellidos, TipoDocIdentidad, NumDoc} = req.body
        if(!id) return res.status(404).json({message:'Id no encontrado'});
        if (!TipoDocIdentidad || !checkEnumTipoDoc(TipoDocIdentidad) ) return res.status(400).json({message: 'Menciona un documento valido'});
        //const responseUpdate = await updateUser( id, {Nombres: Nombres, Apellidos: Apellidos, TipoDocIdentidad: TipoDocIdentidad, NumDoc: NumDoc, password: password, });
        //if(!responseUpdate) return res.json({message: 'Los datos no lograron guardarse'});
        return res.status(200).json({message:'Guardado con exito'});
        
    } catch (error) {
        console.log(error);
        handleHTTP(res , 'ERROR_UPDATE_ITEM')
    }
};

const postItem = async (request: Request, res: Response)=>{
    try {
        const {Nombres, Apellidos, TipoDocIdentidad, NumDoc} = request.body
        if (!TipoDocIdentidad || !checkEnumTipoDoc(TipoDocIdentidad)) return res.status(400).json({message: 'Debes ingresar un tipo de documento valido'})
        //const responseInsert = await insertPerson({Nombres: Nombres, Apellidos: Apellidos, TipoDocIdentidad: TipoDocIdentidad, NumDoc: NumDoc});
        
        res.status(200).json({message: "Registro exitoso"}) 
    } catch (error: any) {
        handleHTTP(res, 'ERROR_POST_ITEM', error.message)
    }
};



const deleteItem = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        //const deleteperson = await deletePerson(id);
        //if(!deleteperson) return res.json({message: 'La persona no existe'})
        return res.status(200).json({message: 'Ha sido borrado por gay'});
    } catch (error) {
        handleHTTP(res, 'ERROR_DELETE_ITEM')
    }
};

export {getItem,updateItem,postItem,deleteItem};