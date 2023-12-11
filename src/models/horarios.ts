import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TurnoDB } from "./turno";

@Entity()
export class HorarioDB{
    @PrimaryGeneratedColumn('increment')
    horarioId: number

    @Column()
    horaInicio: string

    @Column()
    horaFinal: string

    @OneToOne(()=> TurnoDB, turno => turno.horario)
    @JoinColumn({name: 'turnoId'})
    turno: TurnoDB
}