import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../../api/user';

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { data } = await signup(values);
    if (data?.code === '00') {
      console.log('data response', data?.data);
      message.success('Đăng ký tài khoản thành công');
      navigate('/signin');
    } else {
      message.error(data?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 uppercase mb-2">Đăng ký</h2>
          <p className="text-gray-600 text-sm">Vui lòng nhập thông tin đăng ký</p>
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
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Họ và tên không được trống!' }]}
          >
            <Input size="large" className="rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600" />
          </Form.Item>
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
          <Form.Item>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-center text-white bg-red-600 hover:bg-red-700 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
            >
              Đăng ký
            </button>
          </Form.Item>
        </Form>
        <div className="text-gray-600 text-sm text-center mt-4">
          Bạn đã có tài khoản?{' '}
          <Link className="text-red-600 hover:underline" to="/signin">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
