import { IonHeader } from "@ionic/react"
import styled from "styled-components"

const StyledServers = styled.div`
	text-align: center;
`

const Servers: React.FC = () => {
	return (
		<StyledServers>
			<IonHeader>Available servers</IonHeader>
		</StyledServers>
	)
}

export default Servers
