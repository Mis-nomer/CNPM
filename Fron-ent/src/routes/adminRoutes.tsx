import { lazy } from 'react';
import { RouteConfig } from '@/type/route';

const Dashboard = lazy(() => import('@/admin/Dashboard'));
const ListOrders = lazy(() => import('@/admin/components/orders/ListOrders'));
const OrderDetail = lazy(() => import('@/admin/components/orders/OrderDetail'));
const AddPro = lazy(() => import('@/admin/components/product/AddPro'));
const EditPro = lazy(() => import('@/admin/components/product/EditPro'));
const ListPro = lazy(() => import('@/admin/components/product/ListPro'));
const AddUser = lazy(() => import('@/admin/components/user/AddUser'));
const EditUser = lazy(() => import('@/admin/components/user/EditUSer'));
const ListUser = lazy(() => import('@/admin/components/user/ListUser'));
const AddOrders = lazy(() => import('@/client/components/orders/AddOrders'));

export const adminRoutes: RouteConfig[] = [
    {
        path: '',
        element: <Dashboard />
    },
    {
        path: 'products',
        element: undefined,
        children: [
            {
                path: '',
                element: <ListPro />
            },
            {
                path: 'add',
                element: <AddPro />
            },
            {
                path: ':id/edit',
                element: <EditPro />
            }
        ]
    },
    {
        path: 'user',
        element: undefined,
        children: [
            {
                path: '',
                element: <ListUser />
            },
            {
                path: 'add',
                element: <AddUser />
            },
            {
                path: ':id/edit',
                element: <EditUser />
            }
        ]
    },
    {
        path: 'orders',
        element: undefined,
        children: [
            {
                path: '',
                element: <ListOrders />
            },
            {
                path: 'add',
                element: <AddOrders />
            },
            {
                path: 'detail/:id',
                element: <OrderDetail />
            }
        ]
    }
];
