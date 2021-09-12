import admin, { firestore } from "firebase-admin"
import { logger } from "firebase-functions"

interface DatabaseResult {
	success: boolean
	error?: string
}

interface UserResult extends DatabaseResult {
	user?: Express.User | FirebaseFirestore.DocumentData
}

export default {
	findUser: async (uid: string): Promise<UserResult> => {
		let result
		try {
			const user = await admin.firestore().collection("users").doc(uid).get()

			result = user.exists
				? { success: true, user: user.data() }
				: { success: false, error: `user with uid ${uid} does not exist` }
		} catch (error) {
			logger.error("Error finding user", error)
			result = { success: false, error: error.message }
		}

		return result
	},
	newUser: async (profile: Express.User): Promise<UserResult> => {
		let result
		try {
			const newUserData = {
				avatar: profile.avatar,
				discriminator: profile.discriminator,
				email: profile.email,
				id: profile.id,
				username: profile.username,
			}
			await firestore().doc(`/users/${profile.id}`).set(newUserData)
			result = { success: true, user: newUserData }
		} catch (error) {
			logger.error("Error creating user", error)
			result = { success: false, error: error.message }
		}
		return result
	},
}
