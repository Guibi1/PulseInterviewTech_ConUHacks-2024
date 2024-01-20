import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER, AUTH_KEY } from "$env/static/private";
import type { Provider } from "@auth/core/providers";
import Auth0Provider from "@auth/core/providers/auth0";
import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

const config: SvelteKitAuthConfig = {
    providers: [
        Auth0Provider({
            id: "a0",
            name: "a0",
            clientId: AUTH0_CLIENT_ID,
            clientSecret: AUTH0_CLIENT_SECRET,
            issuer: AUTH0_ISSUER,
            wellKnown: AUTH0_ISSUER + ".well-known/openid-configuration",
        }) as Provider,
    ],
    secret: AUTH_KEY,
    debug: true,
    session: {
        maxAge: 1800, // 30 mins
    },
};

export const handle = SvelteKitAuth(config) satisfies Handle;
