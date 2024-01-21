<script lang="ts">
    import { goto } from "$app/navigation";
    import { videoUploadSchema } from "$lib/zod";
    import { onMount } from "svelte";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;
    let liveVideoPreviewRef: HTMLVideoElement;
    let completedVideoPreviewSrc: string = "";
    let recorder: Promise<MediaRecorder>;
    let recording = false;

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
            setTimeout(() => (window.location.href = "/loading"), 2000);
        },
    });

    async function stopRecording() {
        const rec = await recorder;
        if (rec) {
            rec.stop();
            recording = false;
        }
    }

    async function startRecording() {
        completedVideoPreviewSrc = "";
        const data: Blob[] = [];

        // Wait for the camera to start
        const rec = await recorder;

        // Handle recording event
        const recorderEnd = new Promise((resolve, reject) => {
            rec.ondataavailable = (event) => data.push(event.data);
            rec.onstop = resolve;
            rec.onerror = reject;
        });

        // Adds a max recording time
        const maxRecordingTime = setTimeout(stopRecording, 60_000);

        // Start the recording and wait for it to finish
        rec.start();
        recording = true;
        await recorderEnd;
        clearTimeout(maxRecordingTime);
        try {
            // Handle finished recording
            $form.video = new File(data, "interview.webm", { type: "video/webm" });
            completedVideoPreviewSrc = URL.createObjectURL($form.video);
        } catch (e) {
            console.error(e);
        }
    }

    onMount(() => {
        recorder = navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then(async (stream) => {
                liveVideoPreviewRef.srcObject = stream;
                const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp8,opus" });
                await new Promise((res) => (liveVideoPreviewRef.onplaying = res));
                await new Promise((res) => setTimeout(res, 200));
                return rec;
            });

        return async () => {
            liveVideoPreviewRef.srcObject = null;
            await stopRecording();
            (await recorder).stream.getTracks().forEach((track) => track.stop());
        };
    });
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
                        disabled={recording}
                        class="btn variant-filled"
                        type="button"
                    >
                        Start recording
                    </button>

                    <button
                        on:click={stopRecording}
                        disabled={!recording}
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
