import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react'
const Login = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.email, formData.password);
        if (success) navigate('/dashboard');
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card w-full max-w-md p-10"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome_back')}</h2>
                <p className="text-gray-500 mb-8">{t('login_desc')}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder={t('email')}
                            className="input-field pl-10"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder={t('password')}
                            className="input-field pl-10"
                            required
                            minLength="8"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? t('logging_in') : t('login')} <LogIn size={18} />
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-500">
                    {t('dont_have_account')} <Link to="/signup" className="text-red-800 font-bold hover:underline">{t('sign_up')}</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
