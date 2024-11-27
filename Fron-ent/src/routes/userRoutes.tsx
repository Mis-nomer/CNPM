import { lazy } from 'react';
import { RouteConfig } from '@/type/route';

const Home = lazy(() => import('@/client/components/Home'));
const Signin = lazy(() => import('@/client/components/auth/signin'));
const Signup = lazy(() => import('@/client/components/auth/signup'));
const Cart = lazy(() => import('@/client/components/Cart'));
const ThongTinAccount = lazy(() => import('@/client/components/thong-tin/thong-tin'));
const ProductList = lazy(() => import('@/client/components/product/ProductList'));
const ProductDetail = lazy(() => import('@/client/components/product/productDetail'));
const AddOrders = lazy(() => import('@/client/components/orders/AddOrders'));
const OrderDetail = lazy(() => import('@/admin/components/orders/OrderDetail'));

export const userRoutes: RouteConfig[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "signin",
        element: <Signin />,
    },
    {
        path: "signup",
        element: <Signup />,
    },
    {
        path: "cart",
        element: <Cart />,
    },
    {
        path: "thong-tin",
        element: <ThongTinAccount />,
    },
    {
        path: "product/:type",
        element: <ProductList />,
    },
    {
        path: "products/:id",
        element: <ProductDetail />,
    },
    {
        path: "orders",
        element: undefined,
        children: [
            {
                path: "add",
                element: <AddOrders />,
            },
            {
                path: "detail/:id",
                element: <OrderDetail />,
            },
        ],
    },
];
