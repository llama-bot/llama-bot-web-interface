import { Layout } from "antd"
import styled from "styled-components"

import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

const { Header } = Layout

const StyledHeader = styled(Header)`
	overflow: hidden;
	height: 3.75rem;

	* {
		float: left;
	}

	a {
		display: flex;
		align-items: center;
		color: hsla(0, 0%, 100%, 0.65);
		text-align: center;
		padding: 0 1rem 0 1rem;
		text-decoration: none;

		:hover {
			color: white;
		}

		svg {
			margin-top: 0.4rem;
			font-size: x-small;
		}
	}

	h2 {
		color: white;
	}

	.right {
		float: right;
	}
`

const Navbar = () => {
	return (
		<StyledHeader style={{ color: "white", justifyItems: "space-between" }}>
			<div>
				<img
					src={`${process.env.PUBLIC_URL}/llama.png`}
					alt="llama logo"
					style={{ width: "60px" }}
				/>
				<h2>Llama Bot</h2>
			</div>
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
			<a href="https://llama-bot.github.io/status" target="_">
				Status&nbsp;
				<FontAwesomeIcon icon={faExternalLinkAlt} />
			</a>
			<div className="right">
				<Link to="/login">Login</Link>
			</div>
		</StyledHeader>
	)
}

export default Navbar
