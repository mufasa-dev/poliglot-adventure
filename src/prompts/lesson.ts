import type { Course } from "../models/course.model";
import type { Lesson } from "../models/lesson.model";

export function firstLessonPrompt(course: Course, lang: string = "pt-br"): string {
    let details = "";
    if (course.details) {
        course.details.forEach((d: any) => {
            details += `- ${d.title}: ${d.answer} \n`;
        });
    }
    return `Você é um professor de idiomas especializado em criar aulas personalizadas. 
        Informações do curso:
        - Nome do curso: ${course.name}
        ${details}
        
        A aula deve conter:
        1. **Título da lição** (curto e motivador).
        2. **Breve descrição** do que será ensinado.
        3. **Conteúdo estruturado** em etapas, incluindo:
        - Mensagens explicativas do professor. (Pelo menos 20)
        - Perguntas para o aluno refletir ou responder baseado no que foi ensinado. (Pelo menos 10 de cada tipo)
        - As mensagens e as perguntas devem estar intercaladas, algumas mensagens, e algumas perguntas sobre o que foi ensinado

        Use **${lang}** como idioma de instrução, mas os exemplos e o aprendizado devem ser em **${course.name}**.
        Certifique-se de que a lição seja envolvente e adequada para iniciantes no idioma.`;
};

export function nextLessonPrompt(
  course: Course,
  previousLesson: Lesson,
  userSuggestion: string,
  lang: string = "pt-br"
): string {
  return `Você é um professor de idiomas especializado em criar aulas personalizadas.

  Informações do curso:
  - Nome do curso: ${course.name}

  Informações da última lição concluída:
  - Título: ${previousLesson.title}
  - Nível: ${previousLesson.level}
  - Palavras/estruturas principais: ${previousLesson.words.join(", ")}
  - Breve descrição: ${previousLesson.description}

  Sugestão do aluno para a próxima lição:
  - "${userSuggestion}"

  Sua tarefa:
  Crie a **próxima lição** do curso, levando em conta:
  - O que já foi ensinado na última lição (${previousLesson.words.join(", ")})
  - A sugestão do aluno para o próximo tema.
  - A progressão natural de aprendizado no idioma.

  A próxima lição deve conter:
  1. **Título curto e motivador**.
  2. **Breve descrição** do que será ensinado (máx. 10 palavras).
  3. **Nível da lição** compatível com a progressão do aluno.
  4. **Palavras/estruturas principais** que serão ensinadas nesta lição.
  5. **Conteúdo estruturado**:
     - Pelo menos 20 mensagens explicativas ou narrativas (pode incluir pequenas histórias curtas e diálogos).
     - Pelo menos 10 perguntas de reflexão ou múltipla escolha.
     - Pelo menos 5 exercícios práticos (múltipla escolha).
     - Mensagens e perguntas devem estar intercaladas, criando ritmo de aprendizado.
     - Se o nível permitir inclua textos curtos ou diálogos usando as palavras/estruturas ensinadas com perguntas sobre o texto e peça para o usuário praticar leitura com esse texto.

  Regras importantes:
  - Use **${lang}** como idioma de instrução, mas todos os exemplos e o aprendizado devem estar no idioma do curso (${course.name}).
  - Se possível, conecte o conteúdo da lição anterior à nova lição para reforçar a memória do aluno.
  - As perguntas de múltipla escolha devem conter 3-4 alternativas, com apenas **uma correta**.
  - Torne a lição envolvente e adequada ao nível informado.

`;
};