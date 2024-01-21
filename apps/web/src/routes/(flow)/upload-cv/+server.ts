import { getState, setDesiredPosition } from "$lib/drizzle";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
    const user = await locals.auth();
    const state = await getState(user?.user?.email);
    if (!state || state.step !== "cv") throw error(400);

    await setDesiredPosition(state.id, await request.text());
    return json({ success: true });
};
