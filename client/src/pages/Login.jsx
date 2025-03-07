import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await API.post('/login', { email, password });
            console.log(response)
            if (response.data.statusValue === 1) {
                localStorage.setItem("id", response.data.user.id);
                navigate('/hotels');
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed due to server error");
        }
    };


    const handleSignUp = async () => {
        try {
            const response = await API.post('/register', { email, password });
            if (response.data.statusValue === 1) {
                localStorage.setItem("id", response.data.user.id);
                navigate('/hotels');
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed due to server error");
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/src/assets/images.jpg')]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {isLogin ? "Log In" : "Sign Up"}
                </h1>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    onClick={isLogin ? handleLogin : handleSignUp}
                >
                    {isLogin ? "Log In" : "Sign Up"}
                </button>
                <p className="text-center text-gray-500 mt-4">
                    or,{" "}
                    <a
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
