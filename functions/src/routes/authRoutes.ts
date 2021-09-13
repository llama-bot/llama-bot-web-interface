/*
 * Handle authentication
 */

import { Express } from "express"
import passport from "passport"

import config from "../config.json"

export default (app: Express): void => {
	app.get(
		config.pathPrefix + "/login",
		passport.authenticate("discord", { scope: config.scopes })
	)

	app.get(config.pathPrefix + "/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	})

	app.get(
		config.pathPrefix + "/auth",
		passport.authenticate("discord", { successRedirect: "/" })
	)
}
