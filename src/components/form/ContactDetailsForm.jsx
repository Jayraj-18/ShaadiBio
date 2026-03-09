import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';
const ContactDetailsForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep } = useBiodataStore();
    const { contactDetails } = formData;

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData('contactDetails', { [e.target.name]: value });
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('phone')}</label>
                    <input
                        name="phone"
                        className="input-field"
                        value={contactDetails.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('email')}</label>
                    <input
                        name="email"
                        className="input-field"
                        value={contactDetails.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('address')}</label>
                    <textarea
                        name="address"
                        className="input-field min-h-[100px]"
                        value={contactDetails.address}
                        onChange={handleChange}
                        placeholder="Flat No, Area, City, State, PIN"
                    />
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {contactDetails.hideContact ? <EyeOff className="text-yellow-700" size={20} /> : <Eye className="text-green-700" size={20} />}
                    <div>
                        <p className="font-bold text-yellow-800 text-sm">{t('privacy_setting')}</p>
                        <p className="text-xs text-yellow-700">{t('hide_contact_msg')}</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name="hideContact"
                        className="sr-only peer"
                        checked={contactDetails.hideContact}
                        onChange={handleChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                </label>
            </div>

            <div className="pt-6 flex justify-between">
                <button onClick={() => setActiveStep(0)} className="btn-secondary flex items-center gap-2">
                    <ChevronLeft size={18} /> {t('previous')}
                </button>
                <button onClick={() => setActiveStep(2)} className="btn-primary flex items-center gap-2">
                    {t('save_next')} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default ContactDetailsForm;
