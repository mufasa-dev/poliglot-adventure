import type { APIRoute } from 'astro';

export const prerender = false;

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body?.message ?? '';

    // TODO: aqui conecta com OpenAI / Gemini / seu serviço de IA
    // Por enquanto, enviamos um echo / resposta simples:
    const reply = `Você disse: "${userMessage}". (Resposta simulada)`;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
};
