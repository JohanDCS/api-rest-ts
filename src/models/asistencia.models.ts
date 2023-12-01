import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdAsistencia: number;
}