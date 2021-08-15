import "styled-components"

declare module "styled-components" {
	export interface DefaultTheme {
		currentTheme: string
		setTheme(setThemeTo: string): void
	}
}
