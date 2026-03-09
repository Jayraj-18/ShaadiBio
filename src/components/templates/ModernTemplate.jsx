import React from 'react';

const ModernTemplate = ({ data }) => {
    const { personalDetails, contactDetails, educationProfession, familyDetails, horoscope, customization, photo, privacy } = data;
    const { primaryColor } = customization;

    return (
        <div className="min-h-full flex overflow-hidden flex-1">
            {/* Sidebar */}
            <div className="w-1/3 text-white p-6 pt-10" style={{ backgroundColor: primaryColor }}>
                {photo.url && (
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl mb-8 border-2 border-white/20">
                        <img src={photo.url} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                )}

                <h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">CONTACT</h2>
                <div className="space-y-4 text-xs">
                    {!contactDetails.hideContact && (
                        <>
                            {privacy.showPhone && <div><p className="opacity-60 mb-1">Phone</p><p className="font-medium">{contactDetails.phone || '-'}</p></div>}
                            {privacy.showEmail && <div><p className="opacity-60 mb-1">Email</p><p className="font-medium break-all">{contactDetails.email || '-'}</p></div>}
                            <div><p className="opacity-60 mb-1">Address</p><p className="font-medium leading-relaxed">{contactDetails.address || '-'}</p></div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 pt-12 bg-white">
                <h1 className="text-4xl font-black mb-2 tracking-tight uppercase" style={{ color: primaryColor }}>
                    {personalDetails.fullName || 'YOUR NAME'}
                </h1>
                <div className="flex gap-4 text-xs font-bold text-gray-400 mb-10 uppercase tracking-widest">
                    <span>{personalDetails.gender}</span>
                    <span>•</span>
                    <span>{personalDetails.age} Years</span>
                    <span>•</span>
                    <span>{personalDetails.religion}</span>
                </div>

                <div className="space-y-10">
                    <ModernSection title="Professional Summary" color={primaryColor}>
                        <div className="grid grid-cols-2 gap-y-4 text-sm mt-4">
                            <Detail label="Designation" value={educationProfession.occupation} />
                            <Detail label="Company" value={educationProfession.company} />
                            <Detail label="Education" value={educationProfession.qualification} />
                            <Detail label="Location" value={educationProfession.workLocation} />
                        </div>
                    </ModernSection>

                    <ModernSection title="Family Details" color={primaryColor}>
                        <div className="grid grid-cols-2 gap-y-4 text-sm mt-4">
                            <Detail label="Father Name" value={familyDetails.fatherName} />
                            <Detail label="Father Occ." value={familyDetails.fatherOccupation} />
                            <Detail label="Mother Name" value={familyDetails.motherName} />
                            <Detail label="Mother Occ." value={familyDetails.motherOccupation} />
                        </div>
                    </ModernSection>
                </div>
            </div>
        </div>
    );
};

const ModernSection = ({ title, color, children }) => (
    <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] border-l-4 pl-3" style={{ borderColor: color, color: color }}>{title}</h3>
        {children}
    </div>
);

const Detail = ({ label, value }) => (
    <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value || '-'}</p>
    </div>
);

export default ModernTemplate;
