import React, { useState } from "react"
import ReactDOM from "react-dom"

import { HashRouter, Switch, Route } from "react-router-dom"

import { Layout } from "antd"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

import Home from "./routes/Home"
import Dashboard from "./routes/Dashboard"
import Modules from "./routes/Modules"
import Logs from "./routes/Logs"
import Incidents from "./routes/Incidents"
import Login from "./routes/Login"

import { SidebarCollapsedContext } from "./contexts"

import "antd/dist/antd.min.css"
import "./index.css" // must be loaded last

const App = () => {
	const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

	return (
		<>
			<SidebarCollapsedContext.Provider
				value={{ isSidebarCollapsed, setSidebarCollapsed }}
			>
				<HashRouter basename="/">
					<Layout style={{ minHeight: "100vh" }}>
						<Layout className="site-layout">
							<Navbar />
							<Layout>
								<Sidebar />
								<Layout.Content
									style={{
										padding: "2.5rem",
										display: "flex",
									}}
								>
									<div
										className="site-layout-background site-layout-content"
										style={{
											height: "auto",
											width: "100%",
											borderRadius: "0.5rem",
										}}
									>
										<Switch>
											<Route exact path="/">
												<Home />
											</Route>
											<Route exact path="/dashboard">
												<Dashboard />
											</Route>
											<Route exact path="/modules">
												<Modules />
											</Route>
											<Route exact path="/logs">
												<Logs />
											</Route>
											<Route exact path="/incidents">
												<Incidents />
											</Route>
											<Route exact path="/login">
												<Login />
											</Route>
										</Switch>
									</div>
								</Layout.Content>
							</Layout>
							<Footer />
						</Layout>
					</Layout>
				</HashRouter>
			</SidebarCollapsedContext.Provider>
		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
