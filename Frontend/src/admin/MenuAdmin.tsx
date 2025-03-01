import {
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

interface MenuAdminProps {
  collapsed: boolean;
}

const MenuAdmin: React.FC<MenuAdminProps> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={collapsed ? [] : ['products', 'orders', 'users']}
      selectedKeys={[location.pathname]}
      className="h-full border-r-0"
    >
      <Menu.Item
        key="/"
        icon={<HomeOutlined />}
      >
        <NavLink to="/">
          Quay lại trang chủ
        </NavLink>
      </Menu.Item>

      <SubMenu
        key="products"
        icon={<ShoppingOutlined />}
        title="Quản lý sản phẩm"
      >
        <Menu.Item key="/admin/products">
          <NavLink to="/admin/products">
            Danh sách sản phẩm
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/products/add">
          <NavLink to="/admin/products/add">
            Thêm mới sản phẩm
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="orders"
        icon={<ShoppingCartOutlined />}
        title="Quản lý đơn hàng"
      >
        <Menu.Item key="/admin/orders">
          <NavLink to="/admin/orders">
            Danh sách đơn hàng
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="users"
        icon={<UserOutlined />}
        title="Quản lý user"
      >
        <Menu.Item key="/admin/user">
          <NavLink to="/admin/user">
            Danh sách user
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default MenuAdmin
