import { logger } from "firebase-functions"

import passport from "passport"
import PassportDiscord from "passport-discord"

import database from "../API/database"

import secret from "../secret.json"
import config from "../config.json"

passport.serializeUser((user, done) => {
	// `user.id` will be used in `passport.deserializeUser`
	done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await database.findUser(id)

		if (user.success) {
			done(null, user.user as Express.User)
		} else {
			done(new Error("Failed to get user from database"))
		}
	} catch (error) {
		logger.error("Error deserializing user", error.message)
		done(error)
	}
})

passport.use(
	new PassportDiscord.Strategy(
		{
			clientID: secret.clientID,
			clientSecret: secret.clientSecret,
			callbackURL:
				(process.env.FUNCTIONS_EMULATOR === "true"
					? "http://localhost:5000"
					: "https://llama.developomp.com") +
				config.pathPrefix +
				"/auth",
			scope: config.scopes,
		},

		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const user = await database.findUser(profile.id)

				if (!user.success) {
					database.newUser(profile as Express.User)
				}

				if (user.user) {
					await database.updateUser(profile as Express.User)
				}

				done(null, profile as Express.User)
			} catch (error) {
				logger.error("Error creating a user", error)
			}
		}
	)
)
