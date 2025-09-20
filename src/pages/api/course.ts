import type { APIRoute } from "astro";
import { createCourse, findCoursesByUser } from "../../models/course.model";
import jwt from "jsonwebtoken";
import { updateUserCourse } from "../../models/user.model";

export const prerender = false;

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

// Função auxiliar para pegar userId do token
function getUserIdFromRequest(request: Request): string | null {
  const token = request.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

// GET /api/courses -> lista cursos do usuário
export const GET: APIRoute = async ({ request }) => {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const courses = await findCoursesByUser(userId);
  return new Response(JSON.stringify(courses), { status: 200 });
};

// POST /api/courses -> cria novo curso
export const POST: APIRoute = async ({ request }) => {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) {
      return new Response(JSON.stringify({ error: "Course name is required" }), { status: 400 });
    }

    await createCourse({
      userId,
      name,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { course } = await request.json();
    if (!course) {
      return new Response(JSON.stringify({ error: "Course name is required" }), { status: 400 });
    }

    await updateUserCourse(userId, course);

    return new Response(JSON.stringify({ success: true, course }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};