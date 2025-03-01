import { RouteConfig } from '@/type/route';
import { Route } from 'react-router-dom';

export const generateRoutes = (routes: RouteConfig[], parentPath: string = ''): JSX.Element[] => {
    return routes.map((route) => {
        const path = `${parentPath}${route.path}`;

        if (route.children) {
            return (
                <Route key={path} path={route.path}>
                    {route.element}
                    {generateRoutes(route.children, `${path}/`)}
                </Route>
            );
        }

        return <Route key={path} path={route.path} element={route.element} />;
    });
};
