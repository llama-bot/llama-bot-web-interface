/*
 * Handle authentication
 */

import { Express } from "express"
import passport from "passport"

import config from "../config.json"

export default (app: Express): void => {
	// start login (redirects to /api/auth)
	app.get(
		config.pathPrefix + "/login",
		passport.authenticate("discord", { scope: config.scopes })
	)

	// authenticates login (redirects to /)
	app.get(
		config.pathPrefix + "/auth",
		passport.authenticate("discord", { successRedirect: "/" })
	)

	// logs out the user
	app.get(config.pathPrefix + "/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	})
}
