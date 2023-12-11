import { Router } from "express";
import { turnoController } from "../controllers/turno";

const router = Router()

router.get('/load', turnoController.getTurno)

export { router }