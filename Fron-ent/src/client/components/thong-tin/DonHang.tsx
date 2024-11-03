import { listAllOrderByUser, updateStatusOrder } from '@/api/orders'
import { OrderTypeData } from '@/type/OrderType'
import { Button, message, Modal, Space, Table } from 'antd'
import { Eye, PencilLine } from 'lucide-react'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DonHang = () => {
  const [donHang, setDonHang] = useState<OrderTypeData[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderTypeData | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const getDonHang = async () => {
    try {
      const { data } = await listAllOrderByUser(userInfo?.id)
      setDonHang(data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }
  useEffect(() => {
    getDonHang()
  }, [userInfo?.id])

  const handleChiTietDonHang = (order: OrderTypeData) => {
    setSelectedOrder(order)
    setIsModalVisible(true)
  }
  const handleCancelOrder = async (order: OrderTypeData) => {
    await updateOrderStatus(order, 'Hủy đơn hàng')
  }

  const handleConfirmReceived = async (order: OrderTypeData) => {
    await updateOrderStatus(order, 'Đã nhận hàng')
  }

  const updateOrderStatus = async (order: OrderTypeData, newStatus: string) => {
    const data = await updateStatusOrder({
      id: order.id,
      orderStatus: newStatus
    })
    if (data?.data?.code == '00') {
      message.success('Cập nhật trạng thái thành công')
      getDonHang()
    } else {
      message.error(data?.data?.message)
    }
  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text: number) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text: string) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text: string) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      render: (text: string) => <p style={{ width: '100px' }}>{text}</p>
    },
    {
      key: 'action',
      render: (record: OrderTypeData) => {
        if (record.orderStatus === 'Đặt hàng thành công' || record.orderStatus === 'Đang chuẩn bị hàng') {
          return (
            <div className='flex flex-col'>
              <Button
                style={{ backgroundColor: 'red', color: 'white', border: 'none', marginBottom: '10px' }}
                onClick={() => handleCancelOrder(record)}
              >
                Hủy đơn hàng
              </Button>
              <Button style={{ borderColor: 'red', color: 'black' }} onClick={() => handleChiTietDonHang(record)}>
                Xem chi tiết
              </Button>
            </div>
          )
        } else if (record.orderStatus === 'Đang giao hàng' || record.orderStatus === 'Đã giao hàng') {
          return (
            <div className='flex flex-col'>
              <Button
                style={{ backgroundColor: 'red', color: 'white', border: 'none', marginBottom: '10px' }}
                onClick={() => handleConfirmReceived(record)}
              >
                Đã nhận hàng
              </Button>
              <Button style={{ borderColor: 'red', color: 'black' }} onClick={() => handleChiTietDonHang(record)}>
                Xem chi tiết
              </Button>
            </div>
          )
        } else {
          return (
            <Button style={{ borderColor: 'red', color: 'black' }} onClick={() => handleChiTietDonHang(record)}>
              Xem chi tiết
            </Button>
          )
        }
      }
    }
  ]

  const expandedRowRender = (record: OrderTypeData) => {
    const columns = [
      { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
      { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
      {
        title: 'Đơn giá',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (text: number) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
      },
      {
        title: 'Thành tiền',
        dataIndex: 'total',
        key: 'total',
        render: (text: number, record: { quantity: number; unitPrice: number }) => (
          <span>
            {(record.quantity * record.unitPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
        )
      }
    ]

    return <Table columns={columns} dataSource={record.orderDetails} pagination={false} />
  }

  return (
    <div className=' mt-5'>
      <h1>Danh sách đơn hàng</h1>

      <Table bordered columns={columns} dataSource={donHang} expandable={{ expandedRowRender }} rowKey='id' />
      <Modal
        title='Chi tiết đơn hàng'
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1080}
      >
        {selectedOrder && (
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Chi tiết đơn hàng</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='mb-4'>
                <p>
                  <span className='font-semibold'>Mã đơn hàng:</span> {selectedOrder.orderCode}
                </p>
                <p>
                  <span className='font-semibold'>Ngày đặt hàng:</span>{' '}
                  {moment(String(selectedOrder.orderDate)).format('DD/MM/YYYY HH:mm:ss')}
                </p>
                <p>
                  <span className='font-semibold'>Ngày giao hàng dự kiến:</span>{' '}
                  {moment(String(selectedOrder.deliveryDate)).format('DD/MM/YYYY HH:mm:ss')}
                </p>
                <p>
                  <span className='font-semibold'>Tên người nhận hàng:</span> {selectedOrder.name}
                </p>
                <p>
                  <span className='font-semibold'>Số điện thoại:</span> {selectedOrder.phone}
                </p>
                <p>
                  <span className='font-semibold'>Địa chỉ nhận hàng:</span> {selectedOrder.address}
                </p>
                <p>
                  <span className='font-semibold'>Trạng thái đơn hàng:</span> {selectedOrder.orderStatus}
                </p>
                <p>
                  <span className='font-semibold'>Ghi chú:</span> {selectedOrder.notes}
                </p>
              </div>
              <div>
                <table className='table-auto w-full border-collapse'>
                  <tbody>
                    {selectedOrder.orderDetails.map((item: any) => (
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
                          <span>{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className='px-2 py-2 text-left'>
                        <span className='font-semibold'>Tổng tiền:</span>
                      </td>
                      <td className='px-2 py-2 text-right'>
                        <span>
                          {selectedOrder.totalAmount.toLocaleString('vi-VN', {
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
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DonHang
