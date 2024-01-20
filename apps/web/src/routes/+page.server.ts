import { pdfUploadSchema } from "$lib/zod";
import { generateV4UploadSignedUrl } from "gcs";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(pdfUploadSchema), { allowFiles: true });
    const uploadUrl = await generateV4UploadSignedUrl("cv");

    return { form, uploadUrl };
};
