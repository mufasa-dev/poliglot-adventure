import type { Course } from "../models/course.model";

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
        - Mensagens explicativas do professor.
        - Perguntas para o aluno refletir ou responder.
        - Pequeno exercício prático.

        Use **${lang}** como idioma de instrução, mas os exemplos e o aprendizado devem ser em **${course.name}**.
        Certifique-se de que a lição seja envolvente e adequada para iniciantes no idioma.`;
};