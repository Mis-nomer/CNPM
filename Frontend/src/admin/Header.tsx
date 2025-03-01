import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Input, Layout } from 'antd'
import LogoImage from '../assets/images/logo.svg'

const { Header } = Layout

const HeaderAdmin = () => {
  const userMenu = (
    <div className="w-48 bg-white rounded-lg shadow-lg py-1">
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-medium text-gray-900">Admin User</p>
        <p className="text-xs text-gray-500">admin@example.com</p>
      </div>

      <div className="py-1">
        <a href="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <UserOutlined className="mr-3" />
          Thông tin cá nhân
        </a>
        <a href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <SettingOutlined className="mr-3" />
          Cài đặt
        </a>
      </div>

      <div className="border-t py-1">
        <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
          <LogoutOutlined className="mr-3" />
          Đăng xuất
        </button>
      </div>
    </div>
  )

  return (
    <Header className="bg-[#d70018] px-6 h-16 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <img
          src={LogoImage}
          alt="Logo"
          className="w-16 h-auto transform hover:scale-105 transition-transform duration-200"
        />

        <div className="relative ml-8">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Tìm kiếm..."
            className="w-[400px] h-9 rounded-lg hover:border-gray-400 focus:border-blue-500"
            bordered={false}
            style={{ backgroundColor: 'white', paddingLeft: '36px' }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <Badge count={5} size="small">
          <button className="text-white hover:text-yellow-50 transition-colors p-2">
            <BellOutlined className="text-xl" />
          </button>
        </Badge>

        <Dropdown
          overlay={userMenu}
          trigger={['click']}
          placement="bottomRight"
          overlayClassName="mt-1"
        >
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-white text-red-600"
            />
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium leading-tight">
                Admin User
              </p>
              <p className="text-white/80 text-xs leading-tight">
                Super Admin
              </p>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}


export default HeaderAdmin
