'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function OrderPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    hostEmail: '',
    hostName: '',
    phone: '',
    eventName: '',
    eventDate: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Romania',
  });

  const [qrPrintQuantity, setQrPrintQuantity] = useState(0);
  const [voiceMessageEnabled, setVoiceMessageEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const basePrice = 950;
  const qrPrintPrice = qrPrintQuantity > 0 ? qrPrintQuantity * 6 : 0;
  const voiceMessagePrice = voiceMessageEnabled ? 220 : 0;
  const totalPrice = basePrice + qrPrintPrice + voiceMessagePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          qrPrintQuantity,
          voiceMessageEnabled,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          basePrice,
          qrPrintPrice,
          voiceMessagePrice,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Redirecting to payment...');
        // Redirect to Stripe checkout
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      } else {
        toast.error('Error creating order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              📸 MemorieDigitala
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            📝 {t('Complete Your Order', 'Finalizează Comanda')}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Your Order in 2 Minutes', 'Comanda Ta în 2 Minute')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            {t('Fill out the form and select extra options', 'Completează formularul și selectează opțiuni extra')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Order Summary */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                📧 {t('Contact Information', 'Informații de Contact')}
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {t('Full Name', 'Nume Complet')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hostName}
                    onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                    placeholder={t('ex: John Smith', 'ex: Ion Popescu')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {t('Email', 'Email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.hostEmail}
                    onChange={(e) => setFormData({ ...formData, hostEmail: e.target.value })}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                    placeholder="ex: john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {t('Phone Number', 'Număr de Telefon')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                    placeholder="ex: +40 123 456 789"
                  />
                </div>
              </div>
            </div>

              {/* Address Information */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  📍 {t('Delivery Address', 'Adresă de Livrare')}
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('Street Address', 'Adresă Stradă')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                      placeholder="ex: Strada Principală 123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('City', 'Oraș')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                      placeholder="ex: București"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('Postal Code', 'Cod Poștal')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                      placeholder="ex: 123456"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('Country', 'Țară')} *
                    </label>
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Romania">Romania</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Information */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  📅 {t('Event Details', 'Detalii Eveniment')}
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('Event Name', 'Nume Eveniment')}
                    </label>
                    <input
                      type="text"
                      value={formData.eventName}
                      onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium"
                      placeholder="ex: Wedding - Anna & Alex"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {t('Event Date', 'Data Eveniment')}
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  ⚡ {t('Additional Features', 'Caracteristici Suplimentare')}
                </h2>

                {/* QR Print Cards */}
                <div className="border-2 border-gray-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900">{t('Physical QR Cards', 'Carduri QR Fizice')}</h3>
                      <p className="text-gray-700 text-sm mt-1 font-medium">
                        {t('We print and deliver QR cards. Choose quantity.', 'Tipărim și livrăm carduri QR. Alege cantitatea.')}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={qrPrintQuantity > 0}
                      onChange={(e) => setQrPrintQuantity(e.target.checked ? 50 : 0)}
                      className="ml-4 w-5 h-5"
                    />
                  </div>
                  {qrPrintQuantity > 0 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Cantitate (50-250)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="250"
                        step="50"
                        value={qrPrintQuantity}
                        onChange={(e) => setQrPrintQuantity(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-900 font-semibold">
                        <span>50</span>
                        <span className="font-bold">{qrPrintQuantity} cards</span>
                        <span>250</span>
                      </div>
                      <p className="text-sm text-gray-900 font-bold mt-2">
                        {qrPrintQuantity} × 6 RON = {(qrPrintQuantity * 6).toFixed(2)} RON
                      </p>
                    </div>
                  )}
                </div>

                {/* Voice Messages */}
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-gray-900">{t('Voice Messages Feature', 'Funcție Mesaje Vocale')}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">
                          {t('Recommended', 'Recomandat')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">
                        {t('Allow guests to leave emotional voice messages.', 'Permite invitaților să lase mesaje vocale pline de emoție.')}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={voiceMessageEnabled}
                      onChange={(e) => setVoiceMessageEnabled(e.target.checked)}
                      className="ml-4 w-5 h-5"
                    />
                  </div>
                  {voiceMessageEnabled && (
                    <p className="text-sm text-gray-600 mt-2">220 RON</p>
                  )}
                </div>
              </div>

                      {/* Info Note */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
                <p className="text-sm text-yellow-900 font-bold">
                  <strong>{t('Note:', 'Notă:')}</strong> {t('Physical products (cards) will be delivered within 5-7 business days. Please place your order at least 10 days before the event.', 'Produsele fizice (carduri) vor fi livrate în termen de 5-7 zile lucrătoare. Vă rugăm să plasați comanda cu cel puțin 10 zile înainte de eveniment.')}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? '⏳ Processing...' : '💳 Proceed to Payment →'}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 h-fit border-2 border-blue-100 sticky top-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              💰 {t('Order Summary', 'Rezumat Comandă')}
            </h2>
            <div className="space-y-4 border-b pb-6">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">{t('Digital Memory Box', 'Cutia cu Amintiri Digitale')}</span>
                <span className="font-bold text-gray-900">950 RON</span>
              </div>
              {qrPrintQuantity > 0 && (
                <div className="flex justify-between text-gray-900">
                  <span className="font-medium">QR Cards ({qrPrintQuantity})</span>
                  <span className="font-semibold">{qrPrintPrice.toFixed(2)} RON</span>
                </div>
              )}
              {voiceMessageEnabled && (
                <div className="flex justify-between text-gray-900">
                  <span className="font-medium">Voice Messages</span>
                  <span className="font-semibold">220.00 RON</span>
                </div>
              )}
            </div>
            <div className="flex justify-between text-2xl font-bold mt-6">
              <span className="text-gray-900">Total:</span>
              <span className="text-blue-600">{totalPrice.toFixed(2)} RON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

