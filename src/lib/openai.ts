import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export async function generateLesson(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // ou gpt-4o-mini para ser mais rápido/barato
    messages: [
      { role: "system", content: "Você é um professor de idiomas. Sempre responda em JSON válido." },
      { role: "user", content: `
      Gere uma lição estruturada no seguinte formato:
      {
        "title": "Título da lição",
        "description": "Breve descrição do que será ensinado. 10 palavras no máximo.",
        "words":["Palavras ou estruturas ensinadas durante a aula"],
        "level": "nível da lição usando o padrão que se usa nessa lingua",
        "content": [
          { "type": "message" | "ask" | "exercise", "value": "texto aqui",
           "answers":[
           "aswer":"Caso seja type excercise ou ask com apenas uma resposta válida aparecer a lista de alternativas", 
           "correct":"resposta correta true se não for a resposta correta não precisa enviar esse parametro"
           ],
           "words":"palavras ensinadas"
          }
        ]
      }
      
      Prompt do usuário:
      ${prompt}
      ` },
    ],
    response_format: { type: "json_object" }, // 🔑 força retorno JSON
    temperature: 0.7,
  });

  try {
    return JSON.parse(completion.choices[0].message?.content || "{}");
  } catch (err) {
    console.error("Erro ao parsear resposta da OpenAI:", err);
    return null;
  }
}
