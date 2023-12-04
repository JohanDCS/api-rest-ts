import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { tipodoc } from "../interfaces/persona.interface";
import { UsuarioDB } from "./usuario.models";
import { tipoCargo } from "../interfaces/cargo.interfaces";

@Entity()
export class personaDB{
    @PrimaryGeneratedColumn('increment')
    PersonId: number;

    @Column({nullable:false, length: '50'})
    Nombres: string;
    
    @Column({nullable:false, length: '50'})
    Apellidos: string;

    @Column({
        type: 'enum',
        enum: tipodoc,
        default: tipodoc.DNI
    })
    TipoDocumento: tipodoc;

    @Column({
        type: 'enum',
        enum: tipoCargo
    })
    TipoCargo: tipoCargo;
    
    @OneToOne(() => UsuarioDB, usuario => usuario.persona, {cascade: true})
    @JoinColumn({name: 'userId'})
    usuario: UsuarioDB;
}