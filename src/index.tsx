import React, { useState, Suspense, lazy } from "react"
import ReactDOM from "react-dom"

import { HashRouter, Switch, Route } from "react-router-dom"

import Loader from "react-spinners/CircleLoader"
import { Layout } from "antd"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

import { SidebarCollapsedContext } from "./contexts"

import "antd/dist/antd.min.css"
import "./index.css" // must be loaded last
import styled from "styled-components"

const Home = lazy(() => import("./routes/Home"))
const Dashboard = lazy(() => import("./routes/Dashboard"))
const Modules = lazy(() => import("./routes/Modules"))
const Logs = lazy(() => import("./routes/Logs"))
const Incidents = lazy(() => import("./routes/Incidents"))
const Login = lazy(() => import("./routes/Login"))

const StyledSpinContainer = styled.div`
	width: 100%;
	opacity: 0;

	/* center elements */
	display: flex;
	align-content: center;
	justify-content: center;

	/* fade in */
	animation-delay: 0.2s;
	animation-duration: 2s;
	animation-name: fadein;

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`

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
										<Suspense
											fallback={
												<StyledSpinContainer>
													<Loader size={150} />
												</StyledSpinContainer>
											}
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
										</Suspense>
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
