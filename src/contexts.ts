import { createContext, Dispatch, SetStateAction } from "react"

const SidebarCollapsedContext = createContext({
	isSidebarCollapsed: false,
	setSidebarCollapsed: (() => {}) as Dispatch<SetStateAction<boolean>>,
})

export { SidebarCollapsedContext }
