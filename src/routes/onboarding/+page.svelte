<script lang="ts">
    import AccountsStep from "$lib/components/onboarding/AccountsStep.svelte";
    import BudgetStep from "$lib/components/onboarding/BudgetStep.svelte";
    import CategoriesStep from "$lib/components/onboarding/CategoriesStep.svelte";
    import CompleteStep from "$lib/components/onboarding/CompleteStep.svelte";
    import HouseholdStep from "$lib/components/onboarding/HouseholdStep.svelte";
    import OtherUsersStep from "$lib/components/onboarding/OtherUsersStep.svelte";
    import ProfileStep from "$lib/components/onboarding/ProfileStep.svelte";
    import WelcomeStep from "$lib/components/onboarding/WelcomeStep.svelte";
    import type { Component } from "svelte";

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
    
    // let currentStep: Step = "welcome";

    type StepWithComponents = {
        id: string,
        title: string,
        subtitle: string,
        step: Component
    }
    

    const steps: StepWithComponents[] = [
        { id: "welcome", title: "Welcome!", subtitle: "We'll follow a few steps to set up your account! Press the next button below to begin", step: WelcomeStep },
        { id: "user", title: "Set up your profile", subtitle: "", step: ProfileStep },
        { id: "household", title: "Create your household", subtitle: "", step: HouseholdStep },
        { id: "accounts", title: "Create your household", subtitle: "", step: AccountsStep },
        { id: "firstBudget", title: "Create your household", subtitle: "", step: BudgetStep },
        { id: "categories", title: "Create your household", subtitle: "", step: CategoriesStep },
        { id: "otherUsers", title: "Create your household", subtitle: "", step: OtherUsersStep },
        { id: "complete", title: "Create your household", subtitle: "", step: CompleteStep }
    ];

    let currentStepIdx: number = 0;

    $: currentStep = steps[currentStepIdx];
    $: progress = ((currentStepIdx + 1) / steps.length) * 100;

    let onboarding: onboardingData = "";
    
    const next = () => {
        if (currentStepIdx < steps.length - 1) {
            currentStepIdx += 1;
        }
    }

    const back = () => {
        if (currentStepIdx > 0) {
            currentStepIdx -= 1;
        }
    }

    const gotoStep = (index: number) => {
        currentStepIdx = index;
    }

    const finishOnboarding = () => {
        console.log("Finished onboarding new customer. Sending to server...");
        // TODO: Send to backend here...
    }

</script>

<div>
    <h2>Account Setup</h2>
    {#each steps as step, i}
       <button
        on:click={gotoStep(i)}
        class={`w-full text-left px-4 py-3 rounded-xl transition font-medium
          ${
            i === currentStepIdx 
              ? "bg-slate-900 text-white shadow"
              : i < currentStepIdx 
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
       > 
        <div class="text-sm opacity-70">Step {i + 1}</div>
        <div>{step.title}</div>
    </button>
    {/each}

    <h1>{currentStep.title}</h1>
    
    <svelte:component
        this={currentStep.step}
        bind:onboarding
        on:next={next}
        on:back={back}
        on:finish{finish}
    />

    <!-- {#if step === "welcome"}
        <WelcomeStep on:next={next}/>
    {:else if step === "user"}
        <ProfileStep on:next={next}/>
    {:else if step === "household"}
        <AAAAHHHH on:next={next}/>
    {:else if step === "accounts"}
        <AccountStep on:next={next}/>
    {:else if step === "firstBudget"}
        <BudgetStep on:next={next}/>
    {:else if step === "categories"}
        <CategoriesStep on:next={next}/>
    {:else if step === "otherUsers"}
        <on:next={next}/>
    {:else if step === "complete"}
        <CompleteStep {onboarding}/>
    {/if} -->
</div>

<style>

</style>