import cliet from '../database';
import bcrypt from 'bcrypt';
const SALT_ROUNDS : string = process.env.SALT_ROUNDS as string;
const PEPPER : string = process.env.PEPPER as string;

export type User = {
    username: string,
    password: string,
    cash?: number,
    id: number
}

export class Users {
    async Create(user: User): Promise<User> {
        try {
            const conn = await cliet.connect();
            const sql = 'INSERT INTO users(username, passowrd_hash) VALUES ($1, $2) RETURNING *';
            const password_hash = bcrypt.hashSync(user.password + PEPPER, parseInt(SALT_ROUNDS))
            const res = await conn.query(sql, [user.username, password_hash]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            console.log(error);
            throw new Error(`Cannot create user with username ${user.username}`)
        }
        
    }

    async Authenticate(username: string, password: string) : Promise<User | null> {
        try {
            const conn =  await cliet.connect();
            const sql = 'SELECT username, passowrd_hash FROM users WHERE username = ($1)'
            const res = await conn.query(sql, [username]);
            conn.release();
            if (!res.rows.length)
                return null;
            
            const user = res.rows[0];   
            const authenticated = bcrypt.compareSync(password + PEPPER, user.password_hash);  
            if (authenticated)
                return user;
            return null;    
        } catch (error) {
            throw new Error('username or password is not correct.')
        }
    }
}