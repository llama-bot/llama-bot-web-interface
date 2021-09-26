import { useLocation } from "react-router-dom"
import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuToggle,
} from "@ionic/react"
import {
	heartOutline,
	heartSharp,
	paperPlaneOutline,
	paperPlaneSharp,
	warningOutline,
	warningSharp,
} from "ionicons/icons"
import styled from "styled-components"

interface AppPage {
	url: string
	iosIcon: string
	mdIcon: string
	title: string
}

const appPages: AppPage[] = [
	{
		title: "Favorites",
		url: "/favorites",
		iosIcon: heartOutline,
		mdIcon: heartSharp,
	},
	{
		title: "Modules",
		url: "/modules",
		iosIcon: heartOutline,
		mdIcon: heartSharp,
	},
	{
		title: "Logs",
		url: "/logs",
		iosIcon: paperPlaneOutline,
		mdIcon: paperPlaneSharp,
	},
	{
		title: "Incidents",
		url: "/incidents",
		iosIcon: warningOutline,
		mdIcon: warningSharp,
	},
]

const StyledIonMenu = styled(IonMenu)`
	ion-menu ion-content {
		--background: var(
			--ion-item-background,
			var(--ion-background-color, #fff)
		);
	}

	ion-menu.md ion-content {
		--padding-start: 8px;
		--padding-end: 8px;
		--padding-top: 20px;
		--padding-bottom: 20px;
	}

	ion-menu.md ion-list {
		padding: 20px 0;
	}

	ion-menu.md ion-note {
		margin-bottom: 30px;
	}

	ion-menu.md ion-list-header,
	ion-menu.md ion-note {
		padding-left: 10px;
	}

	ion-menu.md ion-list#inbox-list {
		border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
	}

	ion-menu.md ion-list#inbox-list ion-list-header {
		font-size: 22px;
		font-weight: 600;
		min-height: 20px;
	}

	ion-menu.md ion-list#labels-list ion-list-header {
		font-size: 16px;
		margin-bottom: 18px;
		color: #757575;
		min-height: 26px;
	}

	ion-menu.md ion-item {
		--padding-start: 10px;
		--padding-end: 10px;
		border-radius: 4px;
	}

	ion-menu.md ion-item.selected {
		--background: rgba(var(--ion-color-primary-rgb), 0.14);
	}

	ion-menu.md ion-item.selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-menu.md ion-item ion-icon {
		color: #616e7e;
	}

	ion-menu.md ion-item ion-label {
		font-weight: 500;
	}

	ion-menu.ios ion-content {
		--padding-bottom: 20px;
	}

	ion-menu.ios ion-list {
		padding: 20px 0 0 0;
	}

	ion-menu.ios ion-note {
		line-height: 24px;
		margin-bottom: 20px;
	}

	ion-menu.ios ion-item {
		--padding-start: 16px;
		--padding-end: 16px;
		--min-height: 50px;
	}

	ion-menu.ios ion-item ion-icon {
		font-size: 24px;
		color: #73849a;
	}

	ion-menu.ios ion-item .selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-menu.ios ion-list#labels-list ion-list-header {
		margin-bottom: 8px;
	}

	ion-menu.ios ion-list-header,
	ion-menu.ios ion-note {
		padding-left: 16px;
		padding-right: 16px;
	}

	ion-menu.ios ion-note {
		margin-bottom: 8px;
	}

	ion-note {
		display: inline-block;
		font-size: 16px;
		color: var(--ion-color-medium-shade);
	}

	ion-item.selected {
		--color: var(--ion-color-primary);
	}
`

const Menu: React.FC = () => {
	// todo: collapse button

	const location = useLocation()

	return (
		<StyledIonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={
										location.pathname === appPage.url
											? "selected"
											: ""
									}
									routerLink={location.pathname + appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon
										slot="start"
										ios={appPage.iosIcon}
										md={appPage.mdIcon}
									/>
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						)
					})}
				</IonList>
			</IonContent>
		</StyledIonMenu>
	)
}

export default Menu
