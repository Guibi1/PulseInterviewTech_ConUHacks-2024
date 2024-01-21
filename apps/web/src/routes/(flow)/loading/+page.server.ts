import { getState } from "$lib/drizzle";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, depends }) => {
    depends("app:loading");

    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(304, "/");

    console.log("🚀 ~ constload:PageServerLoad= ~ state:", state);

    if (state.step !== "loading") {
        const steps: Record<typeof state.step, string> = {
            cv: "/upload-cv",
            one: "/question",
            two: "/question",
            three: "/question",
            result: "/result",
        };

        redirect(304, steps[state.step]);
    }

    return {};
};
