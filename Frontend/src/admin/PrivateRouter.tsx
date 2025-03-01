import { Navigate } from 'react-router-dom'
import { Modal } from 'antd'

const PrivateRouter = ({ children }: any) => {
  const auth = JSON.parse(localStorage.getItem('userInfo') as string)
  if (!auth) {
    Modal.error({
      title: 'Chưa đăng nhập tài khoản quản trị!',
      content: 'Vui lòng đăng nhập bằng tài khoản admin để vào !'
    })
    return <Navigate to='/signin' />
  }
  if (auth?.roleId === 1) {
    Modal.error({
      title: 'Tài khoản không được phân quyền quản trị',
      content: 'Vui lòng đăng nhập bằng tài khoản admin để vào !'
    })
    return <Navigate to='/' />
  }
  return <>{children}</>
}

export default PrivateRouter
