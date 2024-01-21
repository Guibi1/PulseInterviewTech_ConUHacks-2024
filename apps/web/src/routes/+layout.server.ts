import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const user = await locals.auth();

    return { email: user?.user?.email };
};
