import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';
const EducationForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep } = useBiodataStore();
    const { educationProfession } = formData;

    const handleChange = (e) => {
        setFormData('educationProfession', { [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('qualification')}</label>
                    <input name="qualification" className="input-field" value={educationProfession.qualification} onChange={handleChange} placeholder="e.g. MBA, B.Tech" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('college')}</label>
                    <input name="college" className="input-field" value={educationProfession.college} onChange={handleChange} placeholder="e.g. IIT Delhi" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('occupation')}</label>
                    <input name="occupation" className="input-field" value={educationProfession.occupation} onChange={handleChange} placeholder="e.g. Software Engineer" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('company')}</label>
                    <input name="company" className="input-field" value={educationProfession.company} onChange={handleChange} placeholder="e.g. Google" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('income')}</label>
                    <input name="income" className="input-field" value={educationProfession.income} onChange={handleChange} placeholder="e.g. 15 LPA" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('work_location')}</label>
                    <input name="workLocation" className="input-field" value={educationProfession.workLocation} onChange={handleChange} placeholder="e.g. Bangalore, KA" />
                </div>
            </div>

            <div className="pt-6 flex justify-between">
                <button onClick={() => setActiveStep(1)} className="btn-secondary flex items-center gap-2">
                    <ChevronLeft size={18} /> {t('previous')}
                </button>
                <button onClick={() => setActiveStep(3)} className="btn-primary flex items-center gap-2">
                    {t('save_next')} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default EducationForm;
