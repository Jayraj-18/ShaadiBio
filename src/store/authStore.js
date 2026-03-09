import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, loading: false });
            return true;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Login failed', loading: false });
            return false;
        }
    },

    register: async (userData) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/auth/register', userData);
            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, loading: false });
            return true;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Registration failed', loading: false });
            return false;
        }
    },

    continueAsGuest: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/auth/guest');
            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, loading: false });
            return true;
        } catch (error) {
            set({ error: 'Failed to create guest session', loading: false });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));
