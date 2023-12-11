import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaDB } from "./controlAsistencia";

@Entity()
export class AsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdAsistencia: number;

    @Column()
    fecha: Date;

    @Column({
        type: 'bool',
        default: false
    })
    state: boolean

    @ManyToOne(()=> ControlAsistenciaDB, control => control.asistencia)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaDB;
    
}