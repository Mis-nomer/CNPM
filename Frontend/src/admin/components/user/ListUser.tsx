import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, message, Typography, Tag, Badge, Avatar } from 'antd';
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { listUser, deleteUser } from '../../../api/user';
import { UserType } from '../../../type/user';

interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await listUser();
      setUsers(data?.data || []);
      setTableParams(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data?.data?.length || 0,
        },
      }));
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa người dùng',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteUser(id);
          message.success('Xóa người dùng thành công');
          fetchUsers();
        } catch (error) {
          message.error('Không thể xóa người dùng');
        }
      },
    });
  };

  const columns: ColumnsType<UserType> = [
    {
      title: '#',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      render: (_, __, index) => (
        <span className="text-gray-500">
          {(tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1}
        </span>
      ),
    },
    {
      title: 'Thông tin người dùng',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="bg-blue-100 text-blue-600"
          />
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Liên hệ',
      dataIndex: 'contact',
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center text-gray-500">
            <MailOutlined className="mr-2" />
            {record.email}
          </div>
          {record.phone && (
            <div className="flex items-center text-gray-500">
              <PhoneOutlined className="mr-2" />
              {record.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      width: 120,
      render: (roleId) => (
        <Tag color={roleId === 2 ? 'blue' : 'green'}>
          {roleId === 2 ? 'Nhân viên' : 'Khách hàng'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isEnabled',
      width: 120,
      align: 'center',
      render: (status) => (
        <Badge
          status={status === 1 ? 'success' : 'error'}
          text={
            <span className={status === 1 ? 'text-green-600' : 'text-red-600'}>
              {status === 1 ? 'Hoạt động' : 'Đã khóa'}
            </span>
          }
        />
      ),
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-2">
          <Link to={`${record.id}/edit`}>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <EditOutlined />
            </button>
          </Link >
        </div >
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <Typography.Title level={2} className="!mb-0">
            Danh sách người dùng
          </Typography.Title>
          <p className="text-gray-500 mt-1">
            Quản lý thông tin và trạng thái người dùng
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            type="primary"
            href="/admin/user/add"
            className="bg-green-600 hover:bg-green-700"
          >
            Thêm thành viên
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={tableParams.pagination}
          onChange={(pagination) => setTableParams({ pagination: pagination as TableParams['pagination'] })}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default UserList;
