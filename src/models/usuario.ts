import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { personaDB } from "./persona";
import { tipoUser } from "../interfaces/usuario.interfaces";
import { ControlAsistenciaGeneralDB } from "./controlAsistencia";

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

    @Column({nullable:false, type: 'bigint'})
    NumDoc: number

    @Column({nullable:false})
    password: string

    @OneToOne(() => personaDB, persona => persona.usuario)
    persona: personaDB;

    @ManyToMany(() => ControlAsistenciaGeneralDB, controlAsistencia => controlAsistencia.usuario)
    @JoinTable()
    controlAsistencia: ControlAsistenciaGeneralDB[];
}