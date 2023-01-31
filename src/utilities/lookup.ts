import { Stock } from "../models/stocks";
import dotenv from 'dotenv'
import fetch from "node-fetch";
dotenv.config()
export async function lookup(symbol:string) : Promise <Stock | null>{
    const api_key = process.env.API_KEY
    try {
        const res = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${api_key}`)
    .then(res => res.json())
    return {symbol: res['symbol'], name: res['companyName'], price: res['latestPrice'] as number} as Stock;
    } catch (error) {
        return null;
    }
    

                
}
