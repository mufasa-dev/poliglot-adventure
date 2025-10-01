import type { APIRoute } from "astro";
import { getUserIdFromToken } from "../../../lib/auth";
import { createPerson, findPeopleByCourse, findPeopleByUser } from "../../../models/person.model";

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
      ? await findPeopleByCourse(courseId)
      : await findPeopleByUser(userId.toString());

    return new Response(JSON.stringify(exercises), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao buscar os exercícios" }), { status: 500 });
  }
};

// POST /api/person → cria uma nova pessoa
export const POST: APIRoute = async ({ request }) => {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { name, description, objectives, courseId, level } = await request.json();

    if (!name || !description || !courseId) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: name, description, courseId" }), { status: 400 });
    }

    const person = {
      name,
      description,
      level,
      objectives: objectives || [],
      courseId,
      userId,
      createdAt: new Date(),
    };

    const result = await createPerson(person);
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erro ao criar lesson" }), { status: 500 });
  }
};
