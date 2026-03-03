import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { registerHandler, loading } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerHandler(form);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Start your journey with us</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <button className="button button--primary">
                        {loading ? <Loader /> : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </div>
            </div>
        </div>
    );
}