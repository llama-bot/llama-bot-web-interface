import { lazy, Suspense } from "react"
import { IonApp } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Route } from "react-router-dom"
import styled from "styled-components"

import Loader from "react-spinners/CircleLoader"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

const Home = lazy(() => import("./pages/Home"))
const Servers = lazy(() => import("./pages/Servers"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

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
		<IonApp>
			<Suspense
				fallback={
					<StyledSpinContainer>
						<Loader size={150} />
					</StyledSpinContainer>
				}
			>
				<IonReactRouter>
					<Navbar />

					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/servers">
						<Servers />
					</Route>

					<Route exact path="/server/:server/dashboard">
						<Dashboard />
					</Route>

					<Footer />
				</IonReactRouter>
			</Suspense>
		</IonApp>
	)
}

export default App
