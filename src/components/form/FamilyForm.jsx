import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';

const FamilyForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep } = useBiodataStore();
    const { familyDetails } = formData;

    const handleChange = (e) => {
        setFormData('familyDetails', { [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('father_name')}</label>
                    <input name="fatherName" className="input-field" value={familyDetails.fatherName} onChange={handleChange} placeholder="Mr. Sharma" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('father_occupation')}</label>
                    <input name="fatherOccupation" className="input-field" value={familyDetails.fatherOccupation} onChange={handleChange} placeholder="Retired Principal" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('mother_name')}</label>
                    <input name="motherName" className="input-field" value={familyDetails.motherName} onChange={handleChange} placeholder="Mrs. Sharma" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('mother_occupation')}</label>
                    <input name="motherOccupation" className="input-field" value={familyDetails.motherOccupation} onChange={handleChange} placeholder="Home Maker" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('siblings')}</label>
                    <input name="siblings" className="input-field" value={familyDetails.siblings} onChange={handleChange} placeholder="1 Brother (Married)" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('family_type')}</label>
                    <select name="familyType" className="input-field" value={familyDetails.familyType} onChange={handleChange}>
                        <option value="">{t('select_type')}</option>
                        <option value="Nuclear">{t('nuclear')}</option>
                        <option value="Joint">{t('joint')}</option>
                    </select>
                </div>
            </div>

            <div className="pt-6 flex justify-between">
                <button onClick={() => setActiveStep(2)} className="btn-secondary flex items-center gap-2">
                    <ChevronLeft size={18} /> {t('previous')}
                </button>
                <button onClick={() => setActiveStep(4)} className="btn-primary flex items-center gap-2">
                    {t('save_next')} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default FamilyForm;
