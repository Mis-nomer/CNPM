import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import HeaderAdmin from './Header'
import MenuAdmin from './MenuAdmin'

const { Content, Sider } = Layout

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <HeaderAdmin />
      <Layout className="flex flex-1">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={260}
          className="bg-white shadow-sm"
          theme="light"
        >
          <MenuAdmin collapsed={collapsed} />
        </Sider>

        <Layout className="bg-gray-50 transition-all duration-300">
          <Content className="m-6">
            <div className="min-h-[280px] p-6 bg-white rounded-lg shadow-sm">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
