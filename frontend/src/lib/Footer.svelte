<script lang="ts">
	import Github from "svelte-icons/fa/FaGithub.svelte"
	import Discord from "svelte-icons/fa/FaDiscord.svelte"
	import Heartbeat from "svelte-icons/fa/FaHeartbeat.svelte"
	import Book from "svelte-icons/fa/FaBook.svelte"
</script>

<footer>
	<div class="container">
		<div class="created-by">
			Created by <b>developomp</b>
		</div>

		<!-- right links -->
		<div class="icons">
			<a
				class="icon"
				alt="Documentation"
				href="https://llama-bot.github.io/llama-bot-docs/docs/web-interface/overview"
				target="_"
			>
				<Book />
			</a>

			<a
				class="icon"
				alt="Server status"
				href="https://status.llama.developomp.com"
				target="_"
			>
				<Heartbeat />
			</a>

			<a
				class="icon"
				alt="Discord server"
				href="https://discord.gg/aQqamSCUcS"
				target="_"
			>
				<Discord />
			</a>

			<a
				class="icon"
				alt="Github repository"
				href="https://github.com/llama-bot"
				target="_"
			>
				<Github />
			</a>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		--height: 8rem;

		background-color: var(--dark);

		height: var(--height);

		display: flex;
		justify-content: center;

		padding: 0 var(--h-padding);

		.container {
			width: min(100%, var(--max-width));
			height: var(--height);

			display: flex;
			justify-content: space-between; // spread content
			align-items: center; // vertically center elements

			.created-by {
				color: darkgrey;
			}

			.icons {
				height: 24px;

				display: flex;
				gap: 1rem;

				.icon {
					color: lightgrey;

					&:hover {
						color: white;
					}
				}
			}
		}
	}
</style>
