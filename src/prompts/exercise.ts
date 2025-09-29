import type { Lesson } from "../models/lesson.model";

export function exercisesPrompt(lesson: Lesson, lang: string = "pt-br"): string {
  return `Você é um professor de idiomas. Crie exercícios de múltipla escolha para praticar os conteúdos da lição "${lesson.title}".
  Informações da lição:
  - Nível: ${lesson.level}
  - Palavras/estruturas principais: ${lesson.words.join(", ")}
  - Breve descrição: ${lesson.description}

  Gere 20 perguntas, todas com **uma resposta correta**.
  Retorne em JSON conforme o formato:
  {
    "title": "Título do conjunto de exercícios",
    "description": "Breve descrição",
    "content": [
      {
        "question": "Pergunta do exercício",
        "answers": [
          { "answer": "Alternativa", "correct": true/false }
        ]
      }
    ]
  }

  Use **${lang}** como idioma de instrução, mas os exemplos devem estar no idioma da lição.`;
}