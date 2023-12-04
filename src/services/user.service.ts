import { type Auth } from "../interfaces/auth.interface";
import { AppDataSource } from "../app.config"
import { type Persona } from "../interfaces/persona.interface"
import { personaDB } from "../models/persona.models"
import { UsuarioDB } from "../models/usuario.models"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle";

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

const userLogin = async ({NumDoc, password}: Auth) => {
    try{
        const user = await AppDataSource.getRepository(UsuarioDB).findOne({
            where: {
                NumDoc,
            },
            relations: {
                persona: true,
            }
            
        });
        console.log(user);
        if(!user) throw new Error("Este usuario no existe"); 
        
        const passHash = user.password
        const isCorrect = await verified(password, passHash)
    
        if(!isCorrect) throw new Error("Contraseña incorrecta");
        
        const data = {
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

export { userRegister, userLogin }