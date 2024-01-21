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

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <div slot="lead" class="flex items-center">
                <Logo />
                <strong class="text-xl uppercase">Pulse Interview</strong>
            </div>

            <svelte:fragment slot="trail">
                
                <a
                    class="btn btn-sm variant-ghost-surface"
                    href="https://github.com/Guibi1/PulseInterviewTech_ConUHacks-2024"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>

                

                {#if !data.loggedIn}
                    <button
                        class="btn btn-sm variant-ghost-secondary bg-gradient-to-br"
                        on:click={() => signIn("a0")}>Sign In with Auth0</button
                    >
                {:else}
                    <a class="btn btn-sm variant-ghost-surface" href="/"> Take the interview </a>
                    <a class="btn btn-sm variant-ghost-surface" href="/generate-cv"> Generate a CV </a>

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
<div class="card w-72 p-4 shadow-xl" data-popup="popupFeatured">
    <div>
        <p>Hello, {data.name}!</p>
        <button on:click={() => signOut()}>Sign Out with Auth0</button>
    </div>
    <div class="arrow bg-surface-100-800-token" />
</div>
