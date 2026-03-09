import React, { useState } from 'react';
import { useBiodataStore } from '../../store/biodataStore';
import TraditionalTemplate from '../templates/TraditionalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import PremiumTemplate from '../templates/PremiumTemplate';
import { Palette, Layout as LayoutIcon, Download, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

const LivePreview = () => {
    const { formData, setFormData, saveBiodata } = useBiodataStore();
    const { user } = useAuthStore();
    const { customization } = formData;
    const [activeTab, setActiveTab] = useState('template');
    const [isDownloading, setIsDownloading] = useState(false);
    const templateRef = React.useRef();

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const htmlContent = `
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
            <style>
              body { font-family: '${customization.fontFamily}', sans-serif; margin: 0; padding: 0; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div style="width: 210mm; min-height: 297mm;">
              ${templateRef.current.innerHTML}
            </div>
          </body>
        </html>
      `;

            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/biodata/download-direct`,
                { htmlContent, isWatermarked: user?.role === 'guest' },
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.personalDetails.fullName || 'biodata'}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Download failed', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            alert('Please Login or Signup to save your BioData.');
            return;
        }
        await saveBiodata(user.token);
        alert('BioData saved successfully!');
    };

    const renderTemplate = () => {
        switch (customization.templateId) {
            case 'traditional': return <TraditionalTemplate data={formData} />;
            case 'modern': return <ModernTemplate data={formData} />;
            case 'premium': return <PremiumTemplate data={formData} />;
            default: return <TraditionalTemplate data={formData} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Customization Toolbar */}
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('template')}
                        className={`p-2 rounded-lg transition-colors ${activeTab === 'template' ? 'bg-red-50 text-red-800' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Switch Template"
                    >
                        <LayoutIcon size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTab('style')}
                        className={`p-2 rounded-lg transition-colors ${activeTab === 'style' ? 'bg-red-50 text-red-800' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Custom Styles"
                    >
                        <Palette size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all border border-gray-200"
                    >
                        <Save size={16} /> SAVE
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-all shadow-sm"
                    >
                        <Download size={16} /> {isDownloading ? '...' : 'DOWNLOAD'}
                    </button>
                </div>
            </div>

            {/* Settings Sub-toolbar */}
            <div className="bg-white border-b border-gray-100 px-4 py-3">
                {activeTab === 'template' ? (
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {['traditional', 'modern', 'premium'].map(t => (
                            <button
                                key={t}
                                onClick={() => setFormData('customization', { templateId: t })}
                                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border transition-all
                  ${customization.templateId === t ? 'bg-red-800 border-red-800 text-white' : 'border-gray-300 text-gray-600'}`}
                            >
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Primary</span>
                            <input
                                type="color"
                                value={customization.primaryColor}
                                onChange={(e) => setFormData('customization', { primaryColor: e.target.value })}
                                className="w-6 h-6 rounded cursor-pointer overflow-hidden border-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Font</span>
                            <select
                                value={customization.fontFamily}
                                onChange={(e) => setFormData('customization', { fontFamily: e.target.value })}
                                className="text-xs font-bold bg-transparent outline-none border-b border-gray-200"
                            >
                                <option value="Inter">Inter</option>
                                <option value="Merriweather">Merriweather</option>

                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Template Viewport (Scaled) */}
            <div className="flex-1 overflow-auto p-8 flex justify-center bg-gray-200 no-scrollbar">
                <div className="relative" style={{ width: '794px', height: '1123px' }}>
                    <div
                        ref={templateRef}
                        className="bg-white shadow-2xl origin-top transition-all duration-300 absolute top-0 left-0"
                        style={{
                            width: '794px',
                            minHeight: '1123px',
                            fontFamily: customization.fontFamily,
                            transform: 'scale(var(--preview-scale, 1))',
                            transformOrigin: 'top left'
                        }}
                    >
                        {renderTemplate()}
                    </div>
                </div>
            </div>

            <style>{`
                :root {
                    --preview-scale: 0.5;
                }
                @media (min-width: 1024px) {
                    :root {
                        --preview-scale: 0.5;
                    }
                }
                @media (min-width: 1280px) {
                    :root {
                        --preview-scale: 0.6;
                    }
                }
                @media (min-width: 1536px) {
                    :root {
                        --preview-scale: 0.7;
                    }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default LivePreview;
