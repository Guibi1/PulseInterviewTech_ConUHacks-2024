<script lang="ts">
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
    import Logo from "./Logo.svelte";
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <div slot="lead" class="flex items-center">
                <Logo />
                <strong class="text-xl uppercase">Pulse Interview</strong>
            </div>

            <svelte:fragment slot="trail">
                <a class="btn btn-sm variant-ghost-surface" href="/"> Take the interview </a>
                <a class="btn btn-sm variant-ghost-surface" href="/generate-cv"> Generate a CV </a>
                <a
                    class="btn btn-sm variant-ghost-surface"
                    href="https://github.com/Guibi1/PulseInterviewTech_ConUHacks-2024"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />
</AppShell>
