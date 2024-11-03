import { Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../../api/user'

const Signup = () => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Success:', values)

    const { data } = await signup(values)
    if (data?.code == '00') {
      console.log('data response', data?.data)
      message.success('Đăng kí tài khoản thành công, chuyển sang trang đăng nhập sau 2s')
      setTimeout(() => {
        navigate('/signin')
      }, 2000)
    } else {
      message.error(data?.data?.message)
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <main className='mt-[10px] bg-white border-[1px] border-[#cccc] rounded-[10px] drop-shadow-md'>
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 my-[10px]'>
          <div className='max-w-lg w-full space-y-8'>
            <div>
              <h2 className='mt-6 text-center text-2xl font-extrabold text-[#e11b1e] uppercase'>ĐĂNG Ký</h2>
              <p className='mt-2 text-center text-sm text-gray-600' />
            </div>
            <Form
              initialValues={{}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='on'
              labelCol={{ span: 24 }}
            >
              <Form.Item
                name='name'
                labelCol={{ span: 24 }}
                label='Họ và tên'
                rules={[{ required: true, message: 'Họ và tên không được trống!' }]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                name='email'
                labelCol={{ span: 24 }}
                label='Email'
                rules={[{ required: true, message: 'Email không được trống!' }]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                name='password'
                labelCol={{ span: 24 }}
                label='Mật khẩu'
                rules={[{ required: true, message: 'Mật khẩu không được trống!' }]}
              >
                <Input type='password' size='large' />
              </Form.Item>

              <Form.Item>
                <button className='w-full px-6 py-2 mt-4 text-white bg-[#d70018] rounded-lg hover:bg-[#d70018]'>
                  Đăng ký
                </button>
              </Form.Item>
            </Form>
            <div className='mt-6 text-grey-dark'>
              Bạn đã có tài khoản?{' '}
              <Link className='text-blue-600 hover:underline' to='/signin'>
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup
