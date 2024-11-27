import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Form, Input, message, Button, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { updateUser, listOneUser } from '@/api/user';
import { UserType } from '@/type/user';
import DonHang from './DonHang';

const { Title } = Typography;

const ThongTinAccount = () => {
  const [auth, setAuth] = useState<any>('');
  const [selectedTab, setSelectedTab] = useState<string>('cap-nhat-thong-tin');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    if (userInfo) {
      setAuth(userInfo);
    } else {
      setAuth('');
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await listOneUser(userInfo?.id);
        setUser(data.data);
        form.setFieldsValue(data.data);
      } catch (error) {
        message.error('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.id) fetchUser();
  }, [userInfo?.id, form]);

  const onFinish = async (values: any) => {
    try {
      setSubmitLoading(true);
      const updateData: any = {
        id: userInfo?.id,
        name: values.name,
        email: values.email,
        password: values.password || user?.password,
        phone: values.phone,
        address: values.address,
        roleId: userInfo?.roleId,
        isEnabled: user?.isEnabled
      };

      const response = await updateUser(updateData);
      if (response?.data?.code === '00') {
        message.success('Cập nhật thông tin thành công');
        // Cập nhật lại thông tin trong localStorage
        const updatedUser = { ...userInfo, ...updateData };
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        setAuth(updatedUser);
      } else {
        message.error('Có lỗi xảy ra khi cập nhật');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="border-b">
          <div className="flex justify-between items-center px-6 py-4">
            <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors">
              Trang chủ
            </Link>
            <div className="flex space-x-4">
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg ${selectedTab === 'cap-nhat-thong-tin'
                  ? 'bg-gray-200 text-red-600'
                  : 'text-gray-600 hover:bg-gray-200 transition-colors'
                  }`}
                onClick={() => setSelectedTab('cap-nhat-thong-tin')}
              >
                Cập nhật thông tin
              </div>
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg ${selectedTab === 'don-hang-da-mua'
                  ? 'bg-gray-200 text-red-600'
                  : 'text-gray-600 hover:bg-gray-200 transition-colors'
                  }`}
                onClick={() => setSelectedTab('don-hang-da-mua')}
              >
                Đơn hàng đã mua
              </div>
              {auth && auth?.roleId === 2 && (
                <Link
                  to="/admin"
                  className="cursor-pointer px-4 py-2 rounded-t-lg text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Trang admin
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'cap-nhat-thong-tin' && (
            <div>
              <div className="mb-8">
                <Title level={2} className="!mb-0">
                  Cập nhật thông tin cá nhân
                </Title>
                <p className="text-gray-500 mt-1">Cập nhật thông tin tài khoản của bạn</p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Spin size="large" />
                </div>
              ) : (
                <div className="bg-white rounded-lg">
                  <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user} className="max-w-2xl">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Thông tin cơ bản */}
                      <div className="col-span-2">
                        <Form.Item
                          name="name"
                          label="Họ và tên"
                          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                          <Input size="large" placeholder="Nhập họ tên" />
                        </Form.Item>
                      </div>

                      {/* Thông tin liên hệ */}
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email!' },
                          { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                      >
                        <Input size="large" disabled placeholder="example@email.com" />
                      </Form.Item>

                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại!' },
                          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
                      >
                        <Input size="large" placeholder="Nhập số điện thoại" />
                      </Form.Item>

                      {/* Mật khẩu */}
                      <Form.Item
                        name="password"
                        label="Mật khẩu mới"
                        rules={[{ min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }]}
                      >
                        <Input.Password size="large" placeholder="Nhập để thay đổi mật khẩu" />
                      </Form.Item>

                      {/* Địa chỉ */}
                      <div className="col-span-2">
                        <Form.Item
                          name="address"
                          label="Địa chỉ"
                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                          <Input.TextArea rows={3} placeholder="Nhập địa chỉ đầy đủ" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        loading={submitLoading}
                        size="large"
                      >
                        Cập nhật thông tin
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          )}
          {selectedTab === 'don-hang-da-mua' && (
            <div>
              <DonHang />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinAccount;
