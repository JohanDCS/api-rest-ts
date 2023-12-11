import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AsistenciaDB } from "./asistencia";
import { FaltasDB } from "./faltas";
import { TardanzaDB } from "./tardanza";

@Entity()
export class ControlAsistenciaDB{
    @PrimaryGeneratedColumn("increment")
    IdControlAsis: number;

    @OneToMany(() => AsistenciaDB, asistencia => asistencia.control)
    asistencia: AsistenciaDB[];

    @OneToMany(() => FaltasDB, faltas => faltas.control)
    faltas: FaltasDB[];

    @OneToMany(() => TardanzaDB, tardanza => tardanza.control)
    tardanza: TardanzaDB[];
}