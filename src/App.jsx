import { Routes, Route } from "react-router";
import Main from "./pages/Main";
import Anime from "./pages/Anime";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import Layout from './components/Layout';
import axios from "./axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotificationContainer from "./components/features/NotificationContainer";

function App() {
    const [udata, setUData] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getUserData() {
            try {
                setLoading(true);
                const res = await axios.get('/auth/get-me');
                setUData(res.data?.userData);
                setToken(res.data?.token);
                setIsAuth(!!res.data?.token && !!res.data?.userData)
                setLoading(false);
                return;
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getUserData();
    }, []);
    return (
        <AuthContext.Provider value={{
            userData: udata, token, isAuth, state: loading ? 'loading' : 'loaded'
        }}>
            <NotificationContainer>
                <Layout>
                    <Routes>
                        <Route path="*" element={<Main />} />
                        <Route path="/anime/:id" element={<Anime />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Layout>
            </NotificationContainer>
        </AuthContext.Provider>
    );
}

export default App;
