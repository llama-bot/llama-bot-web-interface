import admin from "firebase-admin"
import { https } from "firebase-functions"

import express from "express"
import cors from "cors"
import session, { SessionOptions } from "express-session"
import cookieParser from "cookie-parser"
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
	resave: false,
	saveUninitialized: false,
}

const app = express()

if (process.env.FUNCTIONS_EMULATOR !== "true") {
	app.set("trust proxy", 1)
	sessionOption.cookie = { secure: true }
}

app.use(
	cors({ origin: ["https://llama.developomp.com", "http://localhost:5000"] })
)
app.use(cookieParser())
app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

dataRoutes(app)
authRoutes(app)

export const api = https.onRequest(app)
