import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import HeaderAdmin from './Header'
import MenuAdmin from './MenuAdmin'

const { Content, Sider } = Layout

const AdminLayout: React.FC = () => (
  <Layout>
    <HeaderAdmin />
    <Layout>
      <Sider collapsible={true} width={200} className='site-layout-background'>
        <MenuAdmin />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <ContentCustom>
          <Outlet />
        </ContentCustom>
      </Layout>
    </Layout>
  </Layout>
)

const ContentCustom = styled(Content)`
  min-height: 100vh;
`

export default AdminLayout
