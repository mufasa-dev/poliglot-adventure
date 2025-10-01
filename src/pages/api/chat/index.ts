import type { APIRoute } from "astro";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { person, course, messages } = await request.json();

    const formattedMessages = [
      {
        role: "system",
        content: `
          Você é ${person.name}, um personagem para praticar ${course.name}.
          Nível da conversa: ${person.level}.
          Objetivos: ${person.objectives.join(", ")}.
          Descrição do personagem: ${person.description}.
          Responda sempre no idioma alvo do curso.
          Seja natural e mantenha respostas curtas e interativas.
        `
      },
      ...messages
        .filter((m: { from: "user" | "person"; text: string }) => m.text?.trim())
        .map((m: { from: "user" | "person"; text: string }) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text
        }))
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: formattedMessages,
    });

    const reply = completion.choices[0].message?.content || "";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Erro na rota /api/chat:", err);
    return new Response(JSON.stringify({ error: "Erro ao chamar OpenAI" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
