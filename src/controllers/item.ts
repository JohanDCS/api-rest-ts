import { Request, Response } from "express";
import { handleHTTP } from "../utils/error.handle";
import { deleteCar, getCar, getCars, insertCar, updateCar } from "../services/item.service";
import { checkEnumTipoGas } from "../interfaces/car.interface";

const getItem = async (req: Request, res: Response)=> {
    try {
        const {id} = req.params;
        const responseCar = await getCar(id);
        return res.status(200).json(responseCar)
    } catch (error) {
        handleHTTP(res, 'ERROR_GET_ITEM');
    }
};

const getItems = async (req : Request, res: Response)=>{
    try {
        const responseCars = await getCars();
        res.status(200).json(responseCars);
    } catch (error) {
        handleHTTP(res, 'ERROR_GET_ITEMS')
    }
};

const updateItem = async (req : Request, res: Response)=>{
    try {
        const { id } = req.params
        const {color, conbustible, ano, descripcion, price} = req.body
        if(!id) return res.status(404).json({message:'Id no encontrado'});
        if (!conbustible || !checkEnumTipoGas(conbustible) ) return res.status(400).json({message: 'Debes ingresar un valor válido para combustible.'});
        const responseUpdate = await updateCar( id, {color: color, conbustible: conbustible, año: ano, descripcion: descripcion, price: price});
        if(!responseUpdate) return res.json({message: 'Los datos no lograron guardarse'});
        return res.status(200).json({message:'Guardado con exito'});
        
    } catch (error) {
        console.log(error);
        handleHTTP(res , 'ERROR_UPDATE_ITEM')
    }
};

const postItem = async (request: Request, res: Response)=>{
    try {
        const {color, conbustible, ano, descripcion, price} = request.body
        if (!conbustible || !checkEnumTipoGas(conbustible) ) return res.status(400).json({message: 'Debes ingresar un valor válido para combustible.'})
        const responseInsert = await insertCar({color: color, conbustible: conbustible, año: ano, descripcion: descripcion, price: price})
        
        res.status(200).json({message: "Carro en camino"}) 
    } catch (error) {
        handleHTTP(res, 'ERROR_POST_ITEM')
    }
};



const deleteItem = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const deletecar = await deleteCar(id);
        if(!deleteCar) return res.json({message: 'El objeto que desea eliminar no existe'})
        return res.status(200).json({message: 'Ha sido borrado'});
    } catch (error) {
        handleHTTP(res, 'ERROR_DELETE_ITEM')
    }
};

export {getItem,getItems,updateItem,postItem,deleteItem};