import { useContext } from "react"
import { Link } from "react-router-dom"

import { Layout, Menu } from "antd"
import { blue } from "@ant-design/colors"
import {
	AppstoreAddOutlined,
	ClockCircleOutlined,
	CaretLeftFilled,
	CaretRightFilled,
	DashboardOutlined,
	HomeOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons"

import { SidebarCollapsedContext } from "../contexts"
import styled from "styled-components"

const StyledMenuContainer = styled.div`
	svg {
		font-size: 1.25rem;
	}
`

const SidebarCollapseButton = styled.div`
	:hover {
		background-color: ${blue[5]};
	}
`

const Sidebar = () => {
	const { isSidebarCollapsed, setSidebarCollapsed } = useContext(
		SidebarCollapsedContext
	)

	return (
		<Layout.Sider trigger={null} collapsible collapsed={isSidebarCollapsed}>
			<StyledMenuContainer>
				<Menu theme="dark" mode="inline">
					<Menu.Item icon={<HomeOutlined />}>
						<Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
					</Menu.Item>
					<Menu.Item icon={<DashboardOutlined />}>
						<Link to={`${process.env.PUBLIC_URL}/dashboard`}>
							Dashboard
						</Link>
					</Menu.Item>
					<Menu.Item icon={<AppstoreAddOutlined />}>
						<Link to={`${process.env.PUBLIC_URL}/modules`}>
							Modules
						</Link>
					</Menu.Item>
					<Menu.Item icon={<ClockCircleOutlined />}>
						<Link to={`${process.env.PUBLIC_URL}/logs`}>Logs</Link>
					</Menu.Item>
					<Menu.Item icon={<ExclamationCircleOutlined />}>
						<Link to={`${process.env.PUBLIC_URL}/incidents`}>
							Incidents
						</Link>
					</Menu.Item>
					<SidebarCollapseButton
						style={{
							fontSize: 25,
							position: "absolute",
							bottom: 0,
							margin: 0,
							width: "100%",
							padding: "1rem 0 1rem 0",
							textAlign: "center",
						}}
						onClick={() => {
							setSidebarCollapsed((prev) => !prev)
						}}
					>
						{isSidebarCollapsed ? (
							<CaretRightFilled />
						) : (
							<CaretLeftFilled />
						)}
					</SidebarCollapseButton>
				</Menu>
			</StyledMenuContainer>
		</Layout.Sider>
	)
}

export default Sidebar
