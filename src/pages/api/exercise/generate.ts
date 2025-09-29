import type { APIRoute } from "astro";
import { generateExercises } from "../../../lib/openai"; // função que criamos para gerar exercícios
import { getUserIdFromToken } from "../../../lib/auth";
import { createExercise } from "../../../models/exercise.model";

export const prerender = false;

// POST /api/exercise/generate
export const POST: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { lessonId, lessonData } = await request.json();
    if (!lessonId || !lessonData) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: lessonId, lessonData" }), { status: 400 });
    }

    // 🧠 Gera os exercícios via OpenAI
    const exercisesJson = await generateExercises(lessonData);
    if (!exercisesJson) {
      return new Response(JSON.stringify({ error: "Erro ao gerar exercícios" }), { status: 500 });
    }

    // 💾 Salva no banco
    const result = await createExercise({
      ...exercisesJson,
      lessonId,
      userId,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: result.insertedId, exercises: exercisesJson }), { status: 201 });
  } catch (err: any) {
    if (err.code === "insufficient_quota") {
      return new Response(JSON.stringify({ error: "Sua conta OpenAI está sem créditos ou acima do limite." }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};
