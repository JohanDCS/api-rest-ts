import { Router } from "express";
import { controlController } from "../controllers/control";

const router = Router();

router.post('/create/assist-control', controlController.PostControl)

export { router }