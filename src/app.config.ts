import { DataSource } from "typeorm";
import { personalDB } from "./models/item";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306||process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [personalDB],
    subscribers: [],
    migrations: [],
})