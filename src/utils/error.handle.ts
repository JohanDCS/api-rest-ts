import { Response } from "express";

const handleHTTP = (res: Response, error: string) =>{
    res.status(500);
    res.send({error});
};

export { handleHTTP };