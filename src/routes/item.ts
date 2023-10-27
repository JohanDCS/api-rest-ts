import { Router, Request, Response} from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controllers/item";

const router = Router()

router.get('/load', getItems);
router.get('/load/:id', getItem);
router.post('/new', postItem );
router.put('/update/:id', updateItem);
router.delete('/delete/:id', deleteItem);

export {router};