import { logger } from "firebase-functions"

import passport from "passport"
import PassportDiscord from "passport-discord"

import database from "../API/database"

import secret from "../secret.json"
import config from "../config.json"

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await database.findUser(id)
		if (user.success === true) {
			done(null, user.user as Express.User)
		} else {
			done(null)
		}
	} catch (error) {
		logger.error("Error deserializing user", error.message)
		done(error)
	}

	database
		.findUser(id)
		.then((user) => {
			done(null, user.user as Express.User)
		})
		.catch((error) => {
			logger.error("Error deserializing user", error.message)
		})
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
		async (accessToken, refreshToken, profile, done) => {
			try {
				const searchUserResult = await database.findUser(profile.id)

				// check if user already exists
				if (searchUserResult.success && searchUserResult.user) {
					return done(null, searchUserResult.user as Express.User)
				} else {
					const newUser: Express.User = {
						...profile,
						token: accessToken,
						refreshToken: refreshToken,
					}
					await database.newUser(newUser)
					return done(null, newUser)
				}
			} catch (error) {
				return logger.error("Error creating a user", error)
			}
		}
	)
)
