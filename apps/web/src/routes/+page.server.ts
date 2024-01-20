import { uploadSchema } from "$lib/zod";
import { generateV4UploadSignedUrl } from "gcs";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(uploadSchema), { allowFiles: true });
    const cvUploadUrl = await generateV4UploadSignedUrl("pulse-interview-upload");
    const videoUploadUrl = await generateV4UploadSignedUrl("pulse-interview-video");

    return { form, cvUploadUrl, videoUploadUrl };
};
