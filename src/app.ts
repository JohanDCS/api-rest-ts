import "dotenv/config"
import express from "express";
import cors from "cors";
import { router } from "./routes"
import { AppDataSource } from "./app.config";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
AppDataSource.initialize().then(()=>{
    console.log("corriendo base de datos")
}).catch((error)=>{
    throw new Error(error);
})
app.use(router);
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));