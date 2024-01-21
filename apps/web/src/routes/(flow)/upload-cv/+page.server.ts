import { getState } from "$lib/drizzle";
import { cvUploadSchema } from "$lib/zod";
import { redirect } from "@sveltejs/kit";
import { generateV4UploadSignedUrl } from "gcs";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await locals.auth();
    // try {
    //     createState(user?.user?.email ?? "");
    // } catch (e) {
    //     console.log("🚀 ~ constload:PageServerLoad= ~ catch:", e);
    // }

    const state = await getState(user?.user?.email);
    console.log("🚀 ~ constload:PageServerLoad= ~ state:", state);
    if (!state) redirect(304, "/");

    const form = await superValidate(zod(cvUploadSchema), { allowFiles: true });
    const cvUpload = await generateV4UploadSignedUrl("pulse-interview-upload", state.cvFileName);

    return { form, cvUpload };
};
