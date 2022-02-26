<script lang="ts">
	import { page } from "$app/stores"
	import { onMount } from "svelte"

	let isLoggedIn = false
	let userData: UserData = undefined

	onMount(() => {
		fetch("/api/user-data", { credentials: "same-origin" })
			.then((data) => data.json())
			.then((data) => {
				isLoggedIn = true
				userData = data
			})
	})
</script>

<header>
	<nav>
		<div class="left-content">
			<img class="icon" src="assets/icon/llama.png" alt="llama logo" />

			<b>Llama Bot</b>

			<div class="links">
				<a
					class:active={$page.url.pathname === "/"}
					sveltekit:prefetch
					href="/"
				>
					Home
				</a>
				<a
					class:active={$page.url.pathname === "/about"}
					sveltekit:prefetch
					href="/about"
				>
					About
				</a>
			</div>
		</div>

		<div class="login-logout">
			{#if isLoggedIn}
				<div class="user">
					<img
						alt="user pfp"
						src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
					/>
					{userData.username}#{userData.discriminator}
				</div>
			{/if}

			<div class="login-logout-button">
				<a href={isLoggedIn ? "/api/logout" : "/api/login"}>
					{isLoggedIn ? "Logout" : "Login"}
				</a>
			</div>
		</div>
	</nav>
</header>

<style lang="scss">
	header {
		--height: 4rem;

		display: flex;
		justify-content: center;

		height: var(--height);

		padding: 0 var(--h-padding);

		background-color: var(--dark);
		color: var(--light);

		nav {
			width: min(100%, var(--max-width)); // cap width
			display: flex;
			justify-content: space-between;

			height: var(--height);

			.left-content {
				display: flex;
				align-items: center;

				img.icon {
					width: 48px;
				}

				b {
					font-size: 1.5rem;
				}

				.links {
					display: flex;
					gap: 0.8rem;
					margin-left: 2rem;

					a {
						color: white;
						text-decoration: none;

						&.active {
							border-bottom: 3px solid white;
						}
					}
				}
			}

			.login-logout {
				display: flex;
				align-items: center;
				justify-content: right;
				gap: 0.5rem;

				.user {
					display: flex;
					height: 100%;
					padding: 0.1rem;
					gap: 0.2rem;

					align-items: center;

					color: lightgray;

					img {
						height: 80%;
						border-radius: 50%;
					}
				}

				.login-logout-button {
					display: flex;
					align-items: center;
					justify-content: center;

					height: 100%;

					background-color: indianred;

					&:hover {
						background-color: firebrick !important;
					}

					&:active {
						background-color: darkred !important;
					}

					a {
						display: flex;

						width: 100%;
						height: 100%;

						padding: 0 1rem;
						align-items: center;

						color: white;
						text-align: center;
						text-decoration: none;
					}
				}
			}
		}
	}
</style>
