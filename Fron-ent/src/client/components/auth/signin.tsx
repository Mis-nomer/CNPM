import { Form, Input, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../../../api/user';

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { data } = await signin(values);
    console.log('data response', data);
    if (data?.code === '00') {
      if (data) {
        localStorage.setItem('token', JSON.stringify(data?.data?.token));
        localStorage.setItem('userInfo', JSON.stringify(data?.data?.user));
        message.success('Đăng nhập tài khoản thành công');
        navigate('/');
      }
    } else {
      message.error(data?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 uppercase mb-2">Đăng nhập</h2>
          <p className="text-gray-600 text-sm">Vui lòng nhập thông tin đăng nhập</p>
        </div>
        <Form
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email không được trống!' }]}
          >
            <Input size="large" className="rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Mật khẩu không được trống!' }]}
          >
            <Input type="password" size="large" className="rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600" />
          </Form.Item>
          <div className="flex items-center justify-between mb-2">
            <div></div>
            <button onClick={() => { message.info("Chức năng này đang trong quá trình phát triền") }} className="text-sm text-red-600 hover:underline">
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-center text-white bg-red-600 hover:bg-red-700 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
          >
            Đăng nhập
          </button>
        </Form>
        <div className="text-gray-600 text-sm text-center mt-4">
          Bạn chưa có tài khoản?{' '}
          <Link to="/signup" className="text-red-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
