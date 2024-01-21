<script lang="ts">
    import { goto } from "$app/navigation";
    import { cvUploadSchema } from "$lib/zod";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;

    const { form, errors, message, enhance } = superForm(data.form, {
        SPA: true,
        validators: zodClient(cvUploadSchema),
        async onUpdate({ form }) {
            if (!form.valid) return;
            await fetch(data.cvUpload.url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
                body: await form.data.pdf.arrayBuffer(),
            }).catch((error) => console.error("Error uploading CV:", error));

            console.log("SUCESS");
            setTimeout(() => goto("/loading"), 1000);
        },
    });

    const onFileInput = (e: { currentTarget: HTMLInputElement }) =>
        ($form.pdf = e.currentTarget.files?.item(0) as File);
</script>

<main class="container mx-auto flex h-full flex-col items-center justify-center gap-4">
    <h1 class="h1">Test your interviewing skills</h1>

    <form class="flex flex-col gap-4" method="POST" enctype="multipart/form-data" use:enhance>
        {#if $message}<h3>{$message}</h3>{/if}

        <label class="label">
            <span> Curiculum Vitae </span>

            <input
                class={`input ${$errors.pdf ? "input-error" : ""}`}
                type="file"
                name="pdf"
                accept="application/pdf"
                on:input={onFileInput}
                aria-invalid={$errors.pdf ? "true" : undefined}
            />

            {#if $errors.pdf}
                <span class="text-error-500-400-token">{$errors.pdf?.at(0)}</span>
            {/if}
        </label>

        <button type="submit" class="btn variant-filled-primary">Submit</button>
    </form>
</main>
