import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import ChangePassword from './pages/auth/change-password/ChangePassword';
import Login from './pages/auth/login/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Providers>
                <Routes>
                    <Route
                        path='/auth/login'
                        element={<Login />}
                    />
                    <Route
                        path='/auth/change-password'
                        element={<ChangePassword />}
                    />
                </Routes>
            </Providers>
        </BrowserRouter>
    );
};

export default App;
