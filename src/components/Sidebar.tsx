import { Layout, Menu } from "antd"
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from "@ant-design/icons"

import { SidebarCollapsedContext } from "../contexts"

const Sidebar = () => {
	return (
		<SidebarCollapsedContext.Consumer>
			{({ isSidebarCollapsed }) => (
				<Layout.Sider
					trigger={null}
					collapsible
					collapsed={isSidebarCollapsed}
				>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["1"]}
					>
						<Menu.Item key="1" icon={<UserOutlined />}>
							nav 1
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined />}>
							nav 2
						</Menu.Item>
						<Menu.Item key="3" icon={<UploadOutlined />}>
							nav 3
						</Menu.Item>
					</Menu>
				</Layout.Sider>
			)}
		</SidebarCollapsedContext.Consumer>
	)
}

export default Sidebar
