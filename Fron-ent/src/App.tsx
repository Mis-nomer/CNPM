import { Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ListOrders from './admin/components/orders/ListOrders'
import OrderDetail from './admin/components/orders/OrderDetail'
import AddPro from './admin/components/product/AddPro'
import EditPro from './admin/components/product/EditPro'
import ListPro from './admin/components/product/ListPro'
import AddUser from './admin/components/user/AddUser'
import EditUSer from './admin/components/user/EditUSer'
import ListUser from './admin/components/user/ListUser'
import PrivateRouter from './admin/PrivateRouter'
import Signin from './client/components/auth/signin'
import Signup from './client/components/auth/signup'
import Cart from './client/components/Cart'
import Home from './client/components/Home'
import AddOrders from './client/components/orders/AddOrders'
import ProductDetail from './client/components/product/productDetail'
import ProductList from './client/components/product/ProductList'
import ThongTinAccount from './client/components/thong-tin/thong-tin'
import UserLayout from './client/UserLayout'
import './index.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='cart' element={<Cart />} />
          <Route path='orders'>
            <Route path='add' element={<AddOrders />} />
            <Route path='detail/:id' element={<OrderDetail />} />
          </Route>
          <Route path='thong-tin' element={<ThongTinAccount />} />

          <Route path='product/:type' element={<ProductList />} />
          <Route path='products/:id' element={<ProductDetail />} />
        </Route>

        <Route
          path='/admin'
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='products'>
            <Route index element={<ListPro />} />
            <Route path='add' element={<AddPro />} />
            <Route path=':id/edit' element={<EditPro />} />
          </Route>
          <Route path='user'>
            <Route index element={<ListUser />} />
            <Route path='add' element={<AddUser />} />
            <Route path=':id/edit' element={<EditUSer />} />
          </Route>
          <Route path='orders'>
            <Route index element={<ListOrders />} />
            <Route path='add' element={<AddOrders />} />
            <Route path='detail/:id' element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
