import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secret = process.env.SECRET_TOKEN as string;

export async function generatePassword (plainTextPassword: string): Promise<string> {
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}

export async function comparePasswords (plainTextPassword: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hash);
}

export function generateJWT (username: string, id: number): string {
  return jwt.sign({ username, id }, secret);
}
