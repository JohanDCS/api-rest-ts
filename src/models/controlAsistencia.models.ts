import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ControlAsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdControlAsis: number;
}