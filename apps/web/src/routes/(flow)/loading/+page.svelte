<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    onMount(() => {
        setInterval(() => invalidate("app:loading"), 500);
    });
</script>

<main
    class="container mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8"
>
    <ProgressRadial value={undefined} meter="stroke-primary-600 dark:stroke-primary-400" />
    <h1 class="h3">Loading...</h1>
</main>
