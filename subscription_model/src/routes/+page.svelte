<!-- src/routes/+page.svelte -->
<script>
    import { selectedUserStore } from '$lib/stores.js'
    export let data;
    console.log(`data: ${JSON.stringify(data)}`);

    let canEditText = false;
    let canChooseColor = false;
    let selectedColor = "Black"; // Default color

    $: {
        console.log("Reactive statement triggered");

        const selectedUser = $selectedUserStore;
        console.log(`selectedUser: ${JSON.stringify(selectedUser)}`)
        const userPlanId = selectedUser.plan_id;

        if (userPlanId) {
            const plan = data.planDetails.find(plan => plan.plan_id === userPlanId);
            if (plan) {
                canEditText = plan.change_text;
                console.log(`canEditText set based on plan permissions: ${canEditText}`)
                canChooseColor = plan.change_color;
                console.log(`canChooseColor set based on plan permissions: ${canChooseColor}`)
            }
        } else {
            canEditText = false;
            canChooseColor = false;
        }

        if (!canChooseColor) {
            selectedColor = "Black"; // Reset color when color control is disabled
        }
    }
</script>

<p>Home Page</p>
<p>Your Permissions: {$selectedUserStore.plan_id}</p>

{#if canEditText}
    <input type="text" placeholder="You can edit this text" style="color: {selectedColor}" />
{:else}
    <input type="text" placeholder="Editing disabled" disabled />
{/if}

<p></p>

<p>Choose a color:</p>
{#if canChooseColor}
    {#each ['Red', 'Green', 'Blue'] as color}
        <label>
            <input
                type="radio"
                name="color"
                value={color}
                bind:group={selectedColor}
            />
            {color}
        </label>
    {/each}
{:else}
    <p>Color selection is disabled</p>
{/if}