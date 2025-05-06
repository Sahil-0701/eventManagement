import api from '../utils/axios';

// Auth Services
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Event Services
export const getEvents = async () => {
    try {
        const response = await api.get('/events');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEventById = async (id) => {
    try {
        const response = await api.get(`/events/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/events', eventData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEvent = async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
};

// Registration Services
export const createRegistration = async (registrationData) => {
    try {
        const response = await api.post('/registrations', registrationData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserRegistrations = async () => {
    try {
        const response = await api.get('/registrations/my-registrations');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEventRegistrations = async (eventId) => {
    const response = await api.get(`/registrations/event/${eventId}`);
    return response.data;
};

export const updateRegistrationStatus = async (id, status) => {
    const response = await api.patch(`/registrations/${id}/status`, { status });
    return response.data;
};

export const updatePaymentStatus = async (id, paymentData) => {
    const response = await api.patch(`/registrations/${id}/payment`, paymentData);
    return response.data;
};

// User Services
export const updateProfile = async (profileData) => {
    try {
        const response = await api.put('/users/profile', profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const requestHostRole = async () => {
    const response = await api.post('/users/request-host');
    return response.data;
};

// Admin Services
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getAllEvents = async () => {
    const response = await api.get('/events');
    return response.data;
};

export const getAllRegistrations = async () => {
    const response = await api.get('/registrations');
    return response.data;
}; 