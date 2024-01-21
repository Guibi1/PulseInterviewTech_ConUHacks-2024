<script lang="ts">
    import { goto } from "$app/navigation";
    import { cvUploadSchema } from "$lib/zod";
    import { FileDropzone } from "@skeletonlabs/skeleton";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;
    let files: FileList;

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
            setTimeout(() => (window.location.href = "/loading"), 1000);
        },
    });

    function onChangeHandler() {
        $form.pdf = files?.item(0) as File;
    }
</script>

<main class="container mx-auto flex h-full flex-col items-center justify-center gap-4">
    <h1 class="h1">Interview simulator</h1>
    <form class="flex flex-col gap-4" method="POST" enctype="multipart/form-data" use:enhance>
        {#if $message}<h3>{$message}</h3>{/if}

        <FileDropzone
            class={`input ${$errors.pdf ? "input-error" : ""}`}
            id="cv-input"
            type="file"
            name="pdf"
            accept="application/pdf"
            bind:files
            on:change={onChangeHandler}
            aria-invalid={$errors.pdf ? "true" : undefined}
        >
            <h2 class="h2 px-4" slot="message">Upload your CV as a pdf</h2>
            <h4 class="h4" slot="meta">
                {#if $form.pdf}
                    {files[0].name}
                {/if}
            </h4>
        </FileDropzone>
        <a class="anchor" href="/generate-cv">Don't have a CV? Generate one here!</a>

        {#if $errors.pdf}
            <span class="text-error-500-400-token">{$errors.pdf?.at(0)}</span>
        {/if}

        <button type="submit" class="btn variant-filled-primary">Submit</button>
    </form>
</main>
