import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const { loginHandler, loading } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginHandler(form);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Login to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <button className="button button--primary">
                        {loading ? <Loader /> : "Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
                </div>
            </div>
        </div>
    );
}