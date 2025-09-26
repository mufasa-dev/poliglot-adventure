import type { APIRoute } from "astro";
import { getUserIdFromToken } from "../../../lib/auth";
import { createLesson, findLessonsByUser } from "../../../models/lesson.model";

export const prerender = false;

// GET /api/lessons → retorna todas as lessons do usuário logado
export const GET: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const lessons = await findLessonsByUser(userId.toString());
    return new Response(JSON.stringify(lessons), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao buscar lessons" }), { status: 500 });
  }
};

// POST /api/lessons → cria uma nova lesson
export const POST: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { title, description, content, courseId } = await request.json();

    if (!title || !description || !courseId) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: title, description, courseId" }), { status: 400 });
    }

    const newLesson = {
      title,
      description,
      content: content || [],
      courseId,
      userId,
      createdAt: new Date(),
    };

    const result = await createLesson(newLesson);
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao criar lesson" }), { status: 500 });
  }
};
