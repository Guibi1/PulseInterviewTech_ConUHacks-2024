<script lang="ts">
    import { goto } from "$app/navigation";
    import { videoUploadSchema } from "$lib/zod";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;
    let liveVideoPreviewRef: HTMLVideoElement;
    let completedVideoPreviewSrc: string = "";
    let recorder: MediaRecorder;

    const { form, errors, message, enhance } = superForm(data.form, {
        SPA: true,
        validators: zodClient(videoUploadSchema),
        async onUpdate({ form }) {
            if (!form.valid) return;
            await fetch(data.videoUpload.url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
                body: await form.data.video.arrayBuffer(),
            }).catch((error) => console.error("Error uploading video:", error));

            console.log("SUCCESS");
            setTimeout(async () => {
                await goto("/loading");
            }, 1000);
        },
    });

    async function stopRecording() {
        liveVideoPreviewRef.srcObject = null;
        if (recorder) {
            recorder.stop();
            recorder.stream.getTracks().forEach((track) => track.stop());
            recorder = recorder;
        }
    }

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        completedVideoPreviewSrc = "";
        liveVideoPreviewRef.srcObject = stream;
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        const data: Blob[] = [];

        // Wait for the camera to start
        await new Promise((resolve) => (liveVideoPreviewRef.onplaying = resolve));

        // Handle recording event
        const recording = new Promise((resolve, reject) => {
            recorder.ondataavailable = (event) => data.push(event.data);
            recorder.onstop = resolve;
            recorder.onerror = reject;
        });

        // Adds a max recording time
        const maxRecordingTime = setTimeout(stopRecording, 60_000);

        // Start the recording and wait for it to finish
        recorder.start();
        await recording;
        clearTimeout(maxRecordingTime);

        try {
            // Handle finished recording
            $form.video = new File(data, "interview.webm", { type: "video/webm" });
            completedVideoPreviewSrc = URL.createObjectURL($form.video);
        } catch (e) {
            console.error(e);
        }
    }
</script>

<main
    class="container mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-4"
>
    <h1 class="h3">
        {data.question}
    </h1>

    <form class="flex flex-col gap-4" method="POST" enctype="multipart/form-data" use:enhance>
        {#if $message}<h3>{$message}</h3>{/if}

        <label class="label">
            <div class={`input ${$errors.video ? "input-error" : ""}`}>
                <div class="flex aspect-video h-[30rem] justify-center p-2">
                    {#if completedVideoPreviewSrc}
                        <!-- svelte-ignore a11y-media-has-caption -->
                        <video
                            class="h-full"
                            src={completedVideoPreviewSrc}
                            controls={!!completedVideoPreviewSrc}
                        />
                    {/if}

                    <video
                        class="h-full"
                        hidden={!!completedVideoPreviewSrc}
                        bind:this={liveVideoPreviewRef}
                        autoplay
                        muted
                    />
                </div>

                <div class="mb-2 flex justify-center gap-4">
                    <button
                        on:click={startRecording}
                        disabled={recorder?.state === "recording"}
                        class="btn variant-filled"
                        type="button"
                    >
                        Start recording
                    </button>

                    <button
                        on:click={stopRecording}
                        disabled={recorder?.state !== "recording"}
                        class="btn variant-filled"
                        type="button"
                    >
                        Stop
                    </button>
                </div>
            </div>

            {#if $errors.video}
                <span class="text-error-500-400-token">{$errors.video?.at(0)}</span>
            {/if}
        </label>

        <button type="submit" class="btn variant-filled-primary">Next question</button>
    </form>
</main>
