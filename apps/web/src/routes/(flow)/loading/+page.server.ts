import { getState } from "$lib/drizzle";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url, depends }) => {
    depends("app:loading");

    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(302, "/");

    const ignore = url.searchParams.get("from") ?? "";

    if (state.step !== "loading" && state.step !== ignore) {
        const steps: Record<typeof state.step, string> = {
            cv: "/upload-cv",
            one: "/question",
            two: "/question",
            three: "/question",
            result: "/result",
        };

        redirect(302, steps[state.step]);
    }

    return {};
};
