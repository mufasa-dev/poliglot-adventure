import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { getUserIdFromToken } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const prerender = false;

// GET - Retorna o curso ativo do usuário com os detalhes completos
export const GET: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Pega o curso salvo no usuário (apenas o nome)
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { course: 1 } }
    );

    if (!user?.course) {
      return new Response(JSON.stringify({ course: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Agora busca os detalhes completos do curso
    const course = await db.collection("courses").findOne({
      name: user.course,
      userId: userId, // garante que o curso pertence ao usuário
    });

    return new Response(JSON.stringify({ course }), {
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
