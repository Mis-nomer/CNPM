import { deleteCartService } from '@/api/carts'
import { addOrders } from '@/api/orders'
import { Card, Form, Input, Steps, message, Divider, Typography, Button } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, UserOutlined, CreditCardOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Title, Text } = Typography

const AddOrders = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { carts, priceCarts } = location.state || { carts: [], priceCarts: 0 }
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const cartId = carts.map((item: any) => item.id)

  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }))
  }

  const handleSubmit = async (values: any) => {
    const orderDetails = carts.map((item: any) => ({
      productId: item.products.id,
      quantity: item.quantity,
      unitPrice: item.products.price
    }))

    const orderData = {
      userId: userInfo?.id,
      ...values,
      totalAmount: priceCarts,
      orderDetail: orderDetails
    }

    const data = await addOrders(orderData)
    if (data?.data?.code === '00') {
      await Promise.all(cartId.map((id: any) => deleteCartService(id)))
      message.success('Đặt hàng thành công')
      setTimeout(() => navigate('/'), 2000)
    } else {
      message.error(data?.data?.message)
    }
  }

  const formatNumber = (number: number) => {
    const [integerPart, decimalPart] = number.toString().split('.')
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return decimalPart ? `${formattedInteger}.${decimalPart} đ` : `${formattedInteger} đ`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/cart" className="text-red-600 hover:text-red-700 flex items-center">
            <ArrowLeftOutlined className="mr-2" /> Trở về
          </Link>
          <Title level={3} className="!mb-0">Đặt hàng</Title>
        </div>
        <Steps
          items={[
            { title: 'Giỏ hàng', icon: <ShoppingCartOutlined /> },
            { title: 'Thông tin đặt hàng', icon: <UserOutlined />, status: 'process' },
            { title: 'Thanh toán', icon: <CreditCardOutlined /> }
          ]}
          current={1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="md:col-span-2">
          <Card title="Thông tin đặt hàng">
            <Form
              initialValues={userDetails}
              onFinish={handleSubmit}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Tên người nhận"
                rules={[{ required: true, message: 'Tên người nhận hàng không để trống!' }]}
              >
                <Input
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên người nhận"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Số điện thoại không để trống!' }]}
              >
                <Input
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ nhận hàng"
                rules={[{ required: true, message: 'Địa chỉ nhận hàng không để trống!' }]}
              >
                <Input
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ nhận hàng"
                />
              </Form.Item>

              <Form.Item
                name="notes"
                label="Ghi chú"
              >
                <TextArea
                  name="notes"
                  value={userDetails.notes}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú nếu có"
                  rows={4}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  Đặt hàng ngay
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        {/* Summary Section */}
        <div className="md:col-span-1">
          <Card title="Đơn hàng của bạn">
            <div className="space-y-4">
              {carts.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-4 py-2 border-b">
                  <img
                    src={item?.products?.thumbnail}
                    alt={item?.products?.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{item?.products?.name}</p>
                    <p className="text-gray-500 text-sm">Số lượng: {item?.quantity}</p>
                    <p className="text-red-600 font-medium mt-1">
                      {formatNumber(item?.products?.price)}
                    </p>
                  </div>
                </div>
              ))}

              <Divider className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Tạm tính:</Text>
                  <Text>{formatNumber(priceCarts)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Phí vận chuyển:</Text>
                  <Text className="text-green-600">Miễn phí</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between items-center">
                  <Text strong>Tổng cộng:</Text>
                  <Text className="text-xl text-red-600 font-bold">
                    {formatNumber(priceCarts)}
                  </Text>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Text strong>Hình thức thanh toán:</Text>
                <Text className="block mt-1">Thanh toán khi nhận hàng</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddOrders
