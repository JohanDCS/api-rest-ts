import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CargoDB{
    @PrimaryGeneratedColumn("increment")
    IdCargo: number;
}