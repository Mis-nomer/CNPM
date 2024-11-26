import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image, Input, Modal, Select, Table, Typography, message } from 'antd'
import { EditOutlined, PlusOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { getAll, remove } from '../../../api/products'
import { ProductType } from '../../../type/Product'

const { Search } = Input

const CATEGORY_TYPES = {
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
} as const

interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const ListPro: React.FC = () => {
  // States
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
  })

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getAll()
      setProducts(data?.data || [])
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data?.data?.length || 0
        },
      })
    } catch (error) {
      message.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = products
    .filter(item =>
      !searchText || item?.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(item =>
      !categoryFilter || item?.type === categoryFilter
    )
    .map((item, index) => ({
      key: index + 1,
      ...item
    }))

  const columns: ColumnsType<ProductType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: 60,
      align: 'center'
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-4">
          <Image
            src={record.thumbnail}
            alt={text}
            width={80}
            className="rounded-lg object-cover"
            placeholder={
              <div className="flex items-center justify-center bg-gray-100 rounded-lg w-20 h-20">
                <LoadingOutlined className="text-gray-400" />
              </div>
            }
          />
          <div>
            <p className="font-medium text-gray-900 line-clamp-2">{text}</p>
            <p className="text-sm text-gray-500 mt-1">{CATEGORY_TYPES[record.type as keyof typeof CATEGORY_TYPES]}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      align: 'right',
      render: (value, record) => (
        <div>
          <p className="font-medium text-gray-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
          </p>
          {record.price > value && (
            <p className="text-sm text-gray-500 line-through">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}
            </p>
          )}
        </div>
      ),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      align: 'center',
      render: (value) => (
        <span className={`${value === 0 ? 'text-red-500' : 'text-gray-900'} `}>
          {value === 0 ? 'Hết hàng' : new Intl.NumberFormat('vi-VN').format(value)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      render: (value) => (
        <span className={`px - 2 py - 1 rounded - full text - sm ${value === 1
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
          } `}>
          {value === 1 ? 'Hoạt động' : 'Ẩn'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            to={`${record.id}/edit`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <EditOutlined />
          </Link >
          {/* <button
            onClick={() => handleDelete(record.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <DeleteOutlined />
          </button> */}
        </div >
      ),
    },
  ]

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    });
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa sản phẩm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await remove(id)
          setProducts(products.filter(item => item.id !== id))
          message.success('Xóa sản phẩm thành công')
        } catch (error) {
          message.error('Không thể xóa sản phẩm')
        }
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography.Title level={2} className="!mb-0">
          Danh sách sản phẩm
        </Typography.Title>
        <Link to="/admin/products/add">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="flex items-center"
          >
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          className="w-64"
          onChange={e => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Lọc theo danh mục"
          allowClear
          className="w-48"
          onChange={value => setCategoryFilter(value)}
        >
          {Object.entries(CATEGORY_TYPES).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Products Table */}
      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        className="border rounded-lg"
      />
    </div>
  )
}

export default ListPro
