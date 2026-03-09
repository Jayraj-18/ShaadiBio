import React from 'react';

const PremiumTemplate = ({ data }) => {
    const { personalDetails, contactDetails, educationProfession, familyDetails, horoscope, customization, photo, privacy } = data;
    const { primaryColor } = customization;

    return (
        <div className="min-h-full bg-[#FAFAFA] text-center p-12 flex flex-col items-center flex-1">
            <div className="mb-8 p-4 border-2 rounded-full inline-block" style={{ borderColor: primaryColor }}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-xl">
                    <img src={photo.url || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" alt="Profile" />
                </div>
            </div>

            <h1 className="text-4xl font-serif italic mb-2" style={{ color: primaryColor }}>
                {personalDetails.fullName}
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] font-light text-gray-500 mb-10">Marriage BioData</p>

            <div className="w-full max-w-md space-y-12">
                <section>
                    <PremiumTitle title="Personal Profile" color={primaryColor} />
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <PDetail label="Born" value={personalDetails.dob} />
                        <PDetail label="Status" value={personalDetails.maritalStatus} />
                        <PDetail label="Height" value={personalDetails.height} />
                        <PDetail label="Religion" value={personalDetails.religion} />
                    </div>
                </section>

                <section>
                    <PremiumTitle title="Life & Work" color={primaryColor} />
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-800">{educationProfession.occupation}</p>
                        <p className="text-gray-500">{educationProfession.qualification} @ {educationProfession.college}</p>
                    </div>
                </section>

                <section>
                    <PremiumTitle title="The Family" color={primaryColor} />
                    <div className="italic text-gray-600 space-y-1">
                        <p>Child of {familyDetails.fatherName} & {familyDetails.motherName}</p>
                        <p>Residing in {familyDetails.nativePlace}</p>
                    </div>
                </section>
            </div>

            <div className="mt-auto pt-10 text-[10px] uppercase tracking-widest text-gray-400">
                Confidential BioData
            </div>
        </div>
    );
};

const PremiumTitle = ({ title, color }) => (
    <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-1 bg-gray-200" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color }}>{title}</h3>
        <div className="h-[1px] flex-1 bg-gray-200" />
    </div>
);

const PDetail = ({ label, value }) => (
    <div>
        <p className="text-[10px] text-gray-400 uppercase mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || '-'}</p>
    </div>
);

export default PremiumTemplate;
