import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        try {
            const endpoint = state === 'Sign Up' 
                ? '/api/auth/register' 
                : '/api/auth/login';
            const payload = state === 'Sign Up' 
                ? { name, email, password } 
                : { email, password };

            const { data } = await axios.post(backendUrl + endpoint, payload);

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-blue-300">
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt="Logo" 
                className="absolute left-5 sm:left-20 top-5 w-20 sm:w-25 cursor-pointer hover:opacity-80"
            />
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>
                <p className="text-center text-sm mb-6 text-purple-300">
                    {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#384B70] hover:bg-[#2d3f5a]">
                            <img src={assets.person_icon} alt="Person Icon" />
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="bg-transparent outline-none text-white w-full"
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#384B70] hover:bg-[#2d3f5a]">
                        <img src={assets.mail_icon} alt="Mail Icon" />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="bg-transparent outline-none text-white w-full"
                            type="email"
                            placeholder="Email ID"
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#384B70] hover:bg-[#2d3f5a] relative">
                        <img src={assets.lock_icon} alt="Lock Icon" />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="bg-transparent outline-none text-white flex-grow"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 text-white hover:text-gray-300"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {state === 'Login' && (
                        <p 
                            onClick={() => navigate('/reset-password')} 
                            className="mb-4 text-indigo-500 cursor-pointer hover:text-indigo-700"
                        >
                            Forgot Password?
                        </p>
                    )}

                    <button 
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:opacity-90"
                    >
                        {state}
                    </button>
                </form>

                {state === 'Sign Up' ? (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Already have an account?{' '}
                        <span 
                            onClick={() => setState('Login')} 
                            className="text-blue-400 cursor-pointer underline hover:text-blue-600"
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Don&apos;t have an account?{' '}
                        <span 
                            onClick={() => setState('Sign Up')} 
                            className="text-blue-400 cursor-pointer underline hover:text-blue-600"
                        >
                            Sign up
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;

