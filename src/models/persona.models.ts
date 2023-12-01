import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { tipodoc } from "../interfaces/persona.interface";
import { UsuarioDB } from "./usuario.models";

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

    @OneToOne(() => UsuarioDB, usuario => usuario.persona)
    usuario: UsuarioDB;
}