import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import storage from "local-storage-fallback"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import { Layout } from "antd"

import { SidebarCollapsedContext } from "./contexts"

import "antd/dist/antd.min.css"
import "./index.css" // must be loaded last

const App = () => {
	const [currentTheme, setCurrentTheme] = useState("light")
	const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

	useEffect(() => {
		// save theme when it is changed
		storage.setItem("theme", currentTheme)
	}, [currentTheme])

	return (
		<>
			<ThemeProvider
				theme={{
					currentTheme: currentTheme,
					// make setTheme function available in other components
					setTheme: (setThemeTo: string) =>
						setCurrentTheme(setThemeTo),
				}}
			>
				<SidebarCollapsedContext.Provider
					value={{ isSidebarCollapsed, setSidebarCollapsed }}
				>
					<BrowserRouter>
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
											<h2>Dashboard</h2>
											<Switch>
												<Route path="/">Home!</Route>
												<Route path="/docs">
													Docs!
												</Route>
												<Route path="/status">
													Status!
												</Route>
											</Switch>
										</div>
									</Layout.Content>
								</Layout>
								<Footer />
							</Layout>
						</Layout>
					</BrowserRouter>
				</SidebarCollapsedContext.Provider>
			</ThemeProvider>
		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
