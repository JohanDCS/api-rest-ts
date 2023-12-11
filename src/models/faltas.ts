import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaDB } from "./controlAsistencia";

@Entity()
export class FaltasDB{
    @PrimaryGeneratedColumn('increment')
    faltaID: number

    @Column()
    fecha: Date

    @ManyToOne(()=> ControlAsistenciaDB, control => control.faltas)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaDB;
}