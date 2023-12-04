import { Router } from "express";
import { LoginUser, PostUser } from "../controllers/user";

const router = Router();

router.post('/register', PostUser);
router.post('/login', LoginUser);

export { router }