'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('Thank you for your message! We will contact you soon.', 'Mulțumim pentru mesaj! Vă vom contacta în curând.'));
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              📸 MemorieDigitala
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              📞 {t('Contact Us', 'Contactează-ne')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('Get in Touch', 'Ia Legătura')}</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium px-4">
              {t('Have questions or need support? We\'re here to help!', 'Ai întrebări sau ai nevoie de suport? Suntem aici pentru tine!')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('Send a Message', 'Trimite un Mesaj')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('Name', 'Nume')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium text-base"
                    placeholder={t('Your name', 'Numele tău')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('Email', 'Email')} *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('Message', 'Mesaj')} *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium text-base"
                    placeholder={t('Your message...', 'Mesajul tău...')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('Send Message', 'Trimite Mesajul')} →
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('Contact Information', 'Informații de Contact')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t('Email', 'Email')}</h3>
                    <p className="text-gray-700 font-medium">contact@memoriedigitala.ro</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                    🕐
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t('Response Time', 'Timp Răspuns')}</h3>
                    <p className="text-gray-700 font-medium">{t('Within 24 hours', 'În termen de 24 ore')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t('Support', 'Suport')}</h3>
                    <p className="text-gray-700 font-medium">{t('Available 24/7', 'Disponibil 24/7')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <p className="text-gray-700 font-medium text-sm">
                  💡 <strong>{t('Tip:', 'Sfat:')}</strong> {t('For urgent matters, include "URGENT" in your message subject.', 'Pentru chestiuni urgente, includeți "URGENT" în subiectul mesajului.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">📸 MemorieDigitala</h3>
              <p className="text-gray-400 text-sm">Collect memories effortlessly.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/siparis" className="text-gray-400 hover:text-white transition-colors">Create Order</Link></li>
                <li><Link href="/sss" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/politica-de-confidentialitate" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/termeni-si-conditii" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 text-sm">contact@memoriedigitala.ro</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MemorieDigitala.ro - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
