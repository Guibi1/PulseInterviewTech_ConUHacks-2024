<script lang="ts">
    import { Accordion, AccordionItem, Ratings } from "@skeletonlabs/skeleton";

    export let data;
</script>

<main class="container mx-auto my-4 flex h-full flex-col items-center justify-center gap-4">
    <!-- {data.results} -->

    <Accordion autocollapse>
        {#each data.results as { rating, comment, question, answer }, i}
            <AccordionItem
                regionControl="variant-ghost-primary text-on-surface-token py-4 px-8"
                regionPanel="flex flex-col items-center gap-4 px-8 py-8 bg-surface-500-400-token"
            >
                <span class="mr-8 hidden text-lg md:block" slot="lead">Question {i + 1}</span>
                <svelte:fragment slot="summary">
                    {question}
                </svelte:fragment>

                <svelte:fragment slot="content">
                    <p class="p">
                        <span class="text-black/60 dark:text-white/60">You awnsered: </span>
                        {answer}
                    </p>

                    <Ratings text="text-4xl" value={rating} max={5}>
                        <svelte:fragment slot="empty">☆</svelte:fragment>
                        <svelte:fragment slot="full">⭐</svelte:fragment>
                    </Ratings>

                    <div class="mdmx-16 mt-4 grid gap-16 md:grid-cols-2">
                        <div
                            class="variant-outline-secondary card flex flex-col items-center gap-2 p-4 px-8 ring-2"
                        >
                            <span class="text-xl">Strengths</span>
                            <p class="p text-justify">{comment.positive}</p>
                        </div>

                        <div
                            class="variant-outline-secondary card flex flex-col items-center gap-2 p-4 px-8 ring-2"
                        >
                            <span class="text-xl">Ameliorations to consider</span>
                            <p class="p text-justify">{comment.negative}</p>
                        </div>
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}

        <AccordionItem
            regionControl="variant-ghost-primary text-on-surface-token py-4 px-8"
            regionPanel="flex flex-col items-center gap-4 px-8 py-8 bg-surface-500-400-token"
        >
            <span class="mr-8 hidden text-lg md:block" slot="lead">Insights</span>
            <svelte:fragment slot="summary">
                Informations about your speech and appearance
            </svelte:fragment>

            <div class="grid grid-cols-[1.5fr_2fr] gap-8" slot="content">
                <div class="flex flex-col items-stretch gap-4">
                    <span class="text-center text-2xl">Words per second</span>

                    <img
                        class="h-96 object-contain"
                        src={`https://storage.googleapis.com/pulse-interview-graphs/${data.filename}`}
                        alt="Graph of words per second over time"
                    />
                </div>

                <div class="flex flex-col items-stretch gap-4">
                    <span class="text-center text-2xl">Appearance</span>

                    <Ratings text="text-4xl" value={data.appearence.rating} max={5}>
                        <svelte:fragment slot="empty">☆</svelte:fragment>
                        <svelte:fragment slot="full">⭐</svelte:fragment>
                    </Ratings>

                    <div class="mdmx-16 mt-4 grid gap-16 md:grid-cols-2">
                        <div
                            class="variant-outline-secondary card flex flex-col items-center gap-2 p-4 px-8 ring-2"
                        >
                            <span class="text-xl">Strengths</span>
                            <p class="p text-justify">{data.appearence.comment.positive}</p>
                        </div>

                        <div
                            class="variant-outline-secondary card flex flex-col items-center gap-2 p-4 px-8 ring-2"
                        >
                            <span class="text-xl">Ameliorations to consider</span>
                            <p class="p text-justify">{data.appearence.comment.negative}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AccordionItem>
    </Accordion>
</main>
