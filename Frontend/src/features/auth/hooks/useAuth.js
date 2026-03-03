import { useContext, useEffect } from "react";
import { getMe, login, register, logout } from "../services/auth.api";
import { AuthContext } from "../AuthContext";

export default function useAuth() {

    const { setLoading, setUser, user, loading } = useContext(AuthContext);

    const getMeHandler = async () => {
        try {
            const res = await getMe();
            setUser(res.user);
        } catch (err) {
            console.log(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMeHandler();
    }, []);

    const loginHandler = async (data) => {
        setLoading(true);
        await login(data);
        await getMeHandler();
        setLoading(false);
    };

    const registerHandler = async (data) => {
        setLoading(true);
        await register(data);
        await getMeHandler();
        setLoading(false);
    };

    const logoutHandler = async () => {
        setLoading(true);
        await logout();
        setUser(null);
        setLoading(false);
    };

    return { getMeHandler, loginHandler, registerHandler, logoutHandler, user, loading };
}