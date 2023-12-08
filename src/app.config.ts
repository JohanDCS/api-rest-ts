import { DataSource } from "typeorm";
import { personaDB } from "./models/persona.models";
import { UsuarioDB } from "./models/usuario.models";
import { CargoDB } from "./models/cargo.models";
import { TardanzaDB } from "./models/tardanza.models";
import { AsistenciaDB } from "./models/asistencia.models";
import { FaltasDB } from "./models/faltas.models";
import { ControlAsistenciaDB } from "./models/controlAsistencia.models";
import { EmpresaDb } from "./models/empresa.models";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3307||process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [personaDB, UsuarioDB, CargoDB, TardanzaDB, AsistenciaDB, FaltasDB, ControlAsistenciaDB, EmpresaDb],
    subscribers: [],
    migrations: [],
})