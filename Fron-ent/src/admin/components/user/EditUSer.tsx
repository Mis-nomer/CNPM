import { Typography, Col, Row, Button, Form, Input, InputNumber, Select, message, UploadFile, DatePicker } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { updateUser, listOneUser } from '../../../api/user'
import { UserType } from '../../../type/user'

const EditUser: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserType>()
  const [form] = Form.useForm()

  useEffect(() => {
    const getUser = async (id: number) => {
      const { data } = await listOneUser(id)
      setUsers(data.data)
      form.setFieldsValue(data?.data)
    }
    getUser(Number(id))
  }, [id])
  console.log(users?.password)

  const onFinish = async (values: any) => {
    const valueEdit = {
      id: Number(id),
      name: values?.name,
      email: values?.email,
      password: values?.password == null ? users?.password : values?.password,
      phone: values?.phone,
      address: values?.address,
      birthday: values?.birthday,
      isEnabled: values?.isEnabled,
      roleId: values?.roleId
    }
    try {
      await updateUser(valueEdit as any)
      message.success('Cập nhật thành công')
      navigate('/admin/user')
    } catch (err) {
      console.log(err)
      message.error('Có lỗi xảy ra')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Cập nhật tài khoản
        </Typography.Title>
      </Breadcrumb>

      <Form form={form} initialValues={users} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='on'>
        <Row gutter={16}>
          <Col span={14}>
            <Typography.Title level={3}>Thông tin tài khoản</Typography.Title>
            <Form.Item
              name='name'
              labelCol={{ span: 24 }}
              label='Họ và tên'
              rules={[{ required: true, message: 'Họ và tên không để trống!' }]}
            >
              <Input size='large' />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='email'
                  label='Địa chi email'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Email không để trống!' }]}
                >
                  <Input style={{ width: '100%' }} size='large' disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='password' labelCol={{ span: 24 }} label='Mật khẩu'>
                  <Input type='password' size='large' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='Chức vụ'
                  name='isEnabled'
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Chức vụ không để trống!'
                    }
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                  >
                    <Select.Option value={1}>Hoạt động</Select.Option>
                    <Select.Option value={2}>Khóa</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Chức vụ'
                  name='roleId'
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Chức vụ không để trống!'
                    }
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                  >
                    <Select.Option value={1}>Khách hàng</Select.Option>
                    <Select.Option value={2}>Nhân viên</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='phone'
                  label='Số điện thoại'
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không để trống!'
                    }
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} size='large' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name='address'
              labelCol={{ span: 24 }}
              label='Địa chỉ'
              rules={[
                {
                  required: true,
                  message: 'Địa chỉ không để trống!'
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item>
              <Link to='/admin/user'>
                <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>
                  Back
                </Button>
              </Link>
              <Button type='primary' htmlType='submit'>
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-transform: uppercase;
`

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  justify-content: center;
  min-height: 300px;
  border: 1px solid gray;
  margin-bottom: 10px;
`

export default EditUser
