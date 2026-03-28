<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface ProfileData {
        name: string,
        currency: string
    }

    export let data: ProfileData = {
        name: "",
        currency: "USD"
    };

    const dispatch = createEventDispatcher();

    const submit = () => {
        dispatch("next");
    };
</script>

<div>
    <h2>Create your profile</h2>
    <input bind:value={data.name} placeholder="Your Name"/>
    <select bind:value={data.currency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
    </select>
    <button on:click={submit}>Next</button>
</div>

<style>

</style>