import { useContext } from "react"

import { Col, Layout, Menu, Row } from "antd"
import { HomeOutlined } from "@ant-design/icons"

import { SidebarCollapsedContext } from "../contexts"

const { Header } = Layout

const Navbar = () => {
	const { isSidebarCollapsed, setSidebarCollapsed } = useContext(
		SidebarCollapsedContext
	)

	return (
		<Header>
			<Row justify="space-between" style={{ color: "white" }}>
				<Col
					onClick={() => {
						setSidebarCollapsed(
							(prevIsCollapsed) => !prevIsCollapsed
						)
					}}
				>
					{isSidebarCollapsed ? ">" : "<"}
				</Col>
				<Col>
					<img
						src="/llama.png"
						alt="llama logo"
						style={{ width: "60px" }}
					/>
				</Col>
				<Col>
					<Menu
						theme="dark"
						mode="horizontal"
						style={{ width: "1000px" }}
					>
						<Menu.Item icon={<HomeOutlined />}>Home</Menu.Item>
						<Menu.Item>Documentation</Menu.Item>
						<Menu.Item>Status</Menu.Item>
					</Menu>
				</Col>
				<Col>Login Button</Col>
			</Row>
		</Header>
	)
}

export default Navbar
