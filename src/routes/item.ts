import { Router, Request, Response} from "express";
import { deleteItem, getItem, postItem, updateItem } from "../controllers/item";

const router = Router()
router.get('/load/:id', getItem);
router.post('/new', postItem );
router.put('/update/:id', updateItem);
router.delete('/delete/:id', deleteItem);

export {router};