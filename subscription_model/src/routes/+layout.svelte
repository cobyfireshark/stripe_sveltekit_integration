<script>
    import { onMount } from "svelte";
    import { selectedUserStore } from '$lib/stores.js'
    let link;

    // Conditionally import link on the client side
    onMount(() => {
        import("@sveltejs/kit").then((module) => {
            link = module.link;
        });
    });
    export let data;
    let selectedEmail = '';
    let userPlan = '';

    function handleUserChange(event) {
        selectedEmail = event.target.value;
        console.log(`selectedEmail: ${selectedEmail}`)
        const user = data.users.find(user => user.email === selectedEmail);
        userPlan = user ? user.plan_id : '';
        selectedUserStore.set({ email: selectedEmail, plan_id: userPlan })
    }

</script>

<header>
    <nav>
        <ul>
            <li><a href={link ? link("/") : "/"}>Home</a></li>
            <li><a href={link ? link("/plan") : "/plan"}>Plan</a></li>
        </ul>
    </nav>
</header>

<main>
    <!-- This slot will render the contents of the specific page the user navigates to -->
    <slot />
</main>

<footer>
    <label for="current_user">Current User:</label>
    <select id="current_user" bind:value={selectedEmail} on:change={handleUserChange}>
        {#each data.users as user}
            <option value={user.email}>{user.email}</option>
        {/each}
    </select>
    <p>User's Plan: {userPlan}</p>
</footer>

<style>
    header {
        background: #007bff; /* Change to a blue background color */
        color: white;
        padding: 1rem;
    }
    nav ul {
        list-style: none;
        padding: 0;
        display: flex;
    }
    nav ul li {
        margin-right: 1rem;
    }
    nav a {
        color: white; /* Change link text color to white */
        text-decoration: none; /* Remove underlines from links */
        font-weight: bold; /* Make link text bold */
        transition: color 0.2s; /* Add a smooth color transition on hover */
    }
    nav a:hover {
        color: #0056b3; /* Change link text color on hover */
    }
    main {
        padding: 1rem;
    }
</style>
