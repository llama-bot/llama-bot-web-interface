import admin from "firebase-admin"
import { https } from "firebase-functions"

import express from "express"
import cors from "cors"
import session from "express-session"
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

const app = express()

app.use((_, res, next) => {
	res.setHeader("Cache-Control", "private")
	next()
})
app.use(
	cors({ origin: ["https://llama.developomp.com", "http://localhost:5000"] })
)
app.use(
	session({ secret: secret.session, resave: false, saveUninitialized: false })
)
app.use(passport.initialize())
app.use(passport.session())

dataRoutes(app)
authRoutes(app)

export const api = https.onRequest(app)
