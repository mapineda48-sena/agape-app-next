export function login(auth: {
  username: string;
  password: string;
}): Promise<void>;
export function logout(): Promise<{ message: string }>;
export function isAuthenticated(): Promise<void>;

export const sync: Promise<void>;

export const user: IUserSession;

interface IUserSession {
  id: number;
  fullName: string;
}
