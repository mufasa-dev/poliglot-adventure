import type { APIRoute } from "astro";
import { generateLesson } from "../../../lib/openai";
import { getUserIdFromToken } from "../../../lib/auth";
import { createLesson } from "../../../models/lesson.model";

export const prerender = false;

// POST /api/lesson/generate
export const POST: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { prompt, courseId } = await request.json();
    if (!prompt || !courseId) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: prompt, courseId" }), { status: 400 });
    }

    // 🧠 Gera a lição via OpenAI
    const lesson = await generateLesson(prompt);
    if (!lesson) {
      return new Response(JSON.stringify({ error: "Erro ao gerar lição" }), { status: 500 });
    }

    // 💾 Salva no banco
    const result = await createLesson({
      ...lesson,
      courseId,
      userId,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: result.insertedId, lesson }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};
