import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';
const PersonalDetailsForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep } = useBiodataStore();
    const { personalDetails } = formData;

    const handleChange = (e) => {
        setFormData('personalDetails', { [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('full_name')}</label>
                    <input
                        name="fullName"
                        className="input-field"
                        placeholder="e.g. Rahul Sharma"
                        value={personalDetails.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('gender')}</label>
                    <select
                        name="gender"
                        className="input-field"
                        value={personalDetails.gender}
                        onChange={handleChange}
                    >
                        <option value="">{t('gender')}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('dob')}</label>
                    <input
                        name="dob"
                        type="date"
                        className="input-field"
                        value={personalDetails.dob}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('age')}</label>
                    <input
                        className="input-field bg-gray-50 font-bold"
                        readOnly
                        value={personalDetails.age || ''}
                        placeholder="Auto-calculated"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('religion')}</label>
                    <input
                        name="religion"
                        className="input-field"
                        value={personalDetails.religion}
                        onChange={handleChange}
                        placeholder="e.g. Hindu"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('caste')}</label>
                    <input
                        name="caste"
                        className="input-field"
                        value={personalDetails.caste}
                        onChange={handleChange}
                        placeholder="e.g. Brahmin"
                    />
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    onClick={() => setActiveStep(1)}
                    className="btn-primary flex items-center gap-2"
                >
                    {t('save_next')} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
