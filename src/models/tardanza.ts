import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaDB } from "./controlAsistencia";

@Entity()
export class TardanzaDB{
    @PrimaryGeneratedColumn('increment')
    tardanzaId: number

    @Column()
    fecha: Date

    @Column()
    tiempoTardanza: string

    @ManyToOne(()=> ControlAsistenciaDB, control => control.tardanza)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaDB;
}