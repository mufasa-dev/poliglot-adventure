import jwt from "jsonwebtoken";
import { findUserById } from "../models/user.model";

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

export function getUserIdFromToken(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}

export async function getUserFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const user = await findUserById(payload.id);
    return user;
  } catch (err) {
    return null;
  }
}