import { Router } from "express";
import { empresaController } from "../controllers/empresa";

const router = Router()

router.post('/createCode', empresaController.postEmpresa)
router.get('/load', empresaController.getEmpresa)

export { router}