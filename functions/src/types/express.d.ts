declare global {
	namespace Express {
		// user data for the express server
		export interface User {
			id: string
		}
	}

	// user data in the google firebase firestore DB
	export interface DBUser {
		id: string // discord user id
		avatar?: string // discord avatar hash
		discriminator: string // 4 digit discord discriminator
		username: string // discord username
	}
}

export {}
