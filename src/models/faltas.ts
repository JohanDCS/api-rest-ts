import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaGeneralDB } from "./controlAsistencia";

@Entity()
export class FaltasDB{
    @PrimaryGeneratedColumn('increment')
    faltaID: number

    @Column()
    fecha: Date

    @ManyToOne(()=> ControlAsistenciaGeneralDB, control => control.faltas)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaGeneralDB;
}