import { getQuestions } from "gcs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const questions = await getQuestions(params.fileName);
    const currentIndex = Math.max(Math.min(+params.questionIndex, questions.length), 0);

    return { question: questions[currentIndex] };
};
