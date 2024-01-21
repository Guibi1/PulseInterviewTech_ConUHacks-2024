import { getState } from "$lib/drizzle";
import { redirect } from "@sveltejs/kit";
import { getAnalysis, getFrameData } from "gcs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state) redirect(302, "/");

    const res = [
        await getAnalysis(state.videoOne),
        await getAnalysis(state.videoTwo),
        await getAnalysis(state.videoThree),
    ];

    return {
        results: res,
        filename: state.cvFileName,
        appearence: await getFrameData(state.cvFileName),
    };
};
