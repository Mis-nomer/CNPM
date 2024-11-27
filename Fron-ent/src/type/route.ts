import { ReactNode } from 'react';

export interface BaseRouteConfig {
    path: string;
    element: ReactNode;
}

export interface RouteConfig extends BaseRouteConfig {
    children?: Omit<BaseRouteConfig, 'children'>[];
}
