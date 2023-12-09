import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdAsistencia: number;

    @Column()
    fecha: string;

    @Column()
    hora: string;
}