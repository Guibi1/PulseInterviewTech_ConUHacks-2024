<script lang="ts">
    import { cvBuilderSchema } from "$lib/zod";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;
    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: zodClient(cvBuilderSchema),
        dataType: "json",
        async onUpdate({ form }) {
            if (!form.valid) return;

            console.log("SUCCESS");
        },
    });

    $: console.log($form);

    function add(section: Exclude<keyof typeof $form, "info">) {
        $form[section].push({} as any);
        $form[section] = $form[section] as any;
    }
</script>

<main class="container mx-auto flex h-full flex-col items-center justify-center gap-4 py-4">
    <h1 class="h1 pb-2">Test your interviewing skills</h1>

    <form
        class="flex w-full max-w-lg flex-col gap-4"
        method="POST"
        enctype="multipart/form-data"
        use:enhance
    >
        {#if $message}
            <span>{$message}</span>
        {/if}

        <section class="mb-4 grid gap-2">
            <h3 class="h3">Personnal informations</h3>

            <label class="label">
                <span> Name </span>

                <input
                    class={`input ${$errors.info?.name ? "input-error" : ""}`}
                    type="text"
                    bind:value={$form.info.name}
                    aria-invalid={$errors.info?.name ? "true" : undefined}
                />

                {#if $errors.info?.name}
                    <span class="text-error-500-400-token">{$errors.info.name.at(0)}</span>
                {/if}
            </label>

            <label class="label">
                <span> Email </span>

                <input
                    class={`input ${$errors.info?.email ? "input-error" : ""}`}
                    type="text"
                    bind:value={$form.info.email}
                    aria-invalid={$errors.info?.email ? "true" : undefined}
                />

                {#if $errors.info?.email}
                    <span class="text-error-500-400-token">{$errors.info.email.at(0)}</span>
                {/if}
            </label>

            <label class="label">
                <span> Number </span>

                <input
                    class={`input ${$errors.info?.number ? "input-error" : ""}`}
                    type="tel"
                    bind:value={$form.info.number}
                    aria-invalid={$errors.info?.number ? "true" : undefined}
                />

                {#if $errors.info?.number}
                    <span class="text-error-500-400-token">{$errors.info.number.at(0)}</span>
                {/if}
            </label>

            <label class="label">
                <span> Address </span>

                <input
                    class={`input ${$errors.info?.address ? "input-error" : ""}`}
                    type="text"
                    bind:value={$form.info.address}
                    aria-invalid={$errors.info?.address ? "true" : undefined}
                />

                {#if $errors.info?.address}
                    <span class="text-error-500-400-token">{$errors.info.address.at(0)}</span>
                {/if}
            </label>
        </section>

        <section class="mbgridx-col ga2-4">
            <h3 class="h3 flex items-center justify-between">
                Work experience
                <button
                    on:click={() => add("workexperience")}
                    class="btn btn-icon variant-ghost-primary"
                    type="button">+</button
                >
            </h3>

            {#each $form.workexperience as _, i}
                <label class="label">
                    <span> Title </span>

                    <input
                        class={`input ${$errors.workexperience?.[i]?.title ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.workexperience[i].title}
                        aria-invalid={$errors.workexperience?.[i]?.title ? "true" : undefined}
                    />

                    {#if $errors.workexperience?.[i]?.title}
                        <span class="text-error-500-400-token">
                            {$errors.workexperience?.[i].title?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Company </span>

                    <input
                        class={`input ${$errors.workexperience?.[i]?.company ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.workexperience[i].company}
                        aria-invalid={$errors.workexperience?.[i]?.company ? "true" : undefined}
                    />

                    {#if $errors.workexperience?.[i]?.company}
                        <span class="text-error-500-400-token">
                            {$errors.workexperience?.[i].company?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Period </span>

                    <input
                        class={`input ${$errors.workexperience?.[i]?.period ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.workexperience[i].period}
                        aria-invalid={$errors.workexperience?.[i]?.period ? "true" : undefined}
                    />

                    {#if $errors.workexperience?.[i]?.period}
                        <span class="text-error-500-400-token">
                            {$errors.workexperience?.[i].period?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Description </span>

                    <input
                        class={`input ${$errors.workexperience?.[i]?.description ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.workexperience[i].description}
                        aria-invalid={$errors.workexperience?.[i]?.description ? "true" : undefined}
                    />

                    {#if $errors.workexperience?.[i]?.description}
                        <span class="text-error-500-400-token">
                            {$errors.workexperience?.[i].description?.at(0)}
                        </span>
                    {/if}
                </label>
            {/each}
        </section>

        <section class="mbgridx-col ga2-4">
            <h3 class="h3 flex items-center justify-between">
                Skills
                <button
                    on:click={() => add("skills")}
                    class="btn btn-icon variant-ghost-primary"
                    type="button">+</button
                >
            </h3>

            {#each $form.skills as _, i}
                <label class="label">
                    <span> Name </span>

                    <input
                        class={`input ${$errors.skills?.[i]?.name ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.skills[i].name}
                        aria-invalid={$errors.skills?.[i]?.name ? "true" : undefined}
                    />

                    {#if $errors.skills?.[i]?.name}
                        <span class="text-error-500-400-token">
                            {$errors.skills?.[i].name?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Rating </span>

                    <input
                        class={`input ${$errors.skills?.[i]?.rating ? "input-error" : ""}`}
                        type="range"
                        {...$constraints.skills?.rating}
                        bind:value={$form.skills[i].rating}
                        aria-invalid={$errors.skills?.[i]?.rating ? "true" : undefined}
                    />

                    {#if $errors.skills?.[i]?.rating}
                        <span class="text-error-500-400-token">
                            {$errors.skills?.[i].rating?.at(0)}
                        </span>
                    {/if}
                </label>
            {/each}
        </section>

        <section class="mb-4 grid gap-2">
            <h3 class="h3 flex items-center justify-between">
                Languages
                <button
                    on:click={() => add("languages")}
                    class="btn btn-icon variant-ghost-primary"
                    type="button">+</button
                >
            </h3>

            {#each $form.languages as _, i}
                <label class="label">
                    <span> Name </span>

                    <input
                        class={`input ${$errors.languages?.[i]?.name ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.languages[i].name}
                        aria-invalid={$errors.languages?.[i]?.name ? "true" : undefined}
                    />

                    {#if $errors.languages?.[i]?.name}
                        <span class="text-error-500-400-token">
                            {$errors.languages?.[i].name?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Rating </span>

                    <input
                        class={`input ${$errors.languages?.[i]?.rating ? "input-error" : ""}`}
                        type="range"
                        {...$constraints.skills?.rating}
                        bind:value={$form.languages[i].rating}
                        aria-invalid={$errors.languages?.[i]?.rating ? "true" : undefined}
                    />

                    {#if $errors.languages?.[i]?.rating}
                        <span class="text-error-500-400-token">
                            {$errors.languages?.[i].rating?.at(0)}
                        </span>
                    {/if}
                </label>
            {/each}
        </section>

        <section class="mb-4 grid gap-2">
            <h3 class="h3 flex items-center justify-between">
                Education
                <button
                    on:click={() => add("education")}
                    class="btn btn-icon variant-ghost-primary"
                    type="button">+</button
                >
            </h3>

            {#each $form.education as _, i}
                <label class="label">
                    <span> Institution </span>

                    <input
                        class={`input ${$errors.education?.[i]?.institution ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.education[i].institution}
                        aria-invalid={$errors.education?.[i]?.institution ? "true" : undefined}
                    />

                    {#if $errors.education?.[i]?.institution}
                        <span class="text-error-500-400-token">
                            {$errors.education?.[i].institution?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Degree </span>

                    <input
                        class={`input ${$errors.education?.[i]?.degree ? "input-error" : ""}`}
                        type="text"
                        bind:value={$form.education[i].degree}
                        aria-invalid={$errors.education?.[i]?.degree ? "true" : undefined}
                    />

                    {#if $errors.education?.[i]?.degree}
                        <span class="text-error-500-400-token">
                            {$errors.education?.[i].degree?.at(0)}
                        </span>
                    {/if}
                </label>

                <label class="label">
                    <span> Year </span>

                    <input
                        class={`input ${$errors.education?.[i]?.year ? "input-error" : ""}`}
                        type="number"
                        bind:value={$form.education[i].year}
                        aria-invalid={$errors.education?.[i]?.year ? "true" : undefined}
                    />

                    {#if $errors.education?.[i]?.year}
                        <span class="text-error-500-400-token">
                            {$errors.education?.[i].year?.at(0)}
                        </span>
                    {/if}
                </label>
            {/each}
        </section>

        <button type="submit" class="btn variant-filled-primary">Submit</button>
    </form>
</main>
