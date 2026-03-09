import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './i18n/config';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import CreateBiodata from './pages/CreateBiodata';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';

import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateBiodata />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="py-8 bg-gray-50 border-t border-gray-100 text-center text-gray-500 text-sm">
          {t('footer_text', { year: new Date().getFullYear() })}
        </footer>
      </div>
    </Router>
  );
}

export default App;
