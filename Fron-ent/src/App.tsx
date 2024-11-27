// src/App.tsx
import { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import PrivateRouter from './admin/PrivateRouter'
import UserLayout from './client/UserLayout'
import './index.css'
import { generateRoutes } from './routes/utils'
import { userRoutes } from './routes/userRoutes'
import { adminRoutes } from './routes/adminRoutes'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import ChatButton from './client/components/chat'

function App() {
  const lazyLoadingComponent = (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 48 }}
          spin
        />
      }
    />
  );

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout />
          }
        >
          <Route
            element={
              <Suspense fallback={lazyLoadingComponent}>
                <Outlet />
              </Suspense>
            }
          >
            {generateRoutes(userRoutes)}
          </Route>
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          <Route
            element={
              <Suspense fallback={lazyLoadingComponent}>
                <Outlet />
              </Suspense>
            }
          >
            {generateRoutes(adminRoutes)}
          </Route>
        </Route>
      </Routes>
      <ChatButton />
    </div>
  )
}

export default App
