import { useEffect, useState } from 'react'
import { Typography, Button, Table, Space, Modal, message, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import styled from 'styled-components'
import numeral from 'numeral'
import { getAll, updateStatusOrder } from '@/api/orders' // import API functions for updating status
import { Eye, PencilLine } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import { OrderType } from '@/type/Orders'

const { Search } = Input
const { Option } = Select

const ListOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    setPageSize(pageSize || 5)
  }
  const fetchData = async () => {
    try {
      const { data } = await getAll()
      setOrders(data.data)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const onUpdateStatus = async (id: number) => {
    const orderToUpdate = orders.find((order) => order?.id === id)
    if (orderToUpdate) {
      setSelectedOrder(orderToUpdate)
      setModalVisible(true)
    }
  }

  const handleOk = async () => {
    if (!selectedOrder) return
    const data = await updateStatusOrder({
      id: selectedOrder.id,
      orderStatus: newStatus
    })
    if (data?.data?.code == '00') {
      message.success('Cập nhật trạng thái thành công')
      setModalVisible(false)
      fetchData()
    } else {
      message.error(data?.data?.message)
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  const data = orders
    .filter((item) => {
      if (!searchText || item.phone.toLowerCase().includes(searchText.toLowerCase())) {
        return true
      }
      return false
    })
    .filter((item) => {
      if (!statusFilter || item.orderStatus === statusFilter) {
        return true
      }
      return false
    })
    .map((item, index) => ({
      key: index + 1,
      id: item.id,
      userId: item.userId,
      name: item.name,
      orderCode: item.orderCode,
      orderDate: item.orderDate,
      phone: item.phone,
      address: item.address,
      totalAmount: item.totalAmount,
      orderStatus: item.orderStatus,
      deliveryDate: item.deliveryDate,
      notes: item.notes
    }))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, data?.length)
  const currentData = data?.slice(startIndex, endIndex)
  const columns: ColumnsType<OrderType> = [
    { title: 'ID', dataIndex: 'key', key: 'id' },
    { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode' },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => `${numeral(value).format('0,0').replace(/,/g, '.')} đ`
    },
    { title: 'Tên người đặt hàng', dataIndex: 'name', key: 'name' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <p style={{ width: '200px' }}>{text}</p>
    },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes', render: (text) => <p style={{ width: '150px' }}>{text}</p> },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    { title: 'Trạng thái', dataIndex: 'orderStatus', key: 'orderStatus' },
    {
      title: 'Action',
      key: 'action',
      render: (record: OrderType) => {
        if (record.orderStatus === 'Hủy đơn hàng' || record.orderStatus === 'Đã nhận hàng') {
          return (
            <Space size='middle' className='flex items-center justify-center space-x-4'>
              <Link to={`detail/${record.id}`} className='inline-block'>
                <Eye />
              </Link>
            </Space>
          )
        } else {
          return (
            <Space size='middle' className='flex items-center justify-center space-x-4'>
              <Link to={`detail/${record.id}`} className='inline-block'>
                <Eye />
              </Link>
              <button style={{ border: '0px', fontSize: '20px' }} onClick={() => onUpdateStatus(record.id as number)}>
                <PencilLine style={{ border: '0px', fontSize: '20px' }} />
              </button>
            </Space>
          )
        }
      }
    }
  ]

  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Danh sách đơn đặt hàng
        </Typography.Title>
      </Breadcrumb>
      <div className='my-3'>
        <Search placeholder='Tìm theo sđt đặt hàng' onSearch={handleSearch} style={{ width: 200, marginRight: 16 }} />
        <Select
          placeholder='Lọc theo trạng thái'
          style={{ width: 200 }}
          onChange={handleStatusFilterChange}
          defaultValue=''
        >
          <Option value=''>Tất cả</Option>
          <Option value='Đặt hàng thành công'>Đặt hàng thành công</Option>
          <Option value='Đang chuẩn bị hàng'>Đang chuẩn bị hàng</Option>
          <Option value='Đang giao hàng'>Đang giao hàng</Option>
          <Option value='Đã giao hàng'>Đã giao hàng</Option>
          <Option value='Đã nhận hàng'>Đã nhận hàng</Option>
          <Option value='Hủy đơn hàng'>Hủy đơn hàng</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          current: currentPage,
          pageSize: pageSize,
          onChange: handlePageChange,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20']
        }}
      />

      <Modal title='Cập nhật trạng thái đơn hàng' visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
        {/* Display order details */}
        <p>Mã đơn hàng: {selectedOrder?.orderCode}</p>
        <p>Ngày đặt hàng: {moment(String(selectedOrder?.orderDate)).format('DD/MM/YYYY HH:mm:ss')}</p>
        <p>Tổng tiền: {numeral(selectedOrder?.totalAmount).format('0,0').replace(/,/g, '.')} đ</p>
        <p>Tên người đặt hàng: {selectedOrder?.name}</p>
        <p>Số điện thoại: {selectedOrder?.phone}</p>
        <p>Địa chỉ: {selectedOrder?.address}</p>
        <p>Trạng thái: {selectedOrder?.orderStatus}</p>
        {/* Select status */}
        <Select value={newStatus} onChange={(value) => setNewStatus(value)} style={{ width: 200, marginBottom: 16 }}>
          <Option value='Đang chuẩn bị hàng'>Đang chuẩn bị hàng</Option>
          <Option value='Đang giao hàng'>Đang giao hàng</Option>
          <Option value='Đã giao hàng'>Đã giao hàng</Option>
          <Option value='Đã nhận hàng'>Đã nhận hàng</Option>
          <Option value='Hủy đơn hàng'>Hủy đơn hàng</Option>
        </Select>
      </Modal>
    </>
  )
}

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  text-transform: uppercase;
`

export default ListOrders
