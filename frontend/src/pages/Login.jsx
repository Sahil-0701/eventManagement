import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(formData);
            
            if (response && response.user) {
                // Redirect based on role
                switch (response.user.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'host':
                        navigate('/host/dashboard');
                        break;
                    default:
                        navigate('/user');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-[#EFEFEF] py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('/galaxy.jpg')" }}>
            <div className="flex justify-center items-center w-full min-h-screen">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to="/register" className="font-medium text-[#EF9651] hover:text-[#EF5228]">
                                create a new account
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="bg-[#EC5228] text-white px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="h-12 px-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F7D58] w-full"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-12 px-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F7D58] w-full"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-[#EF9651] hover:text-[#EF5228]">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[#3F7D58] text-white font-medium rounded-lg hover:bg-[#EF9651] transition duration-200"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
