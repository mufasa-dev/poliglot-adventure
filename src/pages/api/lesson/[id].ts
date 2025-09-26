import type { APIRoute } from "astro";
import { getUserIdFromToken } from "../../../lib/auth";
import { findLessonById, updateLesson, deleteLesson } from "../../../models/lesson.model";

export const prerender = false;

// GET /api/lessons/:id → retorna uma lesson
export const GET: APIRoute = async ({ params, request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const id = params.id!;
    const lesson = await findLessonById(id);

    if (!lesson || lesson.userId !== userId) {
      return new Response(JSON.stringify({ error: "Lesson não encontrada" }), { status: 404 });
    }

    return new Response(JSON.stringify(lesson), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao buscar lesson" }), { status: 500 });
  }
};

// PUT /api/lessons/:id → atualiza uma lesson
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const id = params.id!;
    const updates = await request.json();

    const result = await updateLesson(id, updates);
    if (!result.modifiedCount) {
      return new Response(JSON.stringify({ error: "Erro ao atualizar lesson" }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao atualizar lesson" }), { status: 500 });
  }
};

// DELETE /api/lessons/:id → remove uma lesson
export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const id = params.id!;
    const result = await deleteLesson(id);

    if (!result.deletedCount) {
      return new Response(JSON.stringify({ error: "Erro ao deletar lesson" }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao deletar lesson" }), { status: 500 });
  }
};
