import { lazy, Suspense } from "react"
import { ThemeProvider } from "evergreen-ui"
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled, { createGlobalStyle, css } from "styled-components"

import Loader from "react-spinners/CircleLoader"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import darkTheme from "./theme/dark"

const Home = lazy(() => import("./pages/Home"))
const Servers = lazy(() => import("./pages/Servers"))
// const Dashboard = lazy(() => import("./pages/Dashboard"))

// wrapping it using css because prettier extension does not work well with styled-components
// https://github.com/styled-components/vscode-styled-components/issues/175
const _globalStyle = css`
	html,
	body,
	#root {
		font-family: "Noto Sans KR", sans-serif;

		height: 100vh;
		margin: 0;

		display: flex;
		flex-direction: column;
	}
`

const GlobalStyle = createGlobalStyle`
	${_globalStyle}
`

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

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider value={darkTheme}>
				<Suspense
					fallback={
						<StyledSpinContainer>
							<Loader size={150} />
						</StyledSpinContainer>
					}
				>
					<Navbar />
					<Router>
						<Route exact path="/">
							<Home />
						</Route>

						<Route exact path="/servers">
							<Servers />
						</Route>

						{/* <Route exact path="/server/:server/dashboard">
						<Dashboard />
					</Route> */}
					</Router>
					<Footer />
				</Suspense>
			</ThemeProvider>
		</>
	)
}

export default App
