<script lang="ts">
	import Heart from "svelte-icons/fa/FaHeart.svelte"
	import List from "svelte-icons/fa/FaList.svelte"
	import History from "svelte-icons/fa/FaHistory.svelte"
	import Issue from "svelte-icons/fa/FaExclamationCircle.svelte"

	const entries = [
		{
			title: "Favorites",
			url: "/favorites",
			icon: Heart,
		},
		{
			title: "Modules",
			url: "/modules",
			icon: List,
		},
		{
			title: "Logs",
			url: "/logs",
			icon: History,
		},
		{
			title: "Incidents",
			url: "/incidents",
			icon: Issue,
		},
	]
</script>
