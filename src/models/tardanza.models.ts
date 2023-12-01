import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TardanzaDB{
    @PrimaryGeneratedColumn("increment")
    IdTardanza: number;
    
    @Column({nullable: false})
    Fecha: Date;
}