import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { tipodoc } from "../interfaces/personal.interface";

@Entity()
export class personalDB{
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

    @Column({nullable:false, length: '18', type: 'varchar'})
    NumDOc: string;
}