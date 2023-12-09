import { type Auth } from "../interfaces/auth.interface";
import { AppDataSource } from "../app.config"
import { type Persona } from "../interfaces/persona.interface"
import { personaDB } from "../models/persona.models"
import { UsuarioDB } from "../models/usuario.models"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle";
import { AuthCode } from "../interfaces/authCode.interface";
import { EmpresaDb } from "../models/empresa.models";
import { PersonActualizada } from "../interfaces/personaActualizada.interface";

const userRegister = async ({
    Nombres, 
    Apellidos, 
    NumDoc, 
    password, 
    TipoCargo, 
    TipoDocIdentidad, 
    TipoUsuario
}: Persona) => {
    try{
        const checkUser = await AppDataSource.getRepository(UsuarioDB).findOneBy({
            NumDoc,
        })
    
        if(checkUser) throw new Error('Este usuario ya ha sido registrado')
    
        const newUser = new UsuarioDB()
        newUser.NumDoc = NumDoc;
    
        const passHash = await encrypt(password)
        newUser.password = passHash; 

        newUser.TipoUsuario = TipoUsuario; 
    
        const newPersona = new personaDB();
        newPersona.Nombres = Nombres;
        newPersona.Apellidos = Apellidos; 
        newPersona.TipoDocumento = TipoDocIdentidad;
        newPersona.TipoCargo = TipoCargo;
        newPersona.usuario = newUser;
    
        const responsUser = await AppDataSource.getRepository(personaDB).save(newPersona);
        return responsUser;
    }catch(err: any){
        throw new Error(err.message);
    }
}

const userLogin = async ({codeEmpresa, NumDoc, password}: AuthCode) => {
    try{
        if (!codeEmpresa) {
            throw new Error("El Código de empresa es obligatorio");
        }
        const code = await AppDataSource.getRepository(EmpresaDb).findOne({
            where: {
                codeEmpresa
            }
        })
        if(!code || code === null) throw new Error("Token Invalido");

        const user = await AppDataSource.getRepository(UsuarioDB).findOne({
            where: {
                NumDoc,
            },
            relations: {
                persona: true,
            }
            
        });
        if(!user) throw new Error("Este usuario no existe"); 
        
        const passHash = user.password
        const isCorrect = await verified(password, passHash)
    
        if(!isCorrect) throw new Error("Contraseña incorrecta");
        
        const data = {
            tokenData: code.codeEmpresa,
            numdocument: user.NumDoc,
            nombres: user.persona.Nombres,
            apellidos: user.persona.Apellidos,
            cargo: user.persona.TipoCargo,
        }
        
        const token = generateToken(JSON.stringify(data))
        return token; 
    }catch(err: any){
        throw new Error(err.message);
    }
}

const GetUsers = async () => {
    try{
        const response = await AppDataSource.getRepository(UsuarioDB).find();
        return response
    }catch(err: any){
        throw new Error(err.message);
    }
}

const UpdateUser = async (id: string, {Nombres, Apellidos, TipoCargo}: PersonActualizada) =>{
    try{
        const newUser = new personaDB();
        newUser.Nombres = Nombres;
        newUser.Apellidos = Apellidos;
        newUser.TipoCargo = TipoCargo

        const response = await AppDataSource.getRepository(personaDB).save(newUser);
        return response
    }catch(err: any){
        throw new Error(err.message);
    }
}

export { userRegister, userLogin, GetUsers, UpdateUser}