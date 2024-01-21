import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { join } from "path";
import type { Config } from "tailwindcss";
import { customTheme } from "./src/theme";

export default {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
    ],
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [customTheme],
            },
        }),
    ],
} satisfies Config;
