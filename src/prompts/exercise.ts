import type { Course } from "../models/course.model";
import type { Lesson } from "../models/lesson.model";

export function exercisesPrompt(course: Course, lesson: Lesson, lang: string = "pt-br"): string {
  return `Você é um professor de idiomas (${course.name}). Crie exercícios de múltipla escolha para praticar os conteúdos da lição "${lesson.title}".
  Informações do curso:
  - Nome do curso: ${course.name}

  Informações da lição:
  - Nível: ${lesson.level}
  - Palavras/estruturas principais: ${lesson.words.join(", ")}
  - Breve descrição: ${lesson.description}
  - Se o nível da lição permitir, inclua exercícios de pequenas histórias ou diálogos usando as palavras/estruturas ensinadas com perguntas sobre a história.
  - Use perguntas que incentivem o aluno a refletir sobre o uso das palavras/estruturas no contexto.
  - Inclua perguntas que revisem o vocabulário e a gramática ensinados.
  - Varie o formato das perguntas (completar frases, escolher a tradução correta, identificar erros, etc).
  - Cada pergunta deve ter 3-4 alternativas, com apenas uma resposta correta.
  - As perguntas devem ser claras e objetivas.
  - Evite repetir perguntas similares.
  - Certifique-se de que as perguntas estejam alinhadas com o nível da lição (${lesson.level}).
  - Foque em praticar as palavras/estruturas principais: ${lesson.words.join(", ")}.

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