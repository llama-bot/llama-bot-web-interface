import { css } from "styled-components"

// not declared in the export object so the export object can refer to it
function theme(currentTheme: string, values: { [key: string]: string }) {
	return values[currentTheme]
}

const theming = {
	theme: theme,
	size: {
		x2_small: "3px",
		x_small: "8px",
		small: 0,
		medium: "14px",
		large: 0,
		x_large: 0,
		screen_size1: "1000px",
		screen_size2: "1500px",
	},
	color: {
		linkColor: "#4592F7",
	},
	dark: {
		backgroundColor0: "#202225",
		backgroundColor1: "#36393F",
		color0: "#FFFFFF",
		color1: "#EEEEEE",
	},
	light: {
		backgroundColor0: "#FFFFFF",
		backgroundColor1: "#F7F7F7",
		color0: "#000000",
		color1: "#111111",
	},
	styles: {
		navbarButtonStyle: css`
			cursor: pointer; /* so it can be applies to divs too */
			font-size: 1rem;
			border-radius: 0.5rem;
			float: left;
			padding: 14px 16px;
			text-decoration: none;
			transition: transform 0.1s linear;
			color: ${(props) =>
				theme(props.theme.currentTheme, {
					light: "black",
					dark: "#CFD0D0",
				})};
			background-color: ${(props) =>
				theme(props.theme.currentTheme, {
					light: "white",
					dark: "#202225",
				})};
			&:hover {
				background-color: ${(props) =>
					theme(props.theme.currentTheme, {
						light: "lightgrey",
						dark: "#36393F",
					})};
			}
		`,
	},
}

export default theming
