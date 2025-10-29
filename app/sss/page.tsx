'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function FAQPage() {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'Cum funcționează MemorieDigitala.ro?',
          a: 'După ce plasezi comanda, primești un QR cod unic pentru evenimentul tău. Distribui QR codul invitaților, iar ei pot încărca fotografiile și videoclipurile direct, fără să instaleze aplicații sau să se înregistreze. Toate imaginile și videoclipurile sunt colectate într-un singur loc, accesibil prin panoul tău de administrare.',
        },
        {
          q: 'De ce am nevoie de MemorieDigitala.ro?',
          a: 'În loc să colecționezi manual toate fotografiile de la invitați prin email, WhatsApp sau alte aplicații, MemorieDigitala.ro oferă o soluție centralizată, elegantă și ușor de folosit. Invitații tăi nu trebuie să se înregistreze sau să instaleze aplicații - doar scanează QR codul și încarcă instant.',
        },
        {
          q: 'Cât timp am acces la evenimentul meu?',
          a: 'Ai acces timp de 12 luni de la data comenzii. Poți descărca conținutul oricând în această perioadă.',
        },
      ],
    },
    {
      category: 'Produs',
      questions: [
        {
          q: 'Există o limită pentru numărul de fotografii?',
          a: 'Nu, oferim încărcări nelimitate de fotografii și videoclipuri pentru întreaga perioadă de acces (12 luni).',
        },
        {
          q: 'Ce formate de fișiere sunt acceptate?',
          a: 'Acceptăm fotografiile în formatele: JPG, PNG, HEIC. Pentru videoclipuri: MP4, MOV, AVI. Fișierele sunt optimizate automat pentru spațiu de stocare eficient.',
        },
        {
          q: 'Pot șterge fotografii inadecvate?',
          a: 'Da! În panoul tău de administrare poți modera și șterge orice conținut încărcat.',
        },
        {
          q: 'Cum descarc toate fotografiile?',
          a: 'Poți descărca toate fotografiile și videoclipurile într-un singur fișier ZIP din panoul de administrare cu butonul "Descărcare în masă".',
        },
      ],
    },
    {
      category: 'Carduri Fizice cu QR',
      questions: [
        {
          q: 'Ce sunt cardurile fizice cu QR?',
          a: 'Cardurile fizice cu QR sunt hârtii de înaltă calitate care conțin QR codul evenimentului tău. Poți plasa aceste carduri pe mese, le poți distribui la intrare sau le poți folosi în orice alt mod consideri potrivit.',
        },
        {
          q: 'Câte carduri pot comanda?',
          a: 'Poți comanda între 50 și 250 carduri. Prețul este 6 RON per card.',
        },
        {
          q: 'Cât timp durează livrarea cardurilor?',
          a: 'Cardurile fizice sunt livrate în 5-7 zile lucrătoare. Te rugăm să plasezi comanda cu cel puțin 10 zile înainte de eveniment.',
        },
        {
          q: 'Pot comanda doar cardurile, fără pachetul digital?',
          a: 'Nu, cardurile fizice sunt un add-on la pachetul standard. Cardurile fără pachet digital nu sunt disponibile.',
        },
      ],
    },
    {
      category: 'Mesaje Vocale',
      questions: [
        {
          q: 'Cum funcționează funcția de mesaje vocale?',
          a: 'Când activezi această opțiune, invitații tăi pot lăsa mesaje vocale pline de emoție. Aceștia înregistrează mesajul direct din browser, fără să instaleze aplicații. Mesajele vocale sunt audibile în panoul tău de administrare.',
        },
        {
          q: 'Cât timp pot fi mesajele vocale?',
          a: 'Mesajele vocale pot dura până la 5 minute.',
        },
        {
          q: 'Pot descărca mesajele vocale?',
          a: 'Da, toate mesajele vocale sunt incluse în descărcarea în masă sau pot fi descărcate individual.',
        },
      ],
    },
    {
      category: 'Plata și Facturare',
      questions: [
        {
          q: 'Ce metode de plată acceptați?',
          a: 'Acceptăm plăți cu cardul bancar prin Stripe. Toate plățile sunt sigure și criptate.',
        },
        {
          q: 'Primesc factură?',
          a: 'Da, poți descărca factura fiscală din emailul de confirmare sau din panoul de administrare.',
        },
        {
          q: 'Pot anula comanda?',
          a: 'Poți anula comanda în termen de 14 zile de la achiziție conform legislației României pentru dreptul de retragere.',
        },
      ],
    },
  ];

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

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            ❓ Frequently Asked Questions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-900 font-bold px-4">
            Find answers to the most common questions about MemorieDigitala.ro
          </p>
        </div>

        {faqs.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">{category.category}</h2>
            <div className="space-y-3 sm:space-y-4">
              {category.questions.map((faq, index) => {
                const faqIndex = categoryIndex * 100 + index; // Unique index
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faqIndex ? null : faqIndex)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-all min-h-[44px]"
                    >
                      <span className="font-bold text-base sm:text-lg text-gray-900 pr-4 flex-1 text-left">{faq.q}</span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900 flex-shrink-0">{openFAQ === faqIndex ? '−' : '+'}</span>
                    </button>
                    {openFAQ === faqIndex && (
                      <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-900 font-medium leading-relaxed">{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

