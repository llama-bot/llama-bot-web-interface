import admin from "firebase-admin"
import { https } from "firebase-functions"

import express from "express"
import cors from "cors"
import session, { SessionOptions } from "express-session"
import passport from "passport"

import authRoutes from "./routes/authRoutes"
import dataRoutes from "./routes/dataRoutes"

import "./services/discordOauth"

import secret from "./secret.json"
import serviceAccountKey from "./firebase-adminsdk.json"

admin.initializeApp({
	credential: admin.credential.cert(
		serviceAccountKey as admin.ServiceAccount
	),
})

const sessionOption: SessionOptions = {
	secret: secret.session,
	name: "__session", // https://stackoverflow.com/a/44935288/12979111
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
	},
}

const app = express()

if (process.env.FUNCTIONS_EMULATOR !== "true") {
	app.set("trust proxy", 1)
	sessionOption.cookie = {
		...sessionOption.cookie,
	}
}

app.use(
	cors({
		origin: ["https://llama.developomp.com", "http://localhost:5000"],
		credentials: true,
	})
)
app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

dataRoutes(app)
authRoutes(app)

export const api = https.onRequest(app)
