import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    userID? : number;
}
const verifyAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers.authorization as unknown) as string;
    const token = authHeader?.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN as Secret) as any;
    req.userID = user.id as number;
    next();
  } catch (error) {
    throw new Error(`You are not authorized. ${error}`);
  }
};

export default verifyAuthToken;
