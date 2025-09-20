import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db"; // caminho certo pro seu projeto
import jwt from "jsonwebtoken";

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

// Função auxiliar: pegar userId do token
function getUserIdFromToken(request: Request): string | null {
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

// GET - Retorna o curso ativo do usuário
export const GET: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    console.log("Decoded userId:", userId);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { course: 1 } }
    );

    return new Response(JSON.stringify({ course: user?.course || null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

// PUT - Atualiza o curso ativo do usuário
export const PUT: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { course } = body;

    if (!course || typeof course !== "string") {
      return new Response(JSON.stringify({ error: "Invalid course" }), { status: 400 });
    }

    const { db } = await connectToDatabase();
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { course } }
    );

    return new Response(JSON.stringify({ success: true, course }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
