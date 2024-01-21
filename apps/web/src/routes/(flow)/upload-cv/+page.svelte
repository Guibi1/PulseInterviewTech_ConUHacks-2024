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
            setTimeout(() => (window.location.href = "/loading"), 3000);
        },
    });

    function onChangeHandler() {
        $form.pdf = files?.item(0) as File;
    }
</script>

<main class="container mx-auto max-w-screen-md px-4 py-8">
    <form
        class="flex flex-col items-center gap-4"
        method="POST"
        enctype="multipart/form-data"
        use:enhance
    >
        <h1 class="h1 pb-4">Interview simulator</h1>

        {#if $message}<h3>{$message}</h3>{/if}

        <FileDropzone
            class={`input ${$errors.pdf ? "input-error" : ""} bg-secondary-500/20`}
            id="cv-input"
            type="file"
            name="pdf"
            accept="application/pdf"
            bind:files
            on:change={onChangeHandler}
            aria-invalid={$errors.pdf ? "true" : undefined}
            border="border-secondary-400-500-token"
        >
            <h2 class="h3 px-4" slot="message">Upload your CV as a pdf</h2>

            <svelte:fragment slot="meta">
                {#if $form.pdf}
                    <h4 class="h4 pt-4">
                        {files[0].name}
                    </h4>
                {/if}
            </svelte:fragment>
        </FileDropzone>
        <a class="anchor" href="/generate-cv">Don't have a CV? Generate one here!</a>

        {#if $errors.pdf}
            <span class="text-error-500-400-token">{$errors.pdf?.at(0)}</span>
        {/if}

        <button type="submit" class="btn btn-xl variant-ghost-primary">Submit</button>
    </form>
</main>
