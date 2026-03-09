import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Palette, ShieldCheck, Quote, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// Assets
import weddingExpImg from '../assets/images/wedding_experience.png';
import aboutUsImg from '../assets/images/about_us.png';

const LandingPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { continueAsGuest } = useAuthStore();

    const handleStart = async () => {
        await continueAsGuest();
        navigate('/create');
    };

    return (
        <div className="overflow-x-hidden bg-[#FDFCF8]">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                        {t('hero_title').split('<br />')[0]} <br />
                        <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
                            {t('hero_title').split('<br />')[1] || ''}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        {t('hero_desc')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStart}
                            className="btn-primary text-lg flex items-center justify-center gap-2 group"
                        >
                            {t('start_creating')}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-secondary text-lg"
                        >
                            {t('signup_free')}
                        </button>
                    </div>
                </motion.div>

               
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    <FeatureCard
                        icon={<Palette className="text-red-700" size={32} />}
                        title={t('feature_custom_title')}
                        desc={t('feature_custom_desc')}
                    />
                    <FeatureCard
                        icon={<FileText className="text-red-700" size={32} />}
                        title={t('feature_temp_title')}
                        desc={t('feature_temp_desc')}
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-red-700" size={32} />}
                        title={t('feature_privacy_title')}
                        desc={t('feature_privacy_desc')}
                    />
                </div>
            </section>

            {/* Wedding Experience Section */}
            <section className="py-24 px-6 bg-[#FDFCF8] overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-red-800/10 rounded-3xl -rotate-2 transform -z-10" />
                        <img
                            src={weddingExpImg}
                            alt="Wedding Experience"
                            className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] lg:aspect-auto"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-sm hidden md:block"
                        >
                            <Heart className="text-red-600 mb-4" fill="currentColor" />
                            <h4 className="text-xl font-bold mb-2 text-gray-900">{t('wedding_experience_card_title')}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('wedding_experience_card_text')}
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <div className="inline-block px-4 py-2 bg-red-50 text-red-800 rounded-full text-sm font-semibold tracking-wide uppercase">
                            Experience Excellence
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {t('wedding_experience_title')}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {t('wedding_experience_desc')}
                        </p>
                        <div className="space-y-4">
                            {[
                                "Expertly Crafted Designs",
                                "Cultural Authenticity",
                                "Modern & Traditional Layouts"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="bg-green-100 p-1 rounded-full">
                                        <CheckCircle className="text-green-600" size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-800">{item}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleStart} className="btn-primary group flex items-center gap-2">
                            {t('start_creating')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('testimonials_title')}
                        </h2>
                        <div className="w-24 h-1 bg-red-800 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { text: t('testimonial_1'), author: t('testimonial_1_author'), role: "Happy Bride" },
                            { text: t('testimonial_2'), author: t('testimonial_2_author'), role: "Groom" },
                            { text: t('testimonial_3'), author: t('testimonial_3_author'), role: "Parent" },
                        ].map((tst, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-[#FDFCF8] p-10 rounded-3xl shadow-sm border border-orange-100 relative group transition-all hover:shadow-xl"
                            >
                                <Quote className="text-red-800/10 absolute top-8 left-8" size={60} />
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-500 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed text-lg">
                                    "{tst.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-800">
                                        {tst.author[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{tst.author}</p>
                                        <p className="text-sm text-gray-500">{tst.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-24 px-6 bg-[#FDFCF8]">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                            {t('about_us_title')}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('about_us_desc')}
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-3xl font-bold text-red-800 mb-1">10k+</p>
                                    <p className="text-gray-500 text-sm">Users Trusted</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-3xl font-bold text-red-800 mb-1">50+</p>
                                    <p className="text-gray-500 text-sm">Design Templates</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <img
                            src={aboutUsImg}
                            alt="About ShaadiBio"
                            className="rounded-3xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-red-50 hidden md:block">
                            <p className="text-gray-800 font-bold italic">"Making match-making beautiful."</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 text-white px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center font-bold text-white text-xl">S</div>
                        <span className="text-2xl font-bold tracking-tight">ShaadiBio</span>
                    </div>
                    <p className="text-gray-400 text-center">
                        {t('footer_text', { year: new Date().getFullYear() })}
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-red-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-red-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-red-400 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all"
    >
        <div className="mb-6 bg-red-50 w-16 h-16 flex items-center justify-center rounded-2xl">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
);

export default LandingPage;
