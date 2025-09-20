import type { APIRoute } from "astro";
import { findUserByEmail } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const prerender = false;

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(JSON.stringify({ error: "Senha incorreta" }), { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};
