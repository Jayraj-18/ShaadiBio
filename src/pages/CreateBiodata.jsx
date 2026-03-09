import React from 'react';
import { useBiodataStore } from '../store/biodataStore';
import StepIndicator from '../components/form/StepIndicator';
import PersonalDetailsForm from '../components/form/PersonalDetailsForm';
import ContactDetailsForm from '../components/form/ContactDetailsForm';
import EducationForm from '../components/form/EducationForm';
import FamilyForm from '../components/form/FamilyForm';
import HoroscopeForm from '../components/form/HoroscopeForm';
import PhotoUploadForm from '../components/form/PhotoUploadForm';
import LivePreview from '../components/preview/LivePreview';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const CreateBiodata = () => {
    const { t } = useTranslation();
    const { activeStep } = useBiodataStore();

    const renderStep = () => {
        switch (activeStep) {
            case 0: return <PersonalDetailsForm />;
            case 1: return <ContactDetailsForm />;
            case 2: return <EducationForm />;
            case 3: return <FamilyForm />;
            case 4: return <HoroscopeForm />;
            case 5: return <PhotoUploadForm />;
            default: return <PersonalDetailsForm />;
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-10 min-h-[calc(100vh-80px)]">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* Form Section */}
                <div className="flex-1 max-w-3xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('create_biodata_title')}</h1>
                        <p className="text-gray-500">{t('step_desc', { step: activeStep + 1 })}</p>
                    </div>

                    <StepIndicator />

                    <div className="mt-8 card min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="lg:w-[450px] xl:w-[500px]">
                    <div className="sticky top-28">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{t('preview')}</h2>
                            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">
                                {t('real_time')}
                            </span>
                        </div>
                        <div className="shadow-2xl rounded-xl overflow-hidden border border-gray-200 aspect-[1/1.4] bg-white">
                            <LivePreview />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateBiodata;
