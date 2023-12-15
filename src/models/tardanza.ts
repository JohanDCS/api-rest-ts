import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlAsistenciaGeneralDB } from "./controlAsistencia";

@Entity()
export class TardanzaDB{
    @PrimaryGeneratedColumn('increment')
    tardanzaId: number

    @Column()
    fecha: string

    @Column()
    tiempoTardanza: string

    @ManyToOne(()=> ControlAsistenciaGeneralDB, control => control.tardanza)
    @JoinColumn({name: 'IdControlAsis'})
    control: ControlAsistenciaGeneralDB;
}