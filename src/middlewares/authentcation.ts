import { Request, Response, NextFunction } from "express";
import  jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader?.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN as Secret);
        next();
    } catch (error) {
        throw new Error(`You are not authorized. ${error}`);
        
    }
}

export default verifyAuthToken;