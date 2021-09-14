import { useEffect, useState } from "react"
import styled from "styled-components"
import { Layout } from "antd"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

const { Header } = Layout

const StyledLlamaBotText = styled.b`
	font-size: 1.5rem;
`

const StyledHeader = styled(Header)`
	height: 3.75rem;

	color: white;
	line-height: 100%;

	display: flex;
	justify-items: space-between;

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

const Navbar = () => {
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
					src={`${process.env.PUBLIC_URL}/llama.png`}
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
				<a href={isLoggedIn ? "/api/logout" : "/api/login"}>
					{isLoggedIn ? `Logout` : "Login"}
				</a>
			</div>
		</StyledHeader>
	)
}

export default Navbar
