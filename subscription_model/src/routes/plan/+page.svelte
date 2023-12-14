<!-- routes/plan/+page.svelte -->
<script>
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    let selectedPlan = 'free'; // default selected plan
    export let form;
    $: if (form && form.url){goto(form.url)}
</script>

<form action="/plan" method="POST" use:enhance>
    <label for="plan-select">Choose a plan:</label>
    <select name='plan' id="plan-select" bind:value={selectedPlan}>
        <option value="free">Free Plan</option>
        <option value="basic">Basic Plan</option>
        <option value="premium">Premium Plan</option>
    </select>
    <button type="submit">Choose Plan</button>
</form>