import type { APIRoute } from "astro";
import { getUserIdFromToken } from "../../../lib/auth";
import { findExerciseByCourse, findExercisesByUser } from "../../../models/exercise.model";

export const prerender = false;

// GET /api/exercise → retorna todos os exercícios do usuário logado (ou de um curso específico)
export const GET: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const url = new URL(request.url);
    const courseId = url.searchParams.get("courseId");

    const exercises = courseId
      ? await findExerciseByCourse(courseId)
      : await findExercisesByUser(userId.toString());

    return new Response(JSON.stringify(exercises), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao buscar os exercícios" }), { status: 500 });
  }
};