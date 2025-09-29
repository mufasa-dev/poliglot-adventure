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
        - Mensagens explicativas do professor. (Pelo menos 20)
        - Perguntas para o aluno refletir ou responder baseado no que foi ensinado. (Pelo menos 10 de cada tipo)
        - Pequeno exercício prático. (Pelo menos 5)
        - As mensagens e as perguntas devem estar intercaladas, algumas mensagens, e algumas perguntas sobre o que foi ensinado

        Use **${lang}** como idioma de instrução, mas os exemplos e o aprendizado devem ser em **${course.name}**.
        Certifique-se de que a lição seja envolvente e adequada para iniciantes no idioma.`;
};