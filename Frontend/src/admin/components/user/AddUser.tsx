import { upload } from '@/api/images';
import { addUser } from '@/api/user';
import { ArrowLeftOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Typography, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/lib/upload';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: number;
  image?: string;
}

const { Title } = Typography;

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: UserFormData) => {
    try {
      setLoading(true);

      let imageUrl = '';
      if (fileList[0]?.originFileObj) {
        imageUrl = await upload(fileList[0].originFileObj);
      }

      const userData: any = {
        ...values,
        image: imageUrl,
      };

      await addUser(userData);
      message.success('Thêm mới tài khoản thành công');
      navigate('/admin/user');
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm tài khoản');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="!mb-0">Thêm mới tài khoản</Title>
            <p className="text-gray-500 mt-1">Điền thông tin để tạo tài khoản mới</p>
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
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-8">
              {/* Avatar Upload */}
              <div className="col-span-1">
                <Form.Item label="Ảnh đại diện">
                  <div className="text-center">
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleUploadChange}
                      onPreview={onPreview}
                      maxCount={1}
                      beforeUpload={() => false}
                      className="flex justify-center"
                    >
                      {fileList.length === 0 && (
                        <div className="p-4">
                          <UserOutlined className="text-2xl text-gray-400 mb-2" />
                          <div className="text-gray-500">Tải ảnh lên</div>
                        </div>
                      )}
                    </Upload>
                  </div>
                </Form.Item>
              </div>

              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                      { required: true, message: 'Vui lòng nhập họ tên!' }
                    ]}
                  >
                    <Input size="large" placeholder="Nhập họ tên" />
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

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input size="large" placeholder="example@email.com" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu!' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                    ]}
                  >
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-6">
                  <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                  >
                    <Select size="large" placeholder="Chọn vai trò">
                      <Select.Option value={0}>
                        <span className="text-blue-600">👤 Khách hàng</span>
                      </Select.Option>
                      <Select.Option value={1}>
                        <span className="text-green-600">👨‍💼 Nhân viên</span>
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  >
                    <Input.TextArea
                      rows={1}
                      placeholder="Nhập địa chỉ đầy đủ"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <Button
                size="large"
                onClick={() => navigate('/admin/user')}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                Thêm mới
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
