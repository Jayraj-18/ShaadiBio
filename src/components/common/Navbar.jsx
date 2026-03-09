import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { Heart, Languages, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const toggleLanguage = () => {
        const nextLng = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(nextLng);
    };

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
            <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-800 p-2 rounded-lg"
                >
                    <Heart className="text-white fill-current" size={20} />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
                    {t('app_name')}
                </span>
            </Link>

            <div className="flex items-center gap-6">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-800 transition-colors font-medium"
                >
                    <Languages size={18} />
                    <span>{i18n.language.toUpperCase()}</span>
                </button>

                {user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-red-800 font-medium">
                            <UserIcon size={18} />
                            <span>{user.name}</span>
                        </Link>
                        <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="text-gray-500 hover:text-red-600"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-gray-600 hover:text-red-800 font-medium">
                            Login
                        </Link>
                        <Link to="/signup" className="btn-primary py-2 px-4 text-sm">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
