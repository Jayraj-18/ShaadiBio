import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Plus, FileText, MoreVertical, Edit, Copy, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Dashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const [biodatas, setBiodatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (e, id) => {
        e.stopPropagation();
        if (user?.role === 'guest') {
            setShowGuestModal(true);
            return;
        }
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (user?.role === 'guest') {
            setShowGuestModal(true);
            return;
        }
        if (window.confirm(t('confirm_delete') || 'Are you sure you want to delete this biodata?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/biodata/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setBiodatas(prev => prev.filter(b => b._id !== id));
            } catch (err) {
                console.error('Error deleting biodata:', err);
            }
        }
    };

    useEffect(() => {
        if (!user) navigate('/login');
        const fetchBiodatas = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/biodata`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setBiodatas(data);
            } catch (err) {
                // console.error('Error fetching biodatas:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBiodatas();
    }, [user]);

    return (
        <>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{t('my_biodatas')}</h1>
                        <p className="text-gray-500 mt-2">{t('dashboard_desc')}</p>
                    </div>
                    <Link to="/create" className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> {t('create_new')}
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />)}
                    </div>
                ) : biodatas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {biodatas.map((bio) => (
                            <div key={bio._id} className="card group hover:shadow-2xl transition-all cursor-pointer p-0 overflow-hidden border-2 hover:border-red-800">
                                <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                                    <FileText className="text-gray-300" size={64} />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-xl text-gray-800">{bio.personalDetails.fullName}</h3>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button onClick={(e) => handleEdit(e, bio._id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Edit size={16} /></button>
                                            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Copy size={16} /></button>
                                            <button onClick={(e) => handleDelete(e, bio._id)} className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>v{bio.version}</span>
                                        <span>{new Date(bio.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <FileText className="mx-auto text-gray-300 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-gray-700">{t('no_biodatas')}</h2>
                        <p className="text-gray-500 mb-8">{t('no_biodatas_desc')}</p>
                        <Link to="/create" className="btn-secondary">{t('start_creating_btn')}</Link>
                    </div>
                )}
            </div>

            {/* Guest Access Restriction Modal */}
            {showGuestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowGuestModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Edit size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Access Denied</h3>
                        <p className="text-gray-500 text-center mb-6">
                            You don't have access to edit or delete templates as a guest user. Please create a registered account to unlock these features.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowGuestModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <Link
                                to="/signup"
                                className="flex-1 px-4 py-2 bg-red-700 text-white rounded-xl hover:bg-red-800 transition-colors font-medium text-center flex items-center justify-center"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
