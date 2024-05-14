import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import ConfirmNewPassword from './pages/auth/confirm-new-password/ConfirmNewPassword';
import AlbumPage from './pages/albums/AlbumPage';
import NotFoundPage from './pages/errors/NotFoundPage';
import RoutePath from './types/enums/RoutePath';
import Layout from './pages/Root';
import Home from './pages/index/Home';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={RoutePath.ROOT}
                    element={
                        <Layout>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route
                        index
                        Component={Home}
                    />
                    <Route path={RoutePath.AUTH}>
                        <Route
                            path={RoutePath.LOGIN}
                            Component={Login}
                        />
                        <Route
                            path={RoutePath.CONFIRM_NEW_PASSWORD}
                            Component={ConfirmNewPassword}
                        />
                    </Route>
                    <Route
                        path={RoutePath.ALBUM}
                        Component={AlbumPage}
                    />
                    <Route
                        path='*'
                        Component={NotFoundPage}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
