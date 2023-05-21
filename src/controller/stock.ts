
import { Response } from 'express';
import { StockService } from '../models/stocks';
import { CustomRequest } from '../middlewares/authentcation';

export async function buy (req: CustomRequest, res: Response) {
  const symbol : string = req.body.symbol as string;
  const shares : number = (req.body.shares as unknown) as number;
  const userID : number = req.userID as number;
  try {
    await StockService.buy(symbol, shares, userID);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

export async function sell (req: CustomRequest, res: Response) {
  const symbol = req.body.symbol as string;
  const shares = (req.body.shares as unknown) as number;
  const userID = (req.userID) as number;
  try {
    await StockService.sell(symbol, shares, userID);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}
