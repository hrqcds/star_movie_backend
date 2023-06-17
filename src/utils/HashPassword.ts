import { hashSync, compareSync } from 'bcrypt';

export function GeneratePassword(password: string): string {
  return hashSync(password, 10);
}

export function ComparePassword(
  password: string,
  passwordHash: string,
): boolean {
  return compareSync(password, passwordHash);
}
