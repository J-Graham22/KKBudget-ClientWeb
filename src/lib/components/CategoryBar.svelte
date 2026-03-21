<script lang="ts">
    interface CategoryBarProps {
        categoryName: string, 
        allotedAmount: number,
        currentAmount: number,
    }

    let { 
        categoryName,
        allotedAmount,
        currentAmount,
     }: CategoryBarProps = $props();

    let safeCurrentAmount = $state(Math.max(0, Math.min(currentAmount, allotedAmount)));
    let percentage = $derived(allotedAmount > 0 ? (safeCurrentAmount / allotedAmount) * 100.0 : 0);

    let colorClass = 
     percentage > 60
     ? 'bg-green-500'
     : percentage > 30
     ? 'bg-yellow-500'
     : 'bg-red-500';

</script>

<div>
    <label>{categoryName}</label>
    <div class="w-full h-5 bg-gray-700 rounded overflow-hidden relative">
        <div
            class={`h-full ${colorClass} transition-all duration-300 ease-out`}
            style="width: {percentage}%">
        </div>
    </div>
    <label>{percentage}%</label>
</div>

<style>

</style>