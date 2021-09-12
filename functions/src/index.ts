import admin from "firebase-admin"
import { https } from "firebase-functions"

import express from "express"
import expressSession from "express-session"
import passport from "passport"
import cors from "cors"

import authRoutes from "./routes/authRoutes"
import dataRoutes from "./routes/dataRoutes"

import secret from "./secret.json"

import serviceAccountKey from "./firebase-adminsdk.json"

import "./services/discordOauth"

const app = express()

app.use(
	cors({ origin: ["https://llama.developomp.com", "http://localhost:5000"] })
)
app.use(
	expressSession({
		secret: secret.session,
		resave: true,
		saveUninitialized: false,
	})
)
app.use(passport.initialize())
app.use(passport.session())

dataRoutes(app)
authRoutes(app)

admin.initializeApp({
	credential: admin.credential.cert(
		serviceAccountKey as admin.ServiceAccount
	),
})

export const api = https.onRequest(app)
