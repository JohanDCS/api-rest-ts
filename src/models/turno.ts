import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HorarioDB } from "./horarios";
import { personaDB } from "./persona";

@Entity()
export class TurnoDB{
    @PrimaryGeneratedColumn('increment')
    turnoId: number;

    @Column()
    denominacion: string;

    @OneToOne(()=> HorarioDB, horario => horario.turno, {cascade: true})
    horario: HorarioDB;

    @OneToMany(()=> personaDB, persona => persona.turno)
    persona: personaDB[];
    
}