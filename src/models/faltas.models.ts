import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FaltasDB{
    @PrimaryGeneratedColumn("increment")
    IdFaltas: number;
    
    @Column({nullable:false})
    Fecha: Date;
}