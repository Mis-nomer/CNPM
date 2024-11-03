import { Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../../api/user'

const Signin: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Success:', values)

    const  {data}  = await signin(values)
    console.log('data response', data)
    if (data?.code == '00') {
      if (data) {
        localStorage.setItem('token', JSON.stringify(data?.data?.token))
        localStorage.setItem('userInfo', JSON.stringify(data?.data?.user))
        message.success('Đăng nhập tài khoản thành công, chuyển sang trang đăng nhập sau 2s')
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        },2000)
      }
    } else {
      message.error(data?.message)
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
              <h2 className='mt-6 text-center text-2xl font-extrabold text-[#e11b1e] uppercase'>ĐĂNG NHẬP</h2>
              <p className='mt-2 text-center text-sm text-gray-600' />
            </div>
            <div className='space-y-6'>
              <Form
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='on'
                labelCol={{ span: 24 }}
                data-sb-form-api-token='API_TOKEN'
              >
                <div className='mt-6'>
                  <Form.Item
                    name='email'
                    labelCol={{ span: 24 }}
                    label='Email'
                    rules={[{ required: true, message: 'Email không được trống!' }]}
                  >
                    <Input size='large' />
                  </Form.Item>
                </div>
                <div className='mt-6'>
                  <Form.Item
                    name='password'
                    labelCol={{ span: 24 }}
                    label='Mật khẩu'
                    rules={[{ required: true, message: 'Mật khẩu không được trống!' }]}
                  >
                    <Input type='password' size='large' />
                  </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'></div>
                  <Link to='/forgetPass' className='text-sm text-[#d70018] hover:underline'>
                    Forgot Password?
                  </Link>
                </div>
                <div className='mt-6'>
                  <button className='w-full px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md  bg-[#d70018]  hover:bg-[#d70018] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker'>
                    Đăng nhập
                  </button>
                </div>
              </Form>
            </div>
            <div className='text-gray-600 dark:text-gray-400'>
              Bạn chưa có tài khoản?{' '}
              <Link to='/signup' className='text-blue-600 hover:underline'>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signin
