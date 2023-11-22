import { DataSource } from "typeorm";
import { personalDB } from "./models/item";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "asistencia",
    synchronize: true,
    logging: false,
    entities: [personalDB],
    subscribers: [],
    migrations: [],
})