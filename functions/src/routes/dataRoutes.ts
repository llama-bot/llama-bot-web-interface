/*
 * Handle firestore read/writes related to discord bot
 */

import { Express, Request, Response, NextFunction } from "express"
import database from "../API/database"

import config from "../config.json"

const checkIfLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next()
	res.status(401).send("Not authenticated")
}

export default (app: Express): void => {
	/**
	 * Get user data from google firebase firestore
	 */
	app.get(
		config.pathPrefix + "/user-data",
		checkIfLoggedIn,
		async (req, res) => {
			res.setHeader("Cache-Control", "private")

			req.user
				? res.status(200).send(await database.getUser(req.user.id))
				: res.status(500).send("Failed to get user")
		}
	)
}
