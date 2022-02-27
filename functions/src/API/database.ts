import admin, { firestore } from "firebase-admin"
import { logger } from "firebase-functions"

interface DatabaseResult {
	success: boolean
	error?: string
}

export default {
	/**
	 * Checks if a user exists in the database
	 *
	 * @param {string} uid - discord user id
	 */
	async findUser(uid: string): Promise<DatabaseResult> {
		try {
			const user = await admin.firestore().collection("users").doc(uid).get()
			if (!user.exists) {
				return {
					success: false,
					error: `user with uid ${uid} does not exist`,
				}
			}

			return { success: true }
		} catch (error) {
			return { success: false, error: error.message }
		}
	},

	/**
	 * Reads user data from the database
	 *
	 * @param {string} uid - discord user id
	 */
	async getUser(uid: string): Promise<DBUser> {
		const result = await admin.firestore().collection("users").doc(uid).get()
		if (!result.exists) throw new Error(`user with uid ${uid} does not exist`)

		const data = result.data()
		if (!data) throw new Error("User was found but failed to read the data.")

		return data as DBUser
	},

	/**
	 * Create a new entry in the database
	 *
	 * @param {DBUser} data - User data to create
	 */
	async newUser(data: DBUser): Promise<DatabaseResult> {
		try {
			await firestore().doc(`/users/${data.id}`).set(data)

			return { success: true }
		} catch (error) {
			logger.error("Error creating user", error)

			return { success: false, error: error.message }
		}
	},

	/**
	 * Update user data
	 *
	 * @param {Partial<DBUser>} data - Data to update
	 */
	async updateUser(data: Partial<DBUser>): Promise<DatabaseResult> {
		await firestore().doc(`/users/${data.id}`).update(data)

		return { success: true }
	},
}
