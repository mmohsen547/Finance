import { Request, Response, NextFunction } from "express";
import  jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
import {User} from '../models/user'
dotenv.config;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader?.split(' ')[1];
        
        const user = jwt.verify(token, process.env.SECRET_TOKEN as Secret) as any;
        console.log(`user is ${user.userID}`)
        next(user.userID);
    } catch (error) {
        throw new Error(`You are not authorized. ${error}`);
        
    }
}

export default verifyAuthToken;