<script lang="ts">
    import AccountStep from "$lib/components/onboarding/AccountStep.svelte";
    import BudgetStep from "$lib/components/onboarding/BudgetStep.svelte";
    import CategoriesStep from "$lib/components/onboarding/CategoriesStep.svelte";
    import CompleteStep from "$lib/components/onboarding/CompleteStep.svelte";
    import ProfileStep from "$lib/components/onboarding/ProfileStep.svelte";
    import WelcomeStep from "$lib/components/onboarding/WelcomeStep.svelte";

    interface onboardingData {}

    type Step = 
        | "welcome"
        | "user"
        | "household"
        | "accounts"
        | "firstBudget"
        | "categories"
        | "otherUsers"
        | "complete";
    
    let currentStep: Step = "welcome";

    let onboarding: onboardingData = "";

    const next = () => {
        const order: Step[] = [
            "welcome",
            "user",
            "household",
            "accounts",
            "firstBudget",
            "categories",
            "otherUsers",
            "complete"
        ];

        const index = order.indexOf(currentStep);
        currentStep = order[index + 1];
    }

    const back = () => {
        const order: Step[] = [
            "welcome",
            "user",
            "household",
            "accounts",
            "firstBudget",
            "categories",
            "otherUsers",
            "complete"
        ];

        const index = order.indexOf(currentStep);
        currentStep = order[index - 1];
    }

</script>

<div>
    {#if step === "welcome"}
        <WelcomeStep on:next={next}/>
    {:else if step === "welcome"}
        <WelcomeStep on:next={next}/>
    {:else if step === "user"}
        <WelcomeStep on:next={next}/>
    {:else if step === "household"}
        <WelcomeStep on:next={next}/>
    {:else if step === "accounts"}
        <WelcomeStep on:next={next}/>
    {:else if step === "firstBudget"}
        <WelcomeStep on:next={next}/>
    {:else if step === "categories"}
        <WelcomeStep on:next={next}/>
    {:else if step === "otherUsers"}
        <WelcomeStep on:next={next}/>
    {:else if step === "complete"}
        <CompleteStep {onboarding}/>
    {/if}
</div>

<style>

</style>