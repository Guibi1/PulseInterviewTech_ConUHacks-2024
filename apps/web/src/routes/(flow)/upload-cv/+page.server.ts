import { getState } from "$lib/drizzle";
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

    const form = await superValidate(zod(cvUploadSchema), { allowFiles: true });
    const cvUpload = await generateV4UploadSignedUrl("pulse-interview-upload", state.cvFileName);

    return { form, cvUpload };
};
