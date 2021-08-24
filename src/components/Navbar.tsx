import { Layout } from "antd"
import styled from "styled-components"

import { Link } from "react-router-dom"

const { Header } = Layout

const StyledHeader = styled(Header)`
	overflow: hidden;

	* {
		float: left;
	}

	a {
		color: hsla(0, 0%, 100%, 0.65);
		text-align: center;
		padding: 0 1rem 0 1rem;
		text-decoration: none;

		:hover {
			color: white;
		}
	}

	.right {
		float: right;
	}
`

const Navbar = () => {
	return (
		<StyledHeader style={{ color: "white", justifyItems: "space-between" }}>
			<img src="/llama.png" alt="llama logo" style={{ width: "60px" }} />

			<Link to="/">Home</Link>
			<Link to="/docs">Documentation</Link>
			<Link to="/status">Status</Link>

			<div className="right">
				<Link to="/login">Login</Link>
			</div>
		</StyledHeader>
	)
}

export default Navbar
