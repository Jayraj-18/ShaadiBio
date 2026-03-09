import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';
const HoroscopeForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep } = useBiodataStore();
    const { horoscope } = formData;

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData('horoscope', { [e.target.name]: value });
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Moon className="text-purple-700" size={20} />
                    <div>
                        <p className="font-bold text-purple-800 text-sm">{t('add_horoscope_title')}</p>
                        <p className="text-xs text-purple-700">{t('add_horoscope_desc')}</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name="showHoroscope"
                        className="sr-only peer"
                        checked={horoscope.showHoroscope}
                        onChange={handleChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
            </div>

            {horoscope.showHoroscope && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('rashi')}</label>
                        <input name="rashi" className="input-field" value={horoscope.rashi} onChange={handleChange} placeholder="e.g. Leo" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('nakshatra')}</label>
                        <input name="nakshatra" className="input-field" value={horoscope.nakshatra} onChange={handleChange} placeholder="e.g. Ashwini" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('gotra')}</label>
                        <input name="gotra" className="input-field" value={horoscope.gotra} onChange={handleChange} placeholder="e.g. Kashyap" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('time_of_birth')}</label>
                        <input name="timeOfBirth" type="time" className="input-field" value={horoscope.timeOfBirth} onChange={handleChange} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('place_of_birth')}</label>
                        <input name="placeOfBirth" className="input-field" value={horoscope.placeOfBirth} onChange={handleChange} placeholder="City, State" />
                    </div>
                </div>
            )}

            <div className="pt-6 flex justify-between">
                <button onClick={() => setActiveStep(3)} className="btn-secondary flex items-center gap-2">
                    <ChevronLeft size={18} /> {t('previous')}
                </button>
                <button onClick={() => setActiveStep(5)} className="btn-primary flex items-center gap-2">
                    {t('save_next')} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default HoroscopeForm;
