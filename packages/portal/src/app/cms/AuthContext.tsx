import { isAuthenticated } from "backend/service/auth";

export async function AuthContext() {
  const user = await isAuthenticated();

  return null;
}
