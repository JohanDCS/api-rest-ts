import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AsistenciaDB } from "./asistencia";
import { FaltasDB } from "./faltas";
import { TardanzaDB } from "./tardanza";
import { UsuarioDB } from "./usuario";

@Entity()
export class ControlAsistenciaGeneralDB{
    @PrimaryGeneratedColumn("increment")
    IdControlAsis: number;

    @OneToMany(() => AsistenciaDB, asistencia => asistencia.control)
    asistencia: AsistenciaDB[];

    @OneToMany(() => FaltasDB, faltas => faltas.control)
    faltas: FaltasDB[];

    @OneToMany(() => TardanzaDB, tardanza => tardanza.control)
    tardanza: TardanzaDB[];

    @OneToMany(() => UsuarioDB, usuario => usuario.controlAsistencia)
    usuario: UsuarioDB[];
}