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
	async findUser(uid: string): Promise<UserResult> {
		try {
			const user = await admin.firestore().collection("users").doc(uid).get()

			if (user.exists) {
				return {
					success: true,
					user: user.data(),
				}
			} else {
				return {
					success: false,
					error: `user with uid ${uid} does not exist`,
				}
			}
		} catch (error) {
			return { success: false, error: error.message }
		}
	},

	async newUser(profile: Express.User): Promise<UserResult> {
		try {
			await firestore().doc(`/users/${profile.id}`).set({
				id: profile.id,
				avatar: profile.avatar,
				username: profile.username,
				discriminator: profile.discriminator,
			})

			return { success: true, user: profile }
		} catch (error) {
			logger.error("Error creating user", error)

			return { success: false, error: error.message }
		}
	},

	async updateUser(profile: Express.User): Promise<UserResult> {
		await firestore().doc(`/users/${profile.id}`).update({
			id: profile.id,
			avatar: profile.avatar,
			username: profile.username,
			discriminator: profile.discriminator,
		})

		return { success: true, user: profile }
	},
}
