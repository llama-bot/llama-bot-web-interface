/*
 * Handle firestore read/writes related to discord bot
 */

import { Express, Request, Response, NextFunction } from "express"

import config from "../config.json"

const checkIfLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next()
	res.status(401).send("Not authenticated")
}

export default (app: Express): void => {
	app.get(
		config.pathPrefix + "/user-data",
		checkIfLoggedIn,
		async (req, res) => {
			req.user
				? res.status(200).send(req.user)
				: res.status(500).send("Failed to get user")
		}
	)
}
