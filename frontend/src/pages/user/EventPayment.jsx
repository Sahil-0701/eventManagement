import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRegistration } from '../../services/apiService';

const EventPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Actually create the registration in the backend
      await createRegistration({
        eventId: id,
        ticketType: 'General', // or any default, or let user select
        quantity: 1,
        attendees: [{ name: form.name, email: form.email }],
        paymentMethod: 'free',
      });
      // On success, redirect to MyTickets
      navigate('/user/my-tickets');
    } catch (err) {
      setError('Payment/Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Event Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Payment is $0 for now */}
        <div className="text-gray-600 mb-2">Amount: <span className="font-bold">$0</span></div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm & Get Ticket'}
        </button>
      </form>
    </div>
  );
};

export default EventPayment; 