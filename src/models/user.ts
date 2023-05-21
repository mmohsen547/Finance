import cliet from '../database';
import { generatePassword, comparePasswords } from '../utilities/authuntaction';

export type User = {
    username: string,
    password: string,
    cash?: number,
    id: number
}
export type transaction = {
    symbol: string,
    companyName: string,
    shares: number,
    price: number,
    transactionType: boolean,
    transactionDate: Date,
    }

export class UserService {
  static async Create (username: string, password: string): Promise<User> {
    try {
      const conn = await cliet.connect();
      const sql = 'INSERT INTO users(username, passowrd_hash) VALUES ($1, $2) RETURNING *';
      const passwordHash = await generatePassword(password);
      const res = await conn.query(sql, [username, passwordHash]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user with username ${username}`);
    }
  }

  static async Authenticate (username: string, password: string) : Promise<User | null> {
    try {
      const conn = await cliet.connect();
      const sql = 'SELECT id, username, passowrd_hash FROM users WHERE username = ($1)';
      const res = await conn.query(sql, [username]);
      conn.release();
      if (!res.rows.length) { return null; }

      const user = res.rows[0];
      const authenticated = await comparePasswords(password, user.passowrd_hash);
      if (authenticated) { return user; }
      return null;
    } catch (error) {
      throw new Error('username or password is not correct.');
    }
  }

  static async getTransactions (userID: number): Promise<transaction[] | null> {
    try {
      const conn = await cliet.connect();
      const sql = 'SELECT symbol, company_name, shares, price, transaction_date, transaction_type FROM transactions WHERE user_id = ($1)';
      const res = await conn.query(sql, [userID]);
      conn.release();
      if (!res.rows.length) { return null; }

      const transactions = res.rows;
      return transactions;
    } catch (error) {
      throw new Error('user has no transactions!');
    }
  }
}
