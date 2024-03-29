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

    const { form, errors, submitting, enhance } = superForm(data.form, {
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
            window.location.href = `/loading?from=${data.step}`;
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

    <form
        class="flex flex-col items-center gap-4"
        method="POST"
        enctype="multipart/form-data"
        use:enhance
    >
        <div class="h-[30rem]">
            {#if completedVideoPreviewSrc}
                <!-- svelte-ignore a11y-media-has-caption -->
                <video
                    class="variant-outline-secondary rounded-xl p-0.5 ring-2"
                    src={completedVideoPreviewSrc}
                    controls={!!completedVideoPreviewSrc}
                />
            {/if}

            <video
                class="variant-outline-secondary rounded-xl p-0.5 ring-2"
                hidden={!!completedVideoPreviewSrc}
                bind:this={liveVideoPreviewRef}
                autoplay
                muted
            />
        </div>

        <div class="mb-2 flex justify-center gap-4">
            <button
                on:click={startRecording}
                disabled={recording || $submitting}
                class="btn variant-ghost-tertiary"
                type="button"
            >
                Start recording
            </button>

            <button
                on:click={stopRecording}
                disabled={!recording || $submitting}
                class="btn variant-ghost-tertiary"
                type="button"
            >
                Stop
            </button>
        </div>

        {#if $errors.video}
            <span class="text-error-500-400-token">{$errors.video?.at(0)}</span>
        {/if}

        <button type="submit" disabled={$submitting} class="btn btn-xl variant-ghost-primary"
            >Next question</button
        >
    </form>
</main>
