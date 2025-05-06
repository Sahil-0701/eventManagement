import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getEventById, createRegistration } from '../../services/apiService';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [registrationData, setRegistrationData] = useState({
        ticketType: '',
        quantity: 1
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getEventById(id);
                if (response.success) {
                    setEvent(response.data);
                } else {
                    setError(response.message || 'Failed to fetch event details');
                }
            } catch (err) {
                setError('An error occurred while fetching event details');
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await createRegistration({
                event: id,
                ticketType: registrationData.ticketType,
                quantity: registrationData.quantity
            });

            if (response.success) {
                navigate('/user-my-tickets');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
            console.error('Registration error:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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

    if (!event) {
        return (
            <div className="text-center p-4">
                Event not found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={event.images[0] || 'https://via.placeholder.com/800x400'}
                    alt={event.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            <div className="space-y-2">
                                <p><span className="font-medium">Date:</span> {new Date(event.startDate).toLocaleDateString()}</p>
                                <p><span className="font-medium">Time:</span> {new Date(event.startDate).toLocaleTimeString()}</p>
                                <p><span className="font-medium">Location:</span> {event.venue.name}</p>
                                <p><span className="font-medium">Address:</span> {event.venue.address}</p>
                                <p><span className="font-medium">Category:</span> {event.category}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Registration</h2>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                                    <select
                                        value={registrationData.ticketType}
                                        onChange={(e) => setRegistrationData({ ...registrationData, ticketType: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select a ticket type</option>
                                        {event.ticketTypes.map((type, index) => (
                                            <option key={index} value={type.name}>
                                                {type.name} - ${type.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={event.capacity}
                                        value={registrationData.quantity}
                                        onChange={(e) => setRegistrationData({ ...registrationData, quantity: parseInt(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;