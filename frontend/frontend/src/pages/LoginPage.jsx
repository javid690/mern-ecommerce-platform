import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/authSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const { data } = await axiosInstance.post(
                "/auth/login",
                formData
            );

            dispatch(loginSuccess(data));

            navigate("/pages/checkoutpage");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to continue shopping</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="auth-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="auth-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging In..."
                            : "Login"}
                    </button>

                </form>

                <div className="auth-footer">
                    Don't have an account?

                    <Link to="/pages/registerpage">
                        Register
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default LoginPage;