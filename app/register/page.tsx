'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t('Passwords do not match', 'Parolele nu se potrivesc'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t('Password must be at least 6 characters', 'Parola trebuie să aibă cel puțin 6 caractere'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(data.error || t('Registration failed', 'Înregistrare eșuată'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(t('An error occurred. Please try again.', 'A apărut o eroare. Te rugăm să încerci din nou.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 relative">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4">
          <LanguageToggle />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 block">
            📸 MemorieDigitala
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('Create Account', 'Creează Cont')}</h1>
          <p className="text-gray-700 font-medium">{t('Start collecting memories', 'Începe să colecționezi amintiri')}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-900 px-4 py-3 rounded-xl mb-6 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              {t('Full Name', 'Nume Complet')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              {t('Email', 'Email')} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              {t('Password', 'Parolă')} *
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
              placeholder={t('At least 6 characters', 'Cel puțin 6 caractere')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              {t('Confirm Password', 'Confirmă Parola')} *
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
              placeholder={t('Re-enter password', 'Reintrodu parola')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? `⏳ ${t('Creating account...', 'Se creează contul...')}` : `🚀 ${t('Create Account', 'Creează Cont')}`}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-700 font-medium">
          <p>
            {t('Already have an account?', 'Ai deja cont?')}{' '}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              {t('Login', 'Autentificare')}
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/" className="text-gray-600 hover:underline">
              ← {t('Back to Home', 'Înapoi la Pagina Principală')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


