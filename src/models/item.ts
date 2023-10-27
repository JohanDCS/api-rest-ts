import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { tipogas } from "../interfaces/car.interface";

@Entity()
export class carDB{
    @PrimaryGeneratedColumn('increment')
    carId: number;

    @Column({nullable:false, length: '250'})
    color: string;

    @Column({
        type: 'enum',
        enum: tipogas,
        default: tipogas.gasolina
    })

    conbustible: tipogas;

    @Column({nullable:false})
    año: number;

    @Column({nullable:false, length: '1000', type: 'varchar'})
    descripcion: string;

    @Column({nullable:false})
    price: number;
}