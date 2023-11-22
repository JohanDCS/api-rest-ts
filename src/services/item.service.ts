import { AppDataSource } from "../app.config"
import { Personal } from "../interfaces/personal.interface"
import { personalDB } from "../models/item";


const getPersons = async () =>{
    const responsePersons = await AppDataSource.getRepository(personalDB).find();
    return responsePersons;
}

const getPerson = async (personID: string) =>{
    const responsePerson = await AppDataSource.getRepository(personalDB).findOne({
        where: {
            PersonId : parseInt(personID)
        }
    })
    return responsePerson;
}


const insertPerson = async (item: Personal) =>{
    const Personal = new personalDB();
    Personal.Nombres = item.Nombres;
    Personal.Apellidos = item.Apellidos;
    Personal.TipoDocumento = item.TipoDocIdentidad;
    Personal.NumDOc = item.NumDeIdenti;
   
    
    if(!item.TipoDocIdentidad)
        throw new Error("Documento no valido")

    const responseInsert = await AppDataSource.getRepository(personalDB).save(Personal)
    return responseInsert;

}

const updatePerson = async (id: string, item: Personal) =>{
    const newPerson = await AppDataSource.getRepository(personalDB).findOne({
        where: {
            PersonId : parseInt(id)
        }
    })
    if(!newPerson) throw new Error ("Persona no encontrada")

    newPerson.Nombres = item.Nombres;
    newPerson.Apellidos = item.Apellidos;
    newPerson.TipoDocumento = item.TipoDocIdentidad;
    newPerson.NumDOc = item.NumDeIdenti;

    if(!item.TipoDocIdentidad)
        throw new Error("Documento no valido")

    const responseInsert = await AppDataSource.getRepository(personalDB).save(newPerson)
    return responseInsert;

}

const deletePerson = async (personid:string) =>{
    const eliminarPerson = await AppDataSource.getRepository(personalDB).findOne({
        where:{
            PersonId : parseInt(personid)
        }
    })
    if(!eliminarPerson) throw new Error('No existe dicha persona')
    const responseDelete = await AppDataSource.getRepository(personalDB).remove(eliminarPerson)
    return responseDelete;
}

export {insertPerson, updatePerson, getPerson, getPersons, deletePerson}