import "dotenv/config"
import express from "express";
import cors from "cors";
import { router } from "./routes"
import { AppDataSource } from "./app.config";
import { turnoService } from "./services/turno.service";
import { empresaService } from "./services/empresa.service";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
AppDataSource.initialize().then(async ()=>{
    turnoService.InsertTurno([
        {denominacion: 'mañana', horainicio: '9:00 am', horafin: '18:00 pm'},
        {denominacion: 'tarde', horainicio: '17:00 pm', horafin: '21:00 pm'},
    ])
    empresaService.InsertCode([{code: '06fec648-9ab4-4b1c-ab0a-de9ce952358e'}])
    console.log("corriendo base de datos")
}).catch((error)=>{
    throw new Error(error);
})
app.use(router);
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));