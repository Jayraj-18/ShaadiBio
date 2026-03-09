import React from 'react';
import { useBiodataStore } from '../../store/biodataStore';
import { Check } from 'lucide-react';

const steps = [
    'Personal', 'Contact', 'Education', 'Family', 'Horoscope', 'Photo'
];

const StepIndicator = () => {
    const { activeStep } = useBiodataStore();

    return (
        <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
            <div
                className="absolute top-1/2 left-0 h-0.5 bg-red-800 -z-10 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;

                return (
                    <div key={step} className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isActive ? 'bg-red-800 border-red-800 text-white shadow-lg scale-110' :
                                    isCompleted ? 'bg-white border-red-800 text-red-800' : 'bg-white border-gray-300 text-gray-400'}`}
                        >
                            {isCompleted ? <Check size={20} /> : index + 1}
                        </div>
                        <span
                            className={`mt-2 text-xs font-semibold hidden md:block transition-colors duration-300
                ${isActive ? 'text-red-800' : 'text-gray-400'}`}
                        >
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;
