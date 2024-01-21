<script lang="ts">
    import { Ratings } from "@skeletonlabs/skeleton";

    export let data;
</script>

<main class="container mx-auto flex h-full flex-col items-center justify-center gap-4">
    <!-- {data.results} -->

    <div class="card">
        <header class="card-header">
            <h1 class="h1">Analysis of Question 1</h1>

            <Ratings value={4} max={5}>
                <svelte:fragment slot="empty">⭕</svelte:fragment>
                <svelte:fragment slot="full">🔴</svelte:fragment>
            </Ratings>
        </header>
        <section class="p-4">
            <p>positive comment</p>
            <p>negative comment</p>
        </section>
        <footer class="card-footer">(footer)</footer>
    </div>
</main>
