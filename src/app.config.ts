import { DataSource } from "typeorm";
import { personaDB } from "./models/persona";
import { UsuarioDB } from "./models/usuario";
import { CargoDB } from "./models/cargo";
import { AsistenciaDB } from "./models/asistencia";
import { ControlAsistenciaGeneralDB } from "./models/controlAsistencia";
import { EmpresaDb } from "./models/empresa";
import { FaltasDB } from "./models/faltas";
import { TardanzaDB } from "./models/tardanza";
import { TurnoDB } from "./models/turno";
import { HorarioDB } from "./models/horarios";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306 ||process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [personaDB, UsuarioDB, CargoDB, TardanzaDB, AsistenciaDB, FaltasDB, ControlAsistenciaGeneralDB, EmpresaDb, TurnoDB, HorarioDB],
    subscribers: [],
    migrations: [],
})