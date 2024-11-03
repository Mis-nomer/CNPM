import { useEffect, useState } from 'react'
import { Typography, Button, Table, Space, Image, Modal, message, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { ProductType } from '../../../type/Product'
import { getAll, remove } from '../../../api/products'
import styled from 'styled-components'
import numeral from 'numeral'
const { Search } = Input
const { Option } = Select

const optionsByCategory1: any = {
  productTypes: [
    'dienthoai',
    'laptop',
    'tablet',
    'amthanh',
    'dongho',
    'nhathongminh',
    'phukien',
    'pc_manhinh',
    'tivi',
    'hangcu'
  ]
}
const typeDisplayNames: { [key: string]: string } = {
  dienthoai: 'Điện thoại',
  laptop: 'Laptop',
  tablet: 'Máy tính bảng',
  amthanh: 'Âm thanh',
  dongho: 'Đồng hồ',
  nhathongminh: 'Nhà thông minh',
  phukien: 'Phụ kiện',
  pc_manhinh: 'PC-Màn hình',
  tivi: 'Tivi',
  hangcu: 'Hàng cũ'
}
const ListPro = () => {
  const [pro, setPro] = useState<ProductType[]>([])
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    setPageSize(pageSize || 5)
  }

  const data = pro
    .filter((item) => {
      if (!searchText || item?.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true
      }
      return false
    })
    .filter((item) => {
      if (!statusFilter || item?.type === statusFilter) {
        return true
      }
      return false
    })
    .map((item, index) => {
      return {
        key: index + 1,
        id: item?.id,
        image: item?.image,
        name: item?.name,
        type: item?.type,
        brand: item?.brand,
        description: item?.description,
        battery: item?.battery,
        cpu: item?.cpu,
        operatingSystem: item?.operatingSystem,
        ram: item?.ram,
        screenReslution: item?.screenReslution,
        screenSize: item?.screenSize,
        storage: item?.storage,
        thumbnail: item?.thumbnail,
        weight: item?.weight,
        price: item?.price,
        salePrice: item?.salePrice,
        quantity: item?.quantity,
        status: item?.status,
        productView: item?.productView
      }
    })
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, data?.length)
  const currentData = data?.slice(startIndex, endIndex)

  const columns: ColumnsType<ProductType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p style={{ width: '200px' }}>{text}</p>
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `${numeral(value).format('0,0').replace(/,/g, '.')} đ`
    },
    {
      title: 'Giá khuyến mãi',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (value) => `${numeral(value).format('0,0').replace(/,/g, '.')} đ`
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string, record: ProductType) => {
        return <Image width={200} src={text} />
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value) => {
        if (value === 0) {
          return <span style={{ color: 'red' }}>Hết hàng</span>
        } else {
          return numeral(value).format('0,0').replace(/,/g, '.').replace(/\./, ',')
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (value === 1 ? 'Hoạt động' : value === 0 ? 'Ẩn' : value)
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ProductType) => (
        <Space size='middle'>
          <Link to={`${record.id}/edit`}>
            <button style={{ border: '0px', fontSize: '20px' }} onClick={() => console.log(`${record.id}`)}>
              {' '}
              <EditOutlined />
            </button>
          </Link>
          {/* <button style={{ border: '0px', fontSize: '20px' }}>
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => {
                onDelete(record.id as number)
              }}
            />
          </button> */}
        </Space>
      )
    }
  ]
  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAll()
        setPro(data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const onDelete = async (id: number) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa không?',
      onOk: async () => {
        const { data } = await remove(id)
        if (data?.data) {
          setPro(pro.filter((item) => item.id !== id))
        }
        message.success('Xóa thành công')
      }
    })
  }

  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Danh sách sản phẩm
        </Typography.Title>
        <Link to='/admin/products/add'>
          <Button type='dashed' shape='circle' icon={<PlusOutlined />} />
        </Link>
      </Breadcrumb>
      <div className='my-3'>
        <Search placeholder='Tìm theo tên sản phẩm' onSearch={handleSearch} style={{ width: 200, marginRight: 16 }} />
        <Select
          placeholder='Lọc theo trạng thái'
          style={{ width: 200 }}
          onChange={handleStatusFilterChange}
          defaultValue=''
        >
          <Select.Option value={''}>Tất cả</Select.Option>
          {optionsByCategory1.productTypes.map((type: string) => (
            <Select.Option value={type}>{typeDisplayNames[type]}</Select.Option>
          ))}
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
    </>
  )
}

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  text-transform: uppercase;
`

export default ListPro
