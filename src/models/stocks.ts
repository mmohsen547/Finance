import client from "../database";
import { lookup } from "../utilities/lookup";

export type Stock = {
    symbol: string,
    name: string,
    price: number
}

export class UserStock {
    async buy(symbol:string, shares: number, user_id: BigInt) {
        const conn = await client.connect();
        
        try {
            const stock: Stock = await lookup(symbol) as Stock;
            console.log(stock);
            if(!stock)
                throw new Error("not a valid symbol");
                
            await conn.query('BEGIN');
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const res = await conn.query(sql, [user_id]);
            if (shares * stock['price'] > res.rows[0]['cash'])
                throw new Error('no enogh cach to buy this stock.')
            const sql2 = 'UPDATE users SET cash=($1) WHERE id = ($2)';
            await conn.query(sql2, [res.rows[0]['cash'] - shares * stock['price'], user_id]);
            
            const sql3 = 'SELECT * from stocks WHERE symbol = ($1) and user_id=($2)'
            const res2 = await conn.query(sql3, [symbol, user_id]);
            
            if (!res2.rows.length) {
                const sql4 = 'INSERT INTO stocks(symbol, company_name, shares, user_id) VALUES ($1, $2, $3, $4)'
                await conn.query(sql4, [stock['symbol'], stock['name'], shares, user_id]);
            }

            else {
                const sql5 = 'UPDATE stocks SET shares = shares + ($1) WHERE user_id = ($2) and symbol = ($3)'
                await conn.query(sql5, [shares, user_id, symbol])
            }
    
            const sql6 = 'INSERT INTO transactions(symbol, company_name, shares, user_id, price, transaction_type, transaction_date) Values ($1, $2, $3, $4, $5, $6, $7)';
            await conn.query(sql6, [stock['symbol'], stock['name'], shares, user_id, stock['price'], true, new Date()]);
            await conn.query('COMMIT');
        } catch (error) {
            await conn.query('ROLLBACK');
            throw new Error(`Could not buy stock ${symbol}`);
            
        } finally {
            await conn.release();
        }  
    }

    async sell(symbol:string, shares: number, user_id: BigInt) {
       
        const conn = await client.connect();
        try {
            const stock: Stock = await lookup(symbol) as Stock;
            if(!stock)
                throw new Error("not a valid symbol");
            
            await conn.query('BEGIN');
            const sql = 'SELECT * FROM stocks WHERE user_id = ($1) and symbol = ($2)';
            const res = await conn.query(sql, [user_id, stock['symbol']]);
            if (!res.rows.length || res.rows[0]['shares'] < shares) {
                throw new Error(`you don not have enough shares from ${symbol}.`)
            }
                
            
            const sql2 = 'UPDATE users SET cash = cash + ($1) WHERE id = ($2)';
            console.log(stock['price'])
            await conn.query(sql2, [shares * stock['price'], user_id]);

            const sql3 = 'UPDATE stocks set shares = shares - ($1) WHERE user_id = ($2) and symbol=($3)'
            await conn.query(sql3, [shares, user_id, stock['symbol']]);

            const sql4 = 'INSERT INTO transactions(symbol, company_name, shares, user_id, price, transaction_type, transaction_date) Values ($1, $2, $3, $4, $5, $6, $7)';
            
            await conn.query(sql4, [stock['symbol'], stock['name'], shares, user_id, stock['price'], false, new Date()]);
            await conn.query('COMMIT');


        } catch (error) {
            await conn.query('ROLLBACK');
            throw new Error(`$error`);
            
        } finally {
            conn.release();
        }
        
                
        
    }
}