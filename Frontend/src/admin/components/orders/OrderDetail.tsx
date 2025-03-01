import { listOneOrder } from '@/api/orders'
import { OrderTypeData } from '@/type/OrderType'
import { Button } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderTypeData | null>(null)

  useEffect(() => {
    const fetchOrder = async (id: number) => {
      try {
        const { data } = await listOneOrder(id)
        setOrder(data.data)
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    }

    fetchOrder(Number(id))
  }, [id])
  const formatNumber = (number: number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

  return (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <h2 className='text-xl font-semibold mb-4'>Chi tiết đơn hàng</h2>
      <div className='grid  grid-cols-2 gap-4'>
        <div className='mb-4'>
          <p>
            <span className='font-semibold'>Mã đơn hàng:</span> {order?.orderCode}
          </p>
          <p>
            <span className='font-semibold'>Ngày đặt hàng:</span>{' '}
            {moment(String(order?.orderDate)).format('DD/MM/YYYY HH:mm:ss')}
          </p>
          <p>
            <span className='font-semibold'>Ngày giao hàng dự kiến:</span>
            {moment(String(order?.deliveryDate)).format('DD/MM/YYYY HH:mm:ss')}
          </p>
          <p>
            <span className='font-semibold'>Tên người nhận hàng:</span> {order?.name}
          </p>
          <p>
            <span className='font-semibold'>Số điện thoại:</span> {order?.phone}
          </p>
          <p>
            <span className='font-semibold'>Địa chỉ nhận hàng:</span> {order?.address}
          </p>
          <p>
            <span className='font-semibold'>Trạng thái đơn hàng:</span> {order?.orderStatus}
          </p>
          <p>
            <span className='font-semibold'>Ghi chú:</span> {order?.notes}
          </p>
        </div>
        <div>
          <table className='table-auto w-full border-collapse'>
            <tbody>
              {order?.orderDetails?.map((item: any) => (
                <tr key={item.id} className='border-b'>
                  <td className='w-1/4 px-2 py-2'>
                    <div className='w-28 h-20'>
                      <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                    </div>
                  </td>
                  <td className='w-1/4 px-2 py-2'>
                    <Link to={`/products/${item.id}`}>
                      <p className='m-0 text-sm'>{item.name}</p>
                    </Link>
                  </td>
                  <td className='w-1/4 px-2 py-2 text-center'>
                    <span>Số lượng: {item.quantity}</span>
                  </td>
                  <td className='w-1/4 px-2 py-2 text-right'>
                    <span>{formatNumber(item.unitPrice)}</span>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className='px-2 py-2 text-left'>
                  <span className='font-semibold'>Tổng tiền:</span>
                </td>
                <td className='px-2 py-2 text-right'>
                  <span>
                    {order?.totalAmount.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Link to='/admin/orders'>
        <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>
          Back
        </Button>
      </Link>
    </div>
  )
}

export default OrderDetail
