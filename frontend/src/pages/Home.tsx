import styled from "styled-components"

const StyledHome = styled.div`
	text-align: center;
`

const Home: React.FC = () => {
	return (
		<StyledHome>
			<h3>Home</h3>
			<h4>Log in to list servers</h4>
		</StyledHome>
	)
}

export default Home
