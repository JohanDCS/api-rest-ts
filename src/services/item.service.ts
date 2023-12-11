import { AppDataSource } from "../app.config"
import { Persona } from "../interfaces/persona.interface"
import { personaDB } from "../models/persona";
import { UsuarioDB } from "../models/usuario";




const getUser = async (personID: string) =>{
    const responsePerson = await AppDataSource.getRepository(personaDB).findOne({
        where: {
            PersonId : parseInt(personID)
        }
    })
    return responsePerson;
}


const insertUser = async ({Nombres,Apellidos,TipoDocIdentidad, NumDoc, TipoCargo, TipoUsuario: TipoUsuario, password}: Persona) =>{
    const Docexist = await AppDataSource.getRepository(UsuarioDB).findOneBy({NumDoc})
    const Persona = new personaDB();
    if(Docexist){throw new Error("Este documento ya a sido registrado")}
    Persona.Nombres = Nombres;
    Persona.Apellidos = Apellidos;
    Persona.TipoDocumento = TipoDocIdentidad;
    
    const Usuario = new UsuarioDB();
    //Usuario.TipoUsuario = tipoUser;
    Usuario.NumDoc = NumDoc;
    Usuario.password = password;

   
    
    if(!TipoDocIdentidad)
        throw new Error("Documento no valido")

    const responseInsert = await AppDataSource.getRepository(personaDB).save(Persona)
    return responseInsert;

}

const updateUser = async (id: string, item: Persona) =>{
    const newPerson = await AppDataSource.getRepository(personaDB).findOne({
        where: {
            PersonId : parseInt(id)
        }
    })
    if(!newPerson) throw new Error ("Persona no encontrada")

    newPerson.Nombres = item.Nombres;
    newPerson.Apellidos = item.Apellidos;
    newPerson.TipoDocumento = item.TipoDocIdentidad;

    if(!item.TipoDocIdentidad)
        throw new Error("Documento no valido")

    const responseInsert = await AppDataSource.getRepository(personaDB).save(newPerson)
    return responseInsert;

}

const deleteUser = async (personid:string) =>{
    const eliminarPerson = await AppDataSource.getRepository(personaDB).findOne({
        where:{
            PersonId : parseInt(personid)
        }
    })
    if(!eliminarPerson) throw new Error('No existe dicha persona')
    const responseDelete = await AppDataSource.getRepository(personaDB).remove(eliminarPerson)
    return responseDelete;
}

export {insertUser, updateUser, getUser, deleteUser}