<!-- routes/plan/+page.svelte -->
<script>
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { selectedUserStore } from "$lib/stores.js";

    export let form;

</script>

<p>Current Plan: {$selectedUserStore.plan_id}</p>

<h3>Free Plan</h3>
<ul>
    <li>Limited to 5 book generations a day</li>
    <li>Limited to 5 individual image regenerations a day</li>
</ul>
<p>{$selectedUserStore.email}</p>
<form action="?/plan" method="POST" use:enhance>
    <input type="hidden" name="email" value="{$selectedUserStore.email}" />
    <input type="hidden" name="plan_id" value="p_0" />
    {#if $selectedUserStore.plan_id == "p_0"}
        You are on this plan
    {:else}
        <button type="submit">Cancel Plan</button>
    {/if}
</form>
<h3>Basic Plan</h3>
<ul>
    <li>25 book generations a day</li>
    <li>100 individual image regenerations a day</li>
</ul>
<form action="?/plan" method="POST" use:enhance>
    <input type="hidden" name="email" value="{$selectedUserStore.email}" />
    <input type="hidden" name="plan_id" value="p_1" />
    {#if $selectedUserStore.plan_id == "p_1"}
        You are on this plan
    {:else}
        <button type="submit">Choose Plan</button>
    {/if}
</form>
<h3>Premium Plan</h3>
<ul>
    <li>Unlimited book generations</li>
    <li>Unlimited image regenerations</li>
</ul>
<form action="?/plan" method="POST" use:enhance>
    <input type="hidden" name="email" value="{$selectedUserStore.email}" />
    <input type="hidden" name="plan_id" value="p_2" />
    {#if $selectedUserStore.plan_id == "p_2"}
        You are on this plan
    {:else}
        <button type="submit">Choose Plan</button>
    {/if}
</form>
