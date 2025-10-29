'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Event {
  id: number;
  event_id: string;
  host_name: string;
  event_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const openAdminPanel = (eventId: string) => {
    window.open(`/admin/${eventId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              📸 MemorieDigitala
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <span className="text-sm sm:text-base text-gray-900 font-bold">{t('Welcome,', 'Bun venit,')} {user?.name}</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <LanguageToggle />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors min-h-[44px] w-full sm:w-auto"
                >
                  {t('Logout', 'Deconectare')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            🎯 {t('Your Dashboard', 'Panoul Tău')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('My Events', 'Evenimentele Mele')}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium px-4">{t('Manage all your events from one place', 'Gestionează toate evenimentele într-un singur loc')}</p>
        </div>

        {/* Create New Event Button */}
        <div className="mb-6 sm:mb-8 text-center px-4">
          <Link
            href="/siparis"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[44px] w-full sm:w-auto"
          >
            ➕ {t('Create New Event', 'Creează Eveniment Nou')}
          </Link>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg p-8 sm:p-12 text-center px-4">
            <div className="text-5xl sm:text-6xl mb-6">📭</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t('No events yet', 'Niciun eveniment încă')}</h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-6 sm:mb-8 px-2">{t('Create your first event to start collecting memories!', 'Creează primul tău eveniment pentru a începe să colecționezi amintiri!')}</p>
            <Link
              href="/siparis"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[44px] w-full sm:w-auto"
            >
              {t('Create Event', 'Creează Eveniment')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 px-4">
            {events.map((event) => (
              <div
                key={event.event_id}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">
                      {event.event_name || 'Untitled Event'}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-900 font-bold mb-3">
                      {t('Host:', 'Gazdă:')} {event.host_name}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-900 font-bold">
                      <span className="whitespace-nowrap">💵 {Number(event.total_price).toFixed(2)} RON</span>
                      <span className="whitespace-nowrap">📅 {new Date(event.created_at).toLocaleDateString()}</span>
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs sm:text-sm">
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openAdminPanel(event.event_id)}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[44px] w-full sm:w-auto text-sm sm:text-base"
                  >
                    {t('Open Panel', 'Deschide Panoul')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

