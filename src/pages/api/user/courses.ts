import type { APIRoute } from "astro";
import { createCourse, findCoursesByUser } from "../../../models/course.model";
import { getUserIdFromToken } from "../../../lib/auth";

export const prerender = false;

// GET /api/user/courses → lista todos os cursos do usuário logado
export const GET: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const courses = await findCoursesByUser(userId.toString());
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao buscar cursos" }), { status: 500 });
  }
};

// POST /api/user/course → cria um curso para o usuário logado
export const POST: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { name, details } = await request.json();
    if (!name) {
      return new Response(JSON.stringify({ error: "O campo 'name' é obrigatório" }), { status: 400 });
    }

    const course = {
      userId: userId.toString(),
      name,
      details: details || {},
      createdAt: new Date(),
    };

    const result = await createCourse(course);
    return new Response(JSON.stringify({ success: true, courseId: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao criar curso" }), { status: 500 });
  }
};
