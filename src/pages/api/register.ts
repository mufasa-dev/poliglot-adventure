import type { APIRoute } from "astro";
import { createUser, findUserByEmail } from "../../models/user.model";
import bcrypt from "bcryptjs";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Todos os campos são obrigatórios" }), { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return new Response(JSON.stringify({ error: "Email já cadastrado" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};
