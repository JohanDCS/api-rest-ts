import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { personaDB } from "./persona";
import { tipoUser } from "../interfaces/usuario.interfaces";

@Entity()
export class UsuarioDB{
    @PrimaryGeneratedColumn("increment")
    IdUsuario: number;

    @Column({
        type: "enum",
        enum: tipoUser,
        default: tipoUser.Usuario
    })
    TipoUsuario: tipoUser;

    @Column({nullable:false})
    NumDoc: number

    @Column({nullable:false})
    password: string

    @OneToOne(() => personaDB, persona => persona.usuario)
    persona: personaDB;
}