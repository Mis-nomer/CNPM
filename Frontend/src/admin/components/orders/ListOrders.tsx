import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Table, Modal, message, Input, Select, Tag, Badge } from 'antd';
import { Eye, PencilLine } from 'lucide-react';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import { getAll, updateStatusOrder } from '@/api/orders';
import { OrderType } from '@/type/Orders';

const { Search } = Input;

type OrderStatus =
  | 'Đặt hàng thành công'
  | 'Đang chuẩn bị hàng'
  | 'Đang giao hàng'
  | 'Đã giao hàng'
  | 'Đã nhận hàng'
  | 'Hủy đơn hàng';

interface OrderStatusConfig {
  color: string;
  icon: string;
}

interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const ORDER_STATUSES: Record<OrderStatus, OrderStatusConfig> = {
  'Đặt hàng thành công': { color: 'processing', icon: '🆕' },
  'Đang chuẩn bị hàng': { color: 'warning', icon: '📦' },
  'Đang giao hàng': { color: 'blue', icon: '🚚' },
  'Đã giao hàng': { color: 'success', icon: '✅' },
  'Đã nhận hàng': { color: 'green', icon: '🏠' },
  'Hủy đơn hàng': { color: 'error', icon: '❌' },
};

const ListOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getAll();
      setOrders(data.data);
      setTableParams(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data.data.length,
        },
      }));
    } catch (error) {
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const filteredOrders = orders
    .filter(item =>
      !searchText || item.phone.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(item =>
      !statusFilter || item.orderStatus === statusFilter
    )
    .map((item, index) => ({
      key: index + 1,
      ...item,
    }));

  const handleUpdateStatus = (order: OrderType): void => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus as OrderStatus);
    setModalVisible(true);
  };

  const handleStatusUpdate = async (): Promise<void> => {
    if (!selectedOrder || !newStatus) return;

    try {
      const response = await updateStatusOrder({
        id: selectedOrder.id,
        orderStatus: newStatus
      });

      if (response?.data?.code === '00') {
        message.success('Cập nhật trạng thái thành công');
        await fetchOrders();
        setModalVisible(false);
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error) {
      message.error('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  const columns: ColumnsType<OrderType> = [
    {
      title: '#',
      dataIndex: 'key',
      width: 60,
      align: 'center',
    },
    {
      title: 'Thông tin đơn hàng',
      dataIndex: 'orderCode',
      render: (_, record) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900">#{record.orderCode}</p>
          <p className="text-sm text-gray-500">
            {moment(record.orderDate as string | number | Date).format('DD/MM/YYYY HH:mm')}
          </p>
          <Tag color="blue">
            {formatCurrency(record.totalAmount)}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Thông tin khách hàng',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{record.name}</p>
          <p className="text-sm text-gray-500">{record.phone}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{record.address}</p>
        </div>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      width: 200,
      render: (text: string) => (
        <p className="text-sm text-gray-500 line-clamp-2">{text}</p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      width: 150,
      align: 'center',
      render: (status: OrderStatus) => {
        const statusConfig = ORDER_STATUSES[status];
        return (
          <Badge status={statusConfig.color as any}>
            <span className="inline-flex items-center space-x-1">
              <span>{statusConfig.icon}</span>
              <span>{status}</span>
            </span>
          </Badge>
        );
      },
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            to={`detail/${record.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Eye size={18} />
          </Link>
          {!['Hủy đơn hàng', 'Đã nhận hàng'].includes(record.orderStatus as string) && (
            <button
              onClick={() => handleUpdateStatus(record)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            >
              <PencilLine size={18} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Typography.Title level={2} className="!mb-0">
            Danh sách đơn hàng
          </Typography.Title>
          <p className="text-gray-500 mt-1">
            Quản lý và cập nhật trạng thái đơn hàng
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Search
          placeholder="Tìm theo số điện thoại"
          allowClear
          className="w-64"
          onChange={e => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          allowClear
          className="w-56"
          onChange={(value) => setStatusFilter(value as OrderStatus)}
        >
          {Object.entries(ORDER_STATUSES).map(([status, config]) => (
            <Select.Option key={status} value={status}>
              <span className="inline-flex items-center space-x-2">
                <span>{config.icon}</span>
                <span>{status}</span>
              </span>
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Orders Table */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        pagination={tableParams.pagination}
        onChange={pagination =>
          setTableParams({ pagination: pagination as TableParams['pagination'] })
        }
        className="border rounded-lg"
        scroll={{ x: 1200 }}
      />

      {/* Update Status Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <span>Cập nhật trạng thái đơn hàng</span>
            <span className="text-gray-400">#{selectedOrder?.orderCode}</span>
          </div>
        }
        open={modalVisible}
        onOk={handleStatusUpdate}
        onCancel={() => setModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Khách hàng</p>
              <p className="font-medium">{selectedOrder?.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Số điện thoại</p>
              <p className="font-medium">{selectedOrder?.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Địa chỉ</p>
              <p className="font-medium">{selectedOrder?.address}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 mb-2">Trạng thái mới</p>
            <Select
              value={newStatus}
              onChange={(value) => setNewStatus(value as OrderStatus)}
              className="w-full"
            >
              {Object.entries(ORDER_STATUSES).map(([status, config]) => (
                <Select.Option key={status} value={status}>
                  <span className="inline-flex items-center space-x-2">
                    <span>{config.icon}</span>
                    <span>{status}</span>
                  </span>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListOrders;
