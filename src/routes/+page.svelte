<script lang="ts">
    import type Transaction from "$lib/types/Transaction";
    import TransactionsTable from "$lib/components/TransactionsTable.svelte";

    const testTransactions: Transaction[] = [
    {
      id: 1,
      date: "2026-03-01",
      description: "Paycheck",
      categories: ["Income"],
      amount: 2200,
      account: "Checking",
      name: "name",
    },
    {
      id: 2,
      date: "2026-03-02",
      description: "Grocery Store",
      categories: ["Food"],
      amount: -54.83,
      account: "Checking",
      name: "name",
    },
    {
      id: 3,
      date: "2026-03-03",
      description: "Electric Bill",
      categories: ["Required", "Utilities"],
      amount: -89.12,
      account: "Credit Card",
      name: "name",
    }
  ];
</script>

<div>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    <TransactionsTable 
      transactions = {testTransactions}
      showAccount =  {true}
      showSearch =  {true}
      showCategoryFilter = {true}
    />
</div>
