/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string
	}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

interface UserData {
	id: string //  "501277805540147220"
	avatar: string //  "c61056f4f187b6b3658afb68c56f3f87"
	discriminator: string //  "0001"
	username: string //  "developomp"
}
