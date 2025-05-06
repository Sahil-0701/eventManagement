import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/apiService'; // Assuming you have this API function
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user' // Default to 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        // Simple password validation check: at least 8 characters, 1 uppercase, 1 number
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long and contain 1 uppercase letter and 1 number.');
            setLoading(false);
            return;
        }

        try {
            const response = await register(formData);
            console.log('Registration response:', response);  // Add logging for debugging
            
            if (response.success) {
                localStorage.setItem('token', response.token);
                setUser(response.data);
                
                // Redirect based on role
                switch (response.data.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'host':
                        navigate('/host/dashboard');
                        break;
                    default:
                        navigate('/user/dashboard');
                }
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-[#EFEFEF] py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('/galaxy.jpg')" }}>
            <div className="flex justify-center items-center w-full min-h-screen">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-[#EC5228] text-white px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="h-12 px-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F7D58] w-full"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="h-12 px-4 rounded-lg bg-gray-200 focus:outline-none my-4 focus:ring-2 focus:ring-[#3F7D58] w-full"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="sr-only">Role</label>
                                <div className="flex space-x-4 my-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="user"
                                            checked={formData.role === 'user'}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        User
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="host"
                                            checked={formData.role === 'host'}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Host
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            checked={formData.role === 'admin'}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Admin
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-12 px-4 my-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F7D58] w-full"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[#3F7D58] text-white font-medium rounded-lg hover:bg-[#EF9651] transition duration-200"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
