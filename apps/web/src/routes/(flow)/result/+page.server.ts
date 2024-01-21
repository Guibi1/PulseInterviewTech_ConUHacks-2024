import { getState } from "$lib/drizzle";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(302, "/");

    return { results: {} };
};
