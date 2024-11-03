import { deleteCartService } from '@/api/carts'
import { addOrders } from '@/api/orders'
import { Form, Input, message } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const { TextArea } = Input

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
    <div>
      <main className='mt-[20px]'>
        <div className='max-w-[600px] mx-auto'>
          <div className='text-red-600 hover:text-red-600 flex justify-between items-center w-[600px] h-[50px] bg-white font-bold'>
            <Link to='/cart' className='ml-[20px] text-red-600 hover:text-red-600'>
              <i className='fa-solid fa-angle-left'></i> Trở về
            </Link>
            <div className='text-[24px]'>Đặt hàng</div>
          </div>
          <div className='list-cart'>
            <table className='table-auto w-full border-collapse'>
              <tbody>
                {carts.map((item: any, index: number) => (
                  <tr key={index} className='border-b'>
                    <td className='w-32 px-2 py-2'>
                      <img
                        className='w-28 h-20 object-cover'
                        src={item?.products?.thumbnail}
                        alt={item?.products?.name}
                      />
                    </td>
                    <td className='w-48 px-2 py-2'>
                      <p className='m-0 text-sm'>{item?.products?.name}</p>
                    </td>
                    <td className='w-32 px-2 py-2 text-center'>
                      <span>x{item?.quantity}</span>
                    </td>
                    <td className='px-2 py-2 text-right'>
                      <span>{formatNumber(item?.products?.price)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='total'>
            <div className='font-semibold'>Tổng tiền tạm tính:</div>
            <div className='total-text'>{formatNumber(priceCarts)}</div>
          </div>
          <Form initialValues={userDetails} onFinish={handleSubmit} autoComplete='on'>
            <Form.Item
              name='name'
              labelCol={{ span: 24 }}
              label='Tên người nhận'
              rules={[{ required: true, message: 'Tên người nhận hàng không để trống!' }]}
            >
              <Input type='text' name='name' value={userDetails.name} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item
              name='phone'
              labelCol={{ span: 24 }}
              label='Số điện thoại'
              rules={[{ required: true, message: 'Số điện thoại không để trống!' }]}
            >
              <Input type='text' name='phone' value={userDetails.phone} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item
              name='address'
              labelCol={{ span: 24 }}
              label='Địa chỉ nhận hàng'
              rules={[{ required: true, message: 'Địa chỉ nhận hàng không để trống!' }]}
            >
              <Input type='text' name='address' value={userDetails.address} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item name='notes' labelCol={{ span: 24 }} label='Ghi chú'>
              <TextArea name='notes' value={userDetails.notes} onChange={handleInputChange} />
            </Form.Item>
            <div className='py-2 font-bold'>Hình thức thanh toán: Thanh toán khi nhận hàng</div>
            <div className='flex justify-end'>
              <button type='submit' className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700'>
                Đặt hàng
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default AddOrders
