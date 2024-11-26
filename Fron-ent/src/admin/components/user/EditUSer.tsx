import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Typography, Form, Input, Select, message, Button, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { updateUser, listOneUser } from '../../../api/user';
import { UserType } from '../../../type/user';

const { Title } = Typography;

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await listOneUser(Number(id));
        setUser(data.data);
        form.setFieldsValue(data.data);
      } catch (error) {
        message.error('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      setSubmitLoading(true);
      const updateData: any = {
        id: Number(id),
        name: values.name,
        email: values.email,
        password: values.password || user?.password,
        phone: values.phone,
        address: values.address,
        birthday: values.birthday,
        isEnabled: values.isEnabled,
        roleId: values.roleId
      };

      await updateUser(updateData);
      message.success('Cập nhật thông tin thành công');
      navigate('/admin/user');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="!mb-0">Cập nhật tài khoản</Title>
            <p className="text-gray-500 mt-1">Cập nhật thông tin người dùng</p>
          </div>
          <Link
            to="/admin/user"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftOutlined className="mr-1" /> Quay lại
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={user}
          className="max-w-2xl"
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="col-span-2">
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input size="large" placeholder="Nhập họ tên" />
              </Form.Item>
            </div>

            {/* Contact Info */}
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

            {/* Account Settings */}
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={[
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Nhập để thay đổi mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="roleId"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            >
              <Select size="large" placeholder="Chọn vai trò">
                <Select.Option value={1}>Khách hàng</Select.Option>
                <Select.Option value={2}>Nhân viên</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isEnabled"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select size="large" placeholder="Chọn trạng thái">
                <Select.Option value={1}>
                  <span className="text-green-600">● Hoạt động</span>
                </Select.Option>
                <Select.Option value={0}>
                  <span className="text-red-600">● Khóa</span>
                </Select.Option>
              </Select>
            </Form.Item>

            {/* Address */}
            <div className="col-span-2">
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập địa chỉ đầy đủ"
                />
              </Form.Item>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
            <Button
              onClick={() => navigate('/admin/user')}
              size="large"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={submitLoading}
              size="large"
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
