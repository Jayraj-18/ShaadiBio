import { useTranslation } from 'react-i18next';
import { ChevronLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { useBiodataStore } from '../../store/biodataStore.js';
import { useAuthStore } from '../../store/authStore.js';
import { useNavigate } from 'react-router-dom';

const PhotoUploadForm = () => {
    const { t } = useTranslation();
    const { formData, setFormData, setActiveStep, saveBiodata, isSaving, resetForm } = useBiodataStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { photo } = formData;

    const handleSave = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const result = await saveBiodata(user.token);
        if (result) {
            resetForm();
            navigate('/dashboard');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData('photo', { url: reader.result, isCropped: false });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-white hover:border-red-500 transition-all group">
                {photo.url ? (
                    <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                        <img src={photo.url} alt="Profile" className="w-full h-full object-cover" />
                        <button
                            onClick={() => setFormData('photo', { url: '', isCropped: false })}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <p className="font-bold text-gray-700">{t('upload_portrait')}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('upload_desc')}</p>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                )}
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100 mt-8">
                <ImageIcon className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-800 leading-relaxed">
                    {t('photo_tip')}
                </p>
            </div>

            <div className="pt-6 flex justify-between">
                <button onClick={() => setActiveStep(4)} className="btn-secondary flex items-center gap-2">
                    <ChevronLeft size={18} /> {t('previous')}
                </button>
                <button
                    onClick={handleSave}
                    className="btn-primary"
                    disabled={isSaving}
                >
                    {isSaving ? t('saving...') : t('finish_download')}
                </button>
            </div>
        </div>
    );
};

export default PhotoUploadForm;
