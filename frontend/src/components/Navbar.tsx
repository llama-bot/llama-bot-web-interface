import { useEffect, useState } from "react"

import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { Button, LogOutIcon } from "evergreen-ui"

const StyledLlamaBotText = styled.b`
	font-size: 1.5rem;
`

const StyledHeader = styled.div`
	height: 3.75rem;

	color: white;
	line-height: 100%;

	display: flex;
	justify-items: space-between;

	padding: 0 0.5rem 0 0.5rem;

	div {
		display: flex;
		align-items: center;
	}

	div:nth-child(1) {
		flex: 1 auto;
	}

	a {
		color: hsla(0, 0%, 100%, 0.65);
		text-decoration: none;

		padding: 0 1rem;

		:hover {
			color: white;
		}

		svg {
			margin-top: 0.4rem;
			font-size: x-small;
		}
	}
`

const StyledLoginButton = styled(Button)`
	color: white;
	padding: 8 12 8 12;
	border-radius: 5;
	background-color: indianred;

	:hover {
		background-color: firebrick !important;
	}

	:active {
		background-color: darkred !important;
	}
`

const Navbar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userName, setUserName] = useState("")

	useEffect(() => {
		window
			.fetch("/api/user-data", { credentials: "same-origin" })
			.then((data) => data.json())
			.then((data) => {
				setIsLoggedIn(true)
				setUserName(`${data.username}#${data.discriminator}`)
			})
			.catch()
	}, [])

	return (
		<StyledHeader>
			<div>
				<img
					src={"assets/icon/llama.png"}
					alt="llama logo"
					style={{ width: "60px" }}
				/>
				<StyledLlamaBotText>Llama Bot</StyledLlamaBotText>
				<a
					href="https://llama-bot.github.io/llama-bot-docs/docs/web-interface/overview"
					target="_"
				>
					Docs&nbsp;
					<FontAwesomeIcon icon={faExternalLinkAlt} />
				</a>
				<a href="https://discord.gg/aQqamSCUcS" target="_">
					Discord&nbsp;
					<FontAwesomeIcon icon={faExternalLinkAlt} />
				</a>
				<a href="https://status.llama.developomp.com" target="_">
					Status&nbsp;
					<FontAwesomeIcon icon={faExternalLinkAlt} />
				</a>
			</div>
			<div>
				{isLoggedIn && `Logged in as ${userName}`}

				<StyledLoginButton
					appearance="mini1mal"
					onClick={() => {
						window.location.href = isLoggedIn
							? "/api/logout"
							: "/api/login"
					}}
				>
					{isLoggedIn ? `${(<LogOutIcon />)} Logout` : "Login"}
				</StyledLoginButton>
			</div>
		</StyledHeader>
	)
}

export default Navbar
