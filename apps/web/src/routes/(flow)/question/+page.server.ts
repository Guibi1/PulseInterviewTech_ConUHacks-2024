import { getState } from "$lib/drizzle";
import { videoUploadSchema } from "$lib/zod";
import { redirect } from "@sveltejs/kit";
import { generateV4UploadSignedUrl, getQuestions } from "gcs";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(304, "/");

    const steps = {
        one: { filename: state.videoOne, index: 0 },
        two: { filename: state.videoTwo, index: 1 },
        three: { filename: state.videoThree, index: 2 },
    };
    const step = steps[state.step as keyof typeof steps];

    const form = await superValidate(zod(videoUploadSchema), { allowFiles: true });
    const videoUpload = await generateV4UploadSignedUrl("pulse-interview-video", step.filename);
    const questions = await getQuestions(state.questionsFileName);

    return { form, videoUpload, question: questions[step.index] };
};
