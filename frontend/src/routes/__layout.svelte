<script lang="ts">
	import { updateUserData } from "../stores"
	import { onMount } from "svelte"

	import Header from "$lib/Header.svelte"
	import Footer from "$lib/Footer.svelte"

	import { Circle2 } from "svelte-loading-spinners"

	// load user data on page load
	onMount(() => {
		updateUserData()
	})
</script>

<Header />
<main>
	<slot />
	This loader does nothing
	<Circle2 />
</main>
<Footer />

<style lang="scss" global>
	@import "@fontsource/noto-sans/index.css";

	:root {
		/* global CSS variables */
		--dark: #001529;
		--light: #f0f2f5;
		--max-width: 1500px;
		--h-padding: 2rem;
	}

	html,
	body {
		font-family: "Noto Sans";

		height: 100vh;
		margin: 0;

		display: flex;
		flex-direction: column;

		background-color: var(--light);
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		align-self: center;

		width: min(100%, var(--max-width)); // cap width
	}
</style>
