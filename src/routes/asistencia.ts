import { Router } from "express";
import { controlController } from "../controllers/control";

const router = Router();

router.post('/create/assist-control', controlController.PostControl)
router.get('/mostrar/load', controlController.GetControl)

export { router }