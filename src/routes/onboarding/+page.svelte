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
    id: string;
    title: string;
    subtitle: string;
    step: Component;
  };

  const steps: StepWithComponents[] = [
    {
      id: "welcome",
      title: "Welcome!",
      subtitle:
        "We'll follow a few steps to set up your account! Press the next button below to begin",
      step: WelcomeStep,
    },
    {
      id: "user",
      title: "Set up your profile",
      subtitle: "",
      step: ProfileStep,
    },
    {
      id: "household",
      title: "Create your household",
      subtitle: "",
      step: HouseholdStep,
    },
    {
      id: "accounts",
      title: "Create your household",
      subtitle: "",
      step: AccountsStep,
    },
    {
      id: "firstBudget",
      title: "Create your household",
      subtitle: "",
      step: BudgetStep,
    },
    {
      id: "categories",
      title: "Create your household",
      subtitle: "",
      step: CategoriesStep,
    },
    {
      id: "otherUsers",
      title: "Create your household",
      subtitle: "",
      step: OtherUsersStep,
    },
    {
      id: "complete",
      title: "Create your household",
      subtitle: "",
      step: CompleteStep,
    },
  ];

  let currentStepIdx: number = 0;

  $: currentStep = steps[currentStepIdx];
  $: progress = ((currentStepIdx + 1) / steps.length) * 100;

  let onboarding: onboardingData = "";

  const next = () => {
    if (currentStepIdx < steps.length - 1) {
      currentStepIdx += 1;
    }
  };

  const back = () => {
    if (currentStepIdx > 0) {
      currentStepIdx -= 1;
    }
  };

  const gotoStep = (index: number) => {
    currentStepIdx = index;
  };

  const finishOnboarding = () => {
    console.log("Finished onboarding new customer. Sending to server...");
    // TODO: Send to backend here...
  };
</script>

<div class="min-h-screen bg-slate-50 flex">
  <!-- Sidebar -->
  <aside class="w-72 border-r border-slate-200 bg-white p-6 hidden md:block">
    <h2 class="text-xl font-bold text-slate-900 mb-6">Getting Started</h2>

    <div class="space-y-2">
      {#each steps as step, i}
        <button
          on:click={() => gotoStep(i)}
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
    </div>
  </aside>

  <!-- Main -->
  <main class="flex-1 flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200 px-6 py-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-500">
            Step {currentStepIdx + 1} of {steps.length}
          </p>
          <h1 class="text-2xl font-bold text-slate-900">
            {currentStep.title}
          </h1>
        </div>

        <div class="text-sm text-slate-500 hidden sm:block">
          {Math.round(progress)}% complete
        </div>
      </div>

      <!-- Progress -->
      <div class="mt-4 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          class="h-full bg-slate-900 transition-all duration-300"
          style={`width:${progress}%`}
        />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 p-6 md:p-10">
      <div
        class="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
      >
        <svelte:component
          this={currentStep.step}
          bind:onboarding
          on:next={next}
          on:back={back}
          on:finish={finish}
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-slate-200 bg-white px-6 py-4">
      <div class="max-w-3xl mx-auto flex items-center justify-between">
        <button
          on:click={back}
          disabled={currentStepIdx === 0}
          class="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
        >
          Back
        </button>

        {#if currentStepIdx < steps.length - 1}
          <button
            on:click={next}
            class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800"
          >
            Continue
          </button>
        {:else}
          <button
            on:click={finishOnboarding}
            class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Finish Setup
          </button>
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
</style>
