import express, { Request, Response } from "express";
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import verifyAuthToken from "./middlewares/authentcation";
import { UserStock } from "./models/stocks";
import jwt from 'jsonwebtoken';
import { Users } from "./models/user";

dotenv.config()
const SECRET_TOKEN = process.env.SECRET_TOKEN
const userStore = new UserStock()
const user = new Users()
const app : express.Application = express();

app.use(bodyParser.json());


app.listen(3000, async ()=> {
    console.log(`Running on port 3000`)

})


app.post('/buy', verifyAuthToken ,async (req: Request, res: Response) => {
    const symbol = req.body.symbol as string
    const shares = (req.body.shares as unknown) as number
    const user_id = (req.body.user_id as unknown) as BigInt
    console.log(symbol, shares, user_id)
    try {
        await userStore.buy(symbol , shares, user_id)
        res.sendStatus(200)
    } catch (error) {
        console.log('555555');
        res.sendStatus(404);
    }
})

app.post('/sell', verifyAuthToken, async (req: Request, res: Response) => {
    const symbol = req.body.symbol as string
    const shares = (req.body.shares as unknown) as number
    const user_id = (req.body.user_id as unknown) as BigInt
    try {
        await userStore.sell(symbol , shares, user_id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404);
    }
})

app.post('/signup', async (req: Request, res: Response) => {
    const username = req.body.username as string
    const password = req.body.password as string
    try {
        const newUser = await user.Create({username: username, password: password});
        const token = jwt.sign({user: newUser}, SECRET_TOKEN as string);
        res.json(token);
    } catch (error) {
        res.sendStatus(404);
    }
})

app.post('/login', async (req: Request, res: Response) => {
    const username = req.body.username as string
    const password = req.body.password as string
    try {
        const current_user = await user.Authenticate(username, password);
        // if (!current_user)
            // res.sendStatus(404);
        const token = jwt.sign({user: user}, SECRET_TOKEN as string);    
        res.json(token);
    } catch (error) {
        res.sendStatus(404);
    }
})


export default app;