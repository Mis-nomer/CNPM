import { Typography, Col, Row, Button, Form, Input, InputNumber, Select, message, UploadFile } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { PlusSquareOutlined } from '@ant-design/icons'
import { UploadProps } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { RcFile } from 'antd/lib/upload'
import { useState } from 'react'
import styled from 'styled-components'
import { upload } from '../../../api/images'
import { addUser } from '../../../api/user'

const { TextArea } = Input

const AddUser: React.FC = () => {
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<UploadFile[] | any>([])

  const onFinish = async (values: any) => {
    const imgLink = await upload(fileList[0])
    const valueAdd = {
      image: imgLink,
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      role: values.role
    }
    try {
      const data = await addUser(valueAdd as any)
      message.success('Thêm mới thành công')
      navigate('/admin/user')
    } catch (err) {
      message.error('Có lỗi xảy ra')
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setfileList(newFileList)
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  return (
    <div>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Thêm mới tài khoản
        </Typography.Title>
      </Breadcrumb>

      <Form initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='on'>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name='image' labelCol={{ span: 24 }} label='Hình ảnh đại diện'>
              <UploadWrapper>
                <div style={{ textAlign: 'center', border: '0' }}>
                  <Dragger
                    listType='picture'
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => {
                      return false
                    }}
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    onChange={handleChangeImage}
                    onPreview={onPreview}
                    fileList={fileList}
                    style={{ border: '0' }}
                  >
                    <p className='ant-upload-drag-icon'>
                      <PlusSquareOutlined style={{ fontSize: '50px' }} />
                    </p>
                    <p>Thêm ảnh!</p>
                  </Dragger>
                </div>
              </UploadWrapper>
            </Form.Item>
          </Col>
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
                  <Input style={{ width: '100%' }} size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='password'
                  labelCol={{ span: 24 }}
                  label='Mật khẩu'
                  rules={[{ required: true, message: 'Mật khẩu không được trống!' }]}
                >
                  <Input type='password' size='large' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='Chức vụ'
                  name='role'
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
                    <Select.Option value={0}>Khách hàng</Select.Option>
                    <Select.Option value={1}>Nhân viên</Select.Option>
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
                Thêm mới
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

export default AddUser
