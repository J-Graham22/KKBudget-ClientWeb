<script lang="ts">
    import type Transaction from "$lib/types/Transaction";
    import { createEventDispatcher } from "svelte";

    interface TransactionsTableProps {
      transactions: Transaction[],
      showAccount: boolean,
      showSearch: boolean, 
      showCategoryFilter: boolean,
    }

    let { 
      transactions = [],
      showAccount = true,
      showSearch = true,
      showCategoryFilter = true,
     }: TransactionsTableProps = $props();

    const normalize = (value: unknown) =>
      String(value ?? "").toLowerCase().trim();

    const dispatchEvent = createEventDispatcher<{
        edit: { transaction: Transaction };
        delete: { transaction: Transaction };
        rowClick: { transaction: Transaction };
    }>();
  
    let sortKey: keyof Transaction | "date" | "amount" | "description" | "category" = $state("date");
    let sortDirection: "asc" | "desc" = $state("asc");
    let selectedCategory: string = $state("All");
    let search: string = $state("");

    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
  
    const formatDate = (date: string) =>
      new Date(date).toLocaleDateString();

    const toggleSort = (key: typeof sortKey) => {
        if (sortKey == key) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortKey = key;
            sortDirection = key === "date" ? "desc" : "asc";
        }
        console.log(sortKey);
        console.log(sortDirection);
    };


    // $: categories = [
    let categories = [
        "All",
        ...Array.from(
          new Set(
            transactions.flatMap(t => t.categories)
          )
        ).sort()
    ];

    // $: filteredTransactions = transactions.filter((tx) => {
    let filteredTransactions = $derived(transactions.filter((tx) => {
        const matchesCategory: boolean = selectedCategory === "All" || tx.categories.includes(selectedCategory);

        const q = normalize(search);

        const matchSearch: boolean = 
            !q ||
            normalize(tx.description).includes(q) ||
            normalize(tx.name).includes(q) ||
            tx.categories.some(c => normalize(c).includes(q)) ||
            normalize(tx.account).includes(q) ||
            normalize(tx.amount.toString()).includes(q) ||
            normalize(tx.date.toString()).includes(q);

        return matchSearch && matchesCategory;
    }));

    // $: sortedTransactions = [...filteredTransactions].sort(compareTransactions);
    let sortedTransactions = $derived([...filteredTransactions].sort((a: Transaction, b: Transaction) => {
        let aVal: unknown = a[sortKey as keyof Transaction];      
        let bVal: unknown = b[sortKey as keyof Transaction];      

        if (sortKey == "date") {
            aVal = new Date(a.date).getTime();
            bVal = new Date(b.date).getTime();
        }

        if (sortKey == "amount") {
            aVal = a.amount;
            bVal = b.amount;
        }

        if (sortKey == "category") {
            let aCategories = a.categories;
            let bCategories = b.categories;

            if (aCategories.length != bCategories.length) {
                const result = aCategories.length - bCategories.length;
                return sortDirection === "asc" ? -result : result;
            } else {
                const aSorted = aCategories.sort();
                const bSorted = bCategories.sort();

                for(let i = 0; i < aSorted.length; i++) {
                  const result = aSorted[i].localeCompare(bSorted[i]);
                  if (result != 0) {
                    return sortDirection === "asc" ? result : -result;
                  }
                }
                return 0;
            }
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
            const result = aVal.localeCompare(bVal);
            return sortDirection === "asc" ? result : -result;
        }

        const aNum = Number(aVal ?? 0);
        const bNum = Number(bVal ?? 0);
        const result = aNum - bNum;

        return sortDirection === "asc" ? result : -result;
    }));

    const onEdit = (tx: Transaction) => {
        dispatchEvent("edit", { transaction: tx})
    };

    const onDelete = (tx: Transaction) => {
        dispatchEvent("delete", { transaction: tx})
    };

    const onRowClicked = (tx: Transaction) => {
        dispatchEvent("rowClick", { transaction: tx})
    };


</script>
 
<div class="table-container">
  <table class="transactions">
    <thead>
      <tr>
        <th>
            <button type="button" on:click={() => toggleSort("date")}>
              Date
              {#if sortKey === "date"}{sortDirection === "asc" ? " ↑" : " ↓"}{/if}
            </button>
        </th>

        <th>
            <button type="button" on:click={() => toggleSort("description")}>
                Description
              {#if sortKey === "description"}{sortDirection === "asc" ? " ↑" : " ↓"}{/if}
            </button>
        </th>
        <th>
            <button type="button" on:click={() => toggleSort("category")}>
                Category
              {#if sortKey === "category"}{sortDirection === "asc" ? " ↑" : " ↓"}{/if}
            </button>
        </th>
        <th>
            <button type="button" on:click={() => toggleSort("account")}>
                Account
              {#if sortKey === "account"}{sortDirection === "asc" ? " ↑" : " ↓"}{/if}
            </button>
        </th>
        <th class="amount">
            <button type="button" on:click={() => toggleSort("amount")}>
                Amount
              {#if sortKey === "amount"}{sortDirection === "asc" ? " ↑" : " ↓"}{/if}
            </button>
        </th>

        <th class="actions">Actions</th>
      </tr>
    </thead>
  
    <tbody>
      {#if sortedTransactions.length === 0}
        <tr>
          <td colspan={showAccount ? 6 : 5} class="empty">No matching transactions</td>
        </tr>
      {:else}
        {#each sortedTransactions as tx (tx.id)}
            <tr on:click={() => onRowClicked(tx)}>
                <td>{formatDate(tx.date.toLocaleString())}</td>
                <td class="description-cell">
                    <div class="description">{tx.description}</div>
                </td>
                <td>
                     <div class="category-list">
                      {#each tx.categories as category}
                        <!-- <span class={`badge ${getCategoryClass(category)}`}> -->
                        <span>
                          {category}
                        </span>
                      {/each}
                     </div>
                </td>
                {#if showAccount}
                    <td>{tx.account ?? "-"}</td>
                {/if}
                <td class:negative={tx.amount < 0} class:positive={tx.amount > 0} class="amount">
                    {formatCurrency(tx.amount)}
                </td>
                <td class="actions" on:click|stopPropagation>
                    <button type="button" class="edit" on:click={() => onEdit(tx)}>Edit</button>
                    <button type="button" class="delete" on:click={() => onDelete(tx)}>Delete</button>
                </td>
            </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>  
  
  <style>
  </style>
  