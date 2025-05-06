import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserRegistrations, getEvents } from '../../services/apiService';
import { LayoutDashboard, Ticket, UserCircle, MessageSquare, Calendar } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [myRegistrations, setMyRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [eventsData, registrationsData] = await Promise.all([
                    getEvents(),
                    getUserRegistrations()
                ]);
                console.log('Events data:', eventsData);
                console.log('Registrations data:', registrationsData);
                setEvents(eventsData.data || []);
                setMyRegistrations(registrationsData.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError(error.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover and book amazing events
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Upcoming Events</h3>
                        <p className="text-3xl font-bold text-purple-600">{events.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-600">My Registrations</h3>
                        <p className="text-3xl font-bold text-purple-600">{myRegistrations.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Events Attended</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {myRegistrations.filter(reg => new Date(reg.event.startDate) < new Date()).length}
                        </p>
                    </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.slice(0, 3).map(event => (
                            <div key={event._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                                <p className="text-gray-600 mt-2">{event.description}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(event.startDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard; 