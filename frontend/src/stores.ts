import { writable } from "./local-storage-store"

export const userData = writable<UserData>("userData", undefined)

export async function updateUserData() {
	fetch("/api/user-data", { credentials: "same-origin" })
		.then((data) => data.json())
		.then((data) => {
			userData.set(data)
		})
		.catch(() => {
			userData.set(undefined)
		})
}
