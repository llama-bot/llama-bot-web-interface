/**
 * Code taken from https://github.com/joshnuss/svelte-local-storage-store
 */

import { writable as internal, get } from "svelte/store"
import type { Writable } from "svelte/store"

declare type Updater<T> = (value: T) => T
declare type StoreDict<T> = { [key: string]: Writable<T> }

/* eslint-disable @typescript-eslint/no-explicit-any */
const stores: StoreDict<any> = {}

function stringify(value: any): string {
	switch (value) {
		case undefined: {
			return "undefined"
		}

		case null: {
			return "null"
		}

		default: {
			return JSON.stringify(value)
		}
	}
}

function parse<T>(value: string) {
	switch (value) {
		case "undefined": {
			return undefined
		}

		case "null": {
			return null
		}

		default: {
			return <T>JSON.parse(value)
		}
	}
}

export function writable<T>(key: string, initialValue: T): Writable<T> {
	if (!stores[key]) {
		const store = internal(initialValue, (set) => {
			const json = localStorage.getItem(key)

			if (json) set(parse<T>(json))

			const handleStorage = (event: StorageEvent) => {
				if (event.key === key) {
					set(event.newValue ? <T>parse(event.newValue) : null)
				}
			}

			window.addEventListener("storage", handleStorage)

			return () => window.removeEventListener("storage", handleStorage)
		})

		const { subscribe, set } = store

		stores[key] = {
			set(value: T) {
				localStorage.setItem(key, stringify(value))
				set(value)
			},

			update(updater: Updater<T>) {
				const value = updater(get(store))

				localStorage.setItem(key, stringify(value))
				set(value)
			},

			subscribe,
		}
	}

	return stores[key]
}
