import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const encryptHash = "$2y$19$sUcRTjesx/tcq4rLsgiLre0NGnwPP8BWPSZJgyysWYoeBiGPPLaNG"

const generateToken = (dni: string) =>{
    const Gtoken = jwt.sign({userId: dni}, JWT_SECRET || encryptHash, {expiresIn: "3h"})

    return Gtoken
};

const verifyToken = (payload: string) =>{
        const isOk = jwt.verify(payload, JWT_SECRET || encryptHash)
        return isOk;
};

export{ generateToken, verifyToken}