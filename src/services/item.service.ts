import { AppDataSource } from "../app.config"
import { car } from "../interfaces/car.interface"
import { carDB } from "../models/item"

const getCars = async () =>{
    const responseCars = await AppDataSource.getRepository(carDB).find();
    return responseCars;
}

const getCar = async (carid: string) =>{
    const responseCar = await AppDataSource.getRepository(carDB).findOne({
        where: {
            carId : parseInt(carid)
        }
    })
    return responseCar;
}


const insertCar = async (item: car) =>{
    const car = new carDB();
    car.color = item.color;
    car.conbustible = item.conbustible;
    car.año = item.año;
    car.descripcion = item.descripcion;
    car.price = item.price;
    
    if(!item.conbustible)
        throw new Error("comnbustible no admitido")

    const responseInsert = await AppDataSource.getRepository(carDB).save(car)
    return responseInsert;

}

const updateCar = async (id: string, item: car) =>{
    const newCar = await AppDataSource.getRepository(carDB).findOne({
        where: {
            carId : parseInt(id)
        }
    })
    if(!newCar) throw new Error ("carro no encontrado")

    newCar.color = item.color;
    newCar.conbustible = item.conbustible;
    newCar.año = item.año;
    newCar.descripcion = item.descripcion;
    newCar.price = item.price;

    if(!item.conbustible)
        throw new Error("comnbustible no admitido")

    const responseInsert = await AppDataSource.getRepository(carDB).save(newCar)
    return responseInsert;

}

const deleteCar = async (carid:string) =>{
    const eliminarCar = await AppDataSource.getRepository(carDB).findOne({
        where:{
            carId : parseInt(carid)
        }
    })
    if(!eliminarCar) throw new Error('No existe')
    const responseDelete = await AppDataSource.getRepository(carDB).remove(eliminarCar)
    return responseDelete;
}

export {insertCar, updateCar, getCars, getCar, deleteCar}