const BASE_URL = 'http://localhost:5001/api';

export const API_ENDPOINTS = {
    // Auth endpoints
    login: `${BASE_URL}/users/login`,
    register: `${BASE_URL}/users/register`,
    logout: `${BASE_URL}/users/logout`,
    
    // User endpoints
    getProfile: `${BASE_URL}/users/profile`,
    updateProfile: `${BASE_URL}/users/profile`,
    
    // Event endpoints
    events: `${BASE_URL}/events`,
    eventById: (id) => `${BASE_URL}/events/${id}`,
    userEvents: `${BASE_URL}/events/user`,
    hostEvents: `${BASE_URL}/events/host`,
    
    // Registration endpoints
    registrations: `${BASE_URL}/registrations`,
    userRegistrations: `${BASE_URL}/registrations/my-registrations`,
    eventRegistrations: (eventId) => `${BASE_URL}/registrations/event/${eventId}`,
    updateRegistrationStatus: (id) => `${BASE_URL}/registrations/${id}/status`,
    updatePaymentStatus: (id) => `${BASE_URL}/registrations/${id}/payment`,
    
    // Admin endpoints
    adminUsers: `${BASE_URL}/users`,
    adminEvents: `${BASE_URL}/events`,
    adminRegistrations: `${BASE_URL}/registrations`,
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}; 

export const API_ENDPOINTS = {
    // Auth endpoints
    login: `${BASE_URL}/users/login`,
    register: `${BASE_URL}/users/register`,
    logout: `${BASE_URL}/users/logout`,
    
    // User endpoints
    getProfile: `${BASE_URL}/users/profile`,
    updateProfile: `${BASE_URL}/users/profile`,
    
    // Event endpoints
    events: `${BASE_URL}/events`,
    eventById: (id) => `${BASE_URL}/events/${id}`,
    userEvents: `${BASE_URL}/events/user`,
    hostEvents: `${BASE_URL}/events/host`,
    
    // Registration endpoints
    registrations: `${BASE_URL}/registrations`,
    userRegistrations: `${BASE_URL}/registrations/my-registrations`,
    eventRegistrations: (eventId) => `${BASE_URL}/registrations/event/${eventId}`,
    updateRegistrationStatus: (id) => `${BASE_URL}/registrations/${id}/status`,
    updatePaymentStatus: (id) => `${BASE_URL}/registrations/${id}/payment`,
    
    // Admin endpoints
    adminUsers: `${BASE_URL}/users`,
    adminEvents: `${BASE_URL}/events`,
    adminRegistrations: `${BASE_URL}/registrations`,
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}; 