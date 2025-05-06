import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/apiService';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user profile when token exists
            const fetchUserProfile = async () => {
                try {
                    const response = await getProfile();
                    if (response.success) {
                        setUser(response.data);
                        setError(null);
                    } else {
                        throw new Error(response.message || 'Failed to fetch profile');
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setError(error.message || 'Failed to fetch user profile');
                    // Only clear token and user if it's an authentication error
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post('/auth/login', credentials);
            
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return response.data;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post('/auth/register', userData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.data);
                return response.data;
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
        window.location.href = '/';
    };

    // Add token validation check
    const validateToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            return false;
        }

        try {
            const response = await getProfile();
            if (response.success) {
                setUser(response.data);
                return true;
            }
            return false;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setUser(null);
            }
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            loading, 
            error,
            login,
            register,
            logout,
            validateToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 