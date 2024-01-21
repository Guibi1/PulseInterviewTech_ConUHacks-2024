import { cvBuilderSchema } from "$lib/zod";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(cvBuilderSchema));

    return { form };
};
