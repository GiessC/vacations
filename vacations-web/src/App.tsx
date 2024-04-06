import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import ChangePassword from './pages/auth/change-password/ChangePassword';
import Login from './pages/auth/login/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/auth/login'
                        element={<Login />}
                    />
                    <Route
                        path='/auth/change-password'
                        element={<ChangePassword />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
