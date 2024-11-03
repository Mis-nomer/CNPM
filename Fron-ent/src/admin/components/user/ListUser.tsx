import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Image, message, Modal, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deleteUser, listUser } from '../../../api/user'
import { UserType } from '../../../type/user'

const ListUser = () => {
  const [user, setUser] = useState<UserType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    setPageSize(pageSize || 5)
  }
  const data = user?.map((item, index) => {
    return {
      key: index + 1,
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      password: item.password,
      phone: item.phone,
      address: item.address,
      roleId: item.roleId,
      birthday: item.birthday,
      createdAt: item.createdAt,
      updateAt: item.updateAt,
      isEnabled: item.isEnabled
    }
  })
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, data?.length)
  const currentData = data?.slice(startIndex, endIndex)

  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p style={{ width: '200px' }}>{text}</p>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Chức vụ',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (text) => <p style={{ width: '200px' }}>{text == 2 ? 'Nhân viên' : 'Khách hàng'}</p>
    },
    {
      title: 'Trạng thái tài khảon',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (text) => <p style={{ width: '200px' }}>{text == 1 ? 'Hoạt động' : 'Khóa'}</p>
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: UserType) => (
        <Space size='middle'>
          <Link to={`${record.id}/edit`}>
            <button style={{ border: '0px', fontSize: '20px' }} onClick={() => console.log(`${record.id}`)}>
              {' '}
              <EditOutlined />
            </button>
          </Link>
        </Space>
      )
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await listUser()
        setUser(data?.data)
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
        const { data } = await deleteUser(id)
        if (data) {
          setUser(user.filter((item) => item.id !== id))
        }
        message.success('Xóa thành công')
      }
    })
  }
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Danh sách tài khoản
        </Typography.Title>
        {/* <Link to='/admin/user/add'>
          <Button type='dashed' shape='circle' icon={<PlusOutlined />} />
        </Link> */}
      </Breadcrumb>
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

export default ListUser
