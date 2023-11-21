import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { tipodoc } from "../interfaces/personal.interface";

@Entity()
export class personal_DB{
    @PrimaryGeneratedColumn('increment')
    PersonId: number;

    @Column({nullable:false, length: '50'})
    Nombres: string;
    
    @Column({nullable:false})
    Apellidos: string;

    @Column({
        type: 'enum',
        enum: tipodoc,
        default: tipodoc.DNI
    })

    TipoDocumento: tipodoc;

    @Column({nullable:false, length: '25', type: 'varchar'})
    NumDOc: string;
}