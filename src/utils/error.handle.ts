import { Response } from "express";

const handleHTTP = (res: Response, error: string, errorRaw?: any) =>{
    res.status(500);
    res.json({error, errorRaw});
};

export { handleHTTP };