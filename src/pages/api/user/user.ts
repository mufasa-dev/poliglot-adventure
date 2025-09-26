import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { findUserById, updateUserById } from "../../../models/user.model";
import { getUserFromToken } from "../../../lib/auth";

export const prerender = false;

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

// GET /api/user → retorna o usuário logado
export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromToken(request);
    if (!user) return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 401 });

    const { password, ...safeUser } = user;
    return new Response(JSON.stringify(safeUser), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};

// PUT /api/user → atualiza o usuário logado
export const PUT: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromToken(request);
    if (!user) return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 401 });

    const { name, email, description, currentPassword, password } = await request.json();

    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (description) updateData.description = description;

    if (password) {
      if (!currentPassword) {
        return new Response(JSON.stringify({ error: "Digite a senha atual para alterar" }), { status: 400 });
      }

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return new Response(JSON.stringify({ error: "Senha atual incorreta" }), { status: 401 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updated = await updateUserById(user._id.toString(), updateData);
    if (!updated) return new Response(JSON.stringify({ error: "Erro ao atualizar" }), { status: 500 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};
