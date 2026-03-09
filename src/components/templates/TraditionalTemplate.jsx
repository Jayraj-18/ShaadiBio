import React from 'react';

const TraditionalTemplate = ({ data }) => {
    const { personalDetails, contactDetails, educationProfession, familyDetails, horoscope, customization, photo, privacy } = data;
    const { primaryColor = '#8B1A1A' } = customization || {};

    return (
        <div
            style={{
                fontFamily: "'Georgia', serif",
                padding: '40px 44px',
                minHeight: '100%',
                border: `12px double ${primaryColor}`,
                background: '#FFFDF9',
                position: 'relative',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            <CornerDecor color={primaryColor} />

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <p style={{
                    fontSize: '13px',
                    fontStyle: 'italic',
                    letterSpacing: '2px',
                    color: primaryColor,
                    opacity: 0.75,
                    marginBottom: '10px',
                }}>
                    ॥ Shree Ganeshay Namah ॥
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <Divider color={primaryColor} />
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: primaryColor,
                        letterSpacing: '8px',
                        textDecoration: 'underline',
                        textDecorationStyle: 'double',
                        textUnderlineOffset: '5px',
                        whiteSpace: 'nowrap',
                        margin: 0,
                    }}>
                        BIODATA
                    </h1>
                    <Divider color={primaryColor} />
                </div>
            </div>

            {/* Personal Info + Photo Row */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                    <DetailRow label="Full Name" value={personalDetails?.fullName} color={primaryColor} />
                    <DetailRow label="Date of Birth" value={personalDetails?.dob} color={primaryColor} />
                    <DetailRow label="Age" value={personalDetails?.age} color={primaryColor} />
                    <DetailRow label="Height" value={personalDetails?.height} color={primaryColor} />
                    <DetailRow label="Religion" value={personalDetails?.religion} color={primaryColor} />
                    <DetailRow label="Caste" value={personalDetails?.caste} color={primaryColor} />
                    <DetailRow label="Occupation" value={educationProfession?.occupation} color={primaryColor} />
                </div>

                {photo?.url && (
                    <div style={{
                        width: '130px',
                        flexShrink: 0,
                        border: `3px solid ${primaryColor}`,
                        padding: '5px',
                        background: '#fff',
                        boxShadow: '3px 3px 10px rgba(0,0,0,0.15)',
                        height: 'fit-content',
                    }}>
                        <img
                            src={photo.url}
                            style={{ width: '100%', height: '155px', objectFit: 'cover', display: 'block' }}
                            alt="Profile"
                        />
                    </div>
                )}
            </div>

            {/* Education & Profession */}
            <SectionTitle title="Education & Profession" color={primaryColor} />
            <div style={{ marginBottom: '20px' }}>
                <DetailRow label="Qualification" value={educationProfession?.qualification} color={primaryColor} />
                <DetailRow label="Occupation" value={educationProfession?.occupation} color={primaryColor} />
                <DetailRow label="Monthly Income" value={privacy?.showIncome ? educationProfession?.income : '* * * * *'} color={primaryColor} />
                {educationProfession?.company && (
                    <DetailRow label="Company" value={educationProfession.company} color={primaryColor} />
                )}
            </div>

            {/* Family Background */}
            <SectionTitle title="Family Background" color={primaryColor} />
            <div style={{ marginBottom: '20px' }}>
                <DetailRow label="Father's Name" value={familyDetails?.fatherName} color={primaryColor} />
                <DetailRow label="Mother's Name" value={familyDetails?.motherName} color={primaryColor} />
                <DetailRow label="Native Place" value={familyDetails?.nativePlace} color={primaryColor} />
                {familyDetails?.siblings && (
                    <DetailRow label="Siblings" value={familyDetails.siblings} color={primaryColor} />
                )}
            </div>

            {/* Horoscope */}
            {horoscope && (horoscope.rashi || horoscope.nakshatra || horoscope.gotra) && (
                <>
                    <SectionTitle title="Horoscope Details" color={primaryColor} />
                    <div style={{ marginBottom: '20px' }}>
                        {horoscope.rashi && <DetailRow label="Rashi" value={horoscope.rashi} color={primaryColor} />}
                        {horoscope.nakshatra && <DetailRow label="Nakshatra" value={horoscope.nakshatra} color={primaryColor} />}
                        {horoscope.gotra && <DetailRow label="Gotra" value={horoscope.gotra} color={primaryColor} />}
                    </div>
                </>
            )}

            {/* Contact Details */}
            {!contactDetails?.hideContact && (
                <>
                    <SectionTitle title="Contact Details" color={primaryColor} />
                    <div style={{ marginBottom: '8px' }}>
                        <DetailRow label="Phone" value={privacy?.showPhone ? contactDetails?.phone : '* * * * *'} color={primaryColor} />
                        <DetailRow label="Address" value={contactDetails?.address} color={primaryColor} />
                        {contactDetails?.email && (
                            <DetailRow label="Email" value={contactDetails.email} color={primaryColor} />
                        )}
                    </div>
                </>
            )}

            {/* Footer */}
            <div style={{
                marginTop: '28px',
                borderTop: `1px solid ${primaryColor}`,
                paddingTop: '10px',
                textAlign: 'center',
                opacity: 0.45,
                fontSize: '13px',
                color: primaryColor,
                letterSpacing: '6px',
            }}>
                ✦ ✦ ✦
            </div>
        </div>
    );
};

const SectionTitle = ({ title, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
        marginTop: '6px',
    }}>
        <div style={{ height: '1.5px', width: '10px', background: color, opacity: 0.5 }} />
        <h3 style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: color,
            whiteSpace: 'nowrap',
            margin: 0,
        }}>
            {title}
        </h3>
        <div style={{ height: '1.5px', flex: 1, background: color, opacity: 0.3 }} />
    </div>
);

const DetailRow = ({ label, value, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'baseline',
        fontSize: '14px',
        marginBottom: '7px',
        lineHeight: '1.5',
    }}>
        <span style={{
            width: '140px',
            minWidth: '140px',
            fontWeight: '600',
            color: color,
            opacity: 0.8,
        }}>
            {label}
        </span>
        <span style={{
            marginLeft: '4px',
            marginRight: '8px',
            fontWeight: '700',
            color: color,
        }}>:</span>
        <span style={{
            flex: 1,
            color: value ? '#2c2c2c' : '#bbb',
            fontStyle: value ? 'normal' : 'italic',
        }}>
            {value || '—'}
        </span>
    </div>
);

const Divider = ({ color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '36px', height: '1px', background: color, opacity: 0.4 }} />
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, opacity: 0.6 }} />
        <div style={{ width: '60px', height: '1px', background: color, opacity: 0.4 }} />
    </div>
);

const CornerDecor = ({ color }) => {
    const base = { position: 'absolute', width: '20px', height: '20px', opacity: 0.45 };
    return (
        <>
            <div style={{ ...base, top: '10px', left: '10px', borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
            <div style={{ ...base, top: '10px', right: '10px', borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
            <div style={{ ...base, bottom: '10px', left: '10px', borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
            <div style={{ ...base, bottom: '10px', right: '10px', borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
        </>
    );
};

export default TraditionalTemplate;