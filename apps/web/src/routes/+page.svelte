<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import Logo from "./Logo.svelte";
</script>

<main class="mx-auto flex flex-col items-center gap-8 py-8 text-center">
    <h1 class="h1 !font-sans font-bold">
        The first
        <span
            class="bg-gradient-to-br from-red-500 to-yellow-500 box-decoration-clone bg-clip-text text-transparent"
        >
            realistic
        </span> <br />
        interview training app
    </h1>

    <Logo size={"7rem"} />

    <p class="p !font-serif text-5xl italic">
        Getting an interview is hard enough, why not ace it?
    </p>

    <button class="btn btn-xl variant-ghost-secondary my-4 text-2xl" on:click={() => signIn("a0")}>
        Sign in with Auth0
    </button>

    <div class="grid max-w-screen-lg grid-cols-3 gap-8">
        <p class="card card-hover flex items-center justify-center p-12 text-xl">
            Train your interview skills with real and relevent questions about your domain of
            expertise.
        </p>

        <p class="card card-hover flex items-center justify-center p-12 text-xl">
            Build a CV that is readable and organised quickly to concentratre yourself on
            applications intead.
        </p>

        <p class="card card-hover flex items-center justify-center p-12 text-xl">
            Receive pertinent feedback about your speech speed and your formality.
        </p>
    </div>
</main>
