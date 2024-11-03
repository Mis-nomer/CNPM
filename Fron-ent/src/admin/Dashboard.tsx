import { Typography } from 'antd'
import styled from 'styled-components'

const Dashboard = () => {
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Dashboard
        </Typography.Title>
      </Breadcrumb>
      <h1>Tính năng chưa có thời gian phát triển</h1>
    </>
  )
}
const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
export default Dashboard
