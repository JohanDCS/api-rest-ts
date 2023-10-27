import { DataSource } from "typeorm";
import { carDB } from "./models/item";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Juanito",
    database: "two",
    synchronize: true,
    logging: false,
    entities: [carDB],
    subscribers: [],
    migrations: [],
})