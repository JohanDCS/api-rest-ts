import { Router } from "express";
import { LoginUser, PostUser, getUsers, updateUser } from "../controllers/user";

const router = Router();

router.post('/register', PostUser);
router.get('/load', getUsers);
router.post('/login', LoginUser);
router.put('/update/:id', updateUser);

export { router }