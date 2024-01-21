<script lang="ts">
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
    import Logo from "./Logo.svelte";
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { Avatar } from "@skeletonlabs/skeleton";
    import { popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";

    import { storePopup } from "@skeletonlabs/skeleton";
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    export let data;

    const popupFeatured: PopupSettings = {
        event: "click",
        target: "popupFeatured",
        placement: "bottom",
    };
</script>

<svelte:head>
    <title>Pulse Interview</title>
</svelte:head>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar border="border-b border-primary-300-600-token">
            <a slot="lead" class="flex items-center gap-2" href="/">
                <Logo />
                <strong class="text-xl uppercase"
                    >Pulse Interview<small class="text-sm">.tech</small></strong
                >
            </a>

            <svelte:fragment slot="trail">
                <a
                    class="btn btn-sm variant-ghost-secondary hidden md:block"
                    href="https://github.com/Guibi1/PulseInterviewTech_ConUHacks-2024"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>

                {#if !data.loggedIn}
                    <button class="btn btn-sm variant-ghost-tertiary" on:click={() => signIn("a0")}
                        >Sign In with Auth0</button
                    >
                {:else}
                    <a class="btn btn-sm variant-ghost-primary" href="/upload-cv">
                        Take the interview
                    </a>
                    <a class="btn btn-sm variant-ghost-primary" href="/generate-cv">
                        Generate a CV
                    </a>
                {/if}

                {#if data.avatar}
                    <button class="btn btn-icon" use:popup={popupFeatured}>
                        <Avatar src={data.avatar} width="w-12" rounded="rounded-full" />
                    </button>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />
</AppShell>

<!-- popup -->
<div class="card z-50 w-72 border p-4 shadow-xl" data-popup="popupFeatured">
    <div class="flex flex-col items-center gap-2">
        <p>Hello, {data.name}!</p>

        <button class="btn btn-sm variant-ghost-tertiary" on:click={() => signOut()}
            >Sign Out</button
        >
    </div>

    <div class="arrow bg-surface-100-800-token border-l border-t" />
</div>
