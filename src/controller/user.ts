import { UserService, User, transaction } from '../models/user';
import { Request, Response } from 'express';
import { generateJWT } from '../utilities/authuntaction';
import { CustomRequest } from '../middlewares/authentcation';

export async function signup (req: Request, res: Response) {
  const username = req.body.username as string;
  const password = req.body.password as string;
  try {
    const newUser : User = await UserService.Create(username, password) as User;
    const token = generateJWT(newUser.username, newUser.id);
    return res.json(token);
  } catch (error) {
    res.sendStatus(404);
  }
}

export async function login (req: Request, res: Response) {
  const username = req.body.username as string;
  const password = req.body.password as string;
  try {
    const currentUser = await UserService.Authenticate(username, password) as User;
    if (!currentUser) { return res.sendStatus(404); }
    const token = generateJWT(currentUser.username, currentUser.id);
    return res.json(token);
  } catch (error) {
    return res.sendStatus(404);
  }
}

export async function showTransactions (req: CustomRequest, res: Response) {
  const userID : number = req.userID as number;
  try {
    const transactions: transaction[] = await UserService.getTransactions(userID) as transaction[];
    if (!transactions) { res.sendStatus(404); }
    res.json(transactions);
  } catch (error) {
    res.sendStatus(404);
  }
}
