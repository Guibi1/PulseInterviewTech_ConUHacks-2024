<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import Logo from "./Logo.svelte";
    import { pdfUploadSchema } from "$lib/zod";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;

    const { form, errors, constraints, message, enhance } = superForm(data.form, {
        SPA: true,
        validators: zodClient(pdfUploadSchema),
        async onSubmit({ formData }) {
            const t = formData.get("pdf") as File;
            console.log("🚀 ~ onSubmit ~ t:", t);
            console.log("🚀 ~ onSubmit ~ formData:", formData);
            fetch(data.uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
                body: await t.arrayBuffer(),
            })
                .then((response) => response.text())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));
        },
    });

    const onFileInput = (e: { currentTarget: HTMLInputElement }) =>
        ($form.pdf = e.currentTarget.files?.item(0) as File);
</script>

<div class="container mx-auto flex h-full items-center justify-center">
    <form method="POST" enctype="multipart/form-data" use:enhance>
        {#if $message}<h3>{$message}</h3>{/if}

        <input
            type="file"
            name="pdf"
            accept="application/pdf"
            on:input={onFileInput}
            aria-invalid={$errors.pdf ? "true" : undefined}
            {...$constraints.pdf}
        />

        <button type="submit" class="button variant-filled-primary">Submit</button>
    </form>

    <div class="flex flex-col items-center space-y-10 text-center">
        <h2 class="h2">Welcome to Skeleton.</h2>
        <Logo />
        <!-- Animated Logo -->
        <div class="flex justify-center space-x-2">
            <a
                class="btn variant-filled"
                href="https://skeleton.dev/"
                target="_blank"
                rel="noreferrer"
            >
                Launch Documentation
            </a>
        </div>
        <div class="space-y-2">
            <p>Try editing the following:</p>
            <p><code class="code">/src/routes/+layout.svelte</code></p>
            <p><code class="code">/src/routes/+page.svelte</code></p>
        </div>
    </div>
</div>
