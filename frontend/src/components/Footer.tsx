import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"

import { Layout } from "antd"

const StyledFooter = styled(Layout.Footer)`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	color: black;
	background-color: rgb(0, 21, 41);
`

const StyledFooterContainer = styled.div`
	width: 1500px;

	color: grey;

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem 0 1rem;
`

const GithubLink = styled.a`
	font-size: 2rem;

	color: grey;

	&:hover {
		color: white;
	}
`

export default class Footer extends React.Component {
	render() {
		return (
			<StyledFooter>
				<StyledFooterContainer>
					<div>
						Created by <b>developomp</b>
					</div>
					<GithubLink
						href="https://github.com/llama-bot/llama-bot-web-interface"
						target="_blank"
					>
						<FontAwesomeIcon icon={faGithub} />
					</GithubLink>
				</StyledFooterContainer>
			</StyledFooter>
		)
	}
}