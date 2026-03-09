import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://shaadi-backend-6f17.onrender.com/api' });

const initialFormState = {
    personalDetails: {
        fullName: '',
        gender: '',
        dob: '',
        age: '',
        height: '',
        religion: '',
        caste: '',
        motherTongue: '',
        maritalStatus: '',
        nationality: 'Indian'
    },
    contactDetails: {
        phone: '',
        email: '',
        address: '',
        hideContact: false
    },
    educationProfession: {
        qualification: '',
        college: '',
        occupation: '',
        company: '',
        income: '',
        workLocation: ''
    },
    familyDetails: {
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        siblings: '',
        familyType: '',
        familyStatus: '',
        nativePlace: ''
    },
    horoscope: {
        showHoroscope: false,
        rashi: '',
        nakshatra: '',
        gotra: '',
        timeOfBirth: '',
        placeOfBirth: ''
    },
    photo: {
        url: '',
        isCropped: false
    },
    customization: {
        templateId: 'traditional',
        primaryColor: '#8B0000',
        secondaryColor: '#FFD700',
        fontFamily: 'Inter'
    },
    privacy: {
        showPhone: true,
        showEmail: true,
        showIncome: true
    }
};

export const useBiodataStore = create((set, get) => ({
    formData: initialFormState,
    activeStep: 0,
    isSaving: false,
    error: null,

    setFormData: (section, data) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [section]: { ...state.formData[section], ...data }
            }
        }));

        if (section === 'personalDetails' && data.dob) {
            const birthDate = new Date(data.dob);
            const difference = Date.now() - birthDate.getTime();
            const ageDate = new Date(difference);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            set((state) => ({
                formData: {
                    ...state.formData,
                    personalDetails: { ...state.formData.personalDetails, age }
                }
            }));
        }
    },

    setActiveStep: (step) => set({ activeStep: step }),

    saveBiodata: async (token) => {
        set({ isSaving: true, error: null });
        try {
            const { data } = await api.post('/biodata', get().formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isSaving: false });
            return data;
        } catch (error) {
            console.error('Error in saveBiodata:', error.response?.data || error.message);
            set({ error: 'Failed to save biodata', isSaving: false });
        }
    },

    resetForm: () => set({ formData: initialFormState, activeStep: 0 })
}));
