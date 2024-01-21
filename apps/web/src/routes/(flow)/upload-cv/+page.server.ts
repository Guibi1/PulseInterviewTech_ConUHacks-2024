import { getState, resetState } from "$lib/drizzle";
import { cvUploadSchema } from "$lib/zod";
import { redirect } from "@sveltejs/kit";
import { generateV4UploadSignedUrl } from "gcs";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(302, "/");

    if (state.step === "loading") {
        redirect(302, "/loading");
    }
    if (state.step !== "cv") {
        resetState(state.id);
    }

    const cvUpload = await generateV4UploadSignedUrl("pulse-interview-upload", state.cvFileName);
    const form = await superValidate(zod(cvUploadSchema), { allowFiles: true });
    form.data.desiredPosition = state.desiredPosition;

    return { form, cvUpload };
};
