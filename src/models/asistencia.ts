import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaGeneralDB } from "./controlAsistencia";

@Entity()
export class AsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdAsistencia: number;

    @Column()
    fecha: string;

    @Column()
    hora: string;

    @Column({
        type: 'bool',
        default: false
    })
    state: boolean

    @ManyToOne(()=> ControlAsistenciaGeneralDB, control => control.asistencia)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaGeneralDB;
}