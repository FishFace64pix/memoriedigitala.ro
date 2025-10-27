import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MemorieDigitala.ro
          </Link>
          <nav className="flex gap-6">
            <Link href="/sss" className="text-gray-700 hover:text-blue-600">
              SSS
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politica de Confidențialitate</h1>
        <p className="text-sm text-gray-600 mb-8">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introducere</h2>
            <p className="text-gray-700 mb-4">
              MemorieDigitala.ro („noi", „firma", „serviciul") este angajat în protecția confidențialității vizitatorilor și utilizatorilor site-ului nostru. Prin utilizarea MemorieDigitala.ro, ești de acord cu practicile descrise în această Politică de Confidențialitate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Informații pe Care le Colectăm</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Informații pentru Comenzi</h3>
            <p className="text-gray-700 mb-4">
              Când plasezi o comandă, colectăm următoarele informații:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Nume complet</li>
              <li>Adresă de email</li>
              <li>Nume eveniment (opțional)</li>
              <li>Data evenimentului (opțional)</li>
              <li>Detalii de plată procesate prin Stripe</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Conținut Încărcat de Invitați</h3>
            <p className="text-gray-700 mb-4">
              Invitații tăi pot încărca:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Fotografii digitale (JPG, PNG, HEIC)</li>
              <li>Videoclipuri (MP4, MOV, AVI)</li>
              <li>Mesaje vocale (opțional, dacă ai cumpărat funcția)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Informații Tehnice</h3>
            <p className="text-gray-700 mb-4">
              Colectăm automat:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Adresa IP a invitaților (pentru securitate)</li>
              <li>Tipul browser-ului și sistemul de operare</li>
              <li>Data și ora încărcărilor</li>
              <li>Informații despre dispozitiv (utilizate pentru optimizare)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cum Folosim Informațiile</h2>
            <p className="text-gray-700 mb-4">
              Folosim informațiile colectate pentru:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Procesarea și finalizarea comenzilor tale</li>
              <li>Generarea QR codurilor și linkurilor pentru evenimente</li>
              <li>Stocarea și organizarea conținutului încărcat de invitați</li>
              <li>Trimiterea emailurilor de confirmare și notificări importante</li>
              <li>Furnizarea de suport tehnic</li>
              <li>Îmbunătățirea serviciilor și funcționalităților</li>
              <li>Protecție împotriva fraudelor și utilizării neautorizate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Stocarea Datelor</h2>
            <h3 className="text-xl font-semibold mb-3">4.1 Locație de Stocare</h3>
            <p className="text-gray-700 mb-4">
              Datele tale sunt stocate în infrastructură securizată în Uniunea Europeană, în conformitate cu GDPR.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.2 Perioada de Stocare</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Conținutul evenimentelor: 12 luni de la cumpărare</li>
              <li>Datele de contact: până la cererea ta de ștergere</li>
              <li>Datele de facturare: conform cerințelor legale (7 ani în România)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.3 Ștergerea Datelor</h3>
            <p className="text-gray-700 mb-4">
              La sfârșitul perioadei de acces sau la cererea ta, toate conținuturile și datele asociate vor fi șterse permanent din baza noastră de date și din stocarea în cloud.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Protecția Datelor</h2>
            <p className="text-gray-700 mb-4">
              Implementăm măsuri stricte de securitate pentru a proteja datele tale:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Criptare SSL/TLS pentru toate transmisiile</li>
              <li>Criptare la rest pentru conținut stocat</li>
              <li>Acces controlat și autentificare pentru serverele noastre</li>
              <li>Backup-uri regulate și securizate</li>
              <li>Monitorizare continuă pentru activități suspecte</li>
              <li>Integrare Stripe pentru procesarea plăților (niciodată nu stocăm datele cardului tău)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Împărtășirea Datelor</h2>
            <p className="text-gray-700 mb-4">
              Nu vindem, închiriem sau distribuim datele tale personale către terți pentru marketing. Putem partaja date cu:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Stripe:</strong> pentru procesarea plăților</li>
              <li><strong>Furnizori de hosting cloud:</strong> pentru stocarea fișierelor (AWS, Google Cloud)</li>
              <li><strong>Furnizori de email:</strong> pentru trimiterea notificărilor</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Toți furnizorii terți sunt verificați pentru conformitatea GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Drepturile Tale (GDPR)</h2>
            <p className="text-gray-700 mb-4">
              În conformitate cu GDPR, ai următoarele drepturi:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Dreptul de acces:</strong> Poți solicita toate datele pe care le avem despre tine</li>
              <li><strong>Dreptul de rectificare:</strong> Poți corecta date incorecte</li>
              <li><strong>Dreptul la ștergere:</strong> Poți solicita ștergerea datelor tale</li>
              <li><strong>Dreptul la limitarea procesării:</strong> Poți restricționa utilizarea datelor tale</li>
              <li><strong>Dreptul la portabilitate:</strong> Poți primi datele tale într-un format structurat</li>
              <li><strong>Dreptul de opoziție:</strong> Poți obiecta la procesarea datelor tale</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Pentru a exercita aceste drepturi, contactează-ne la: privacy@memoriedigitala.ro
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookie-uri</h2>
            <p className="text-gray-700 mb-4">
              Folosim cookie-uri esențiale pentru funcționarea site-ului (autentificare, sesiuni). Nu folosim cookie-uri pentru publicitate sau tracking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modificări la Această Politică</h2>
            <p className="text-gray-700 mb-4">
              Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate. Te vom notifica despre modificări semnificative prin email sau prin notificare pe site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pentru întrebări despre această Politică de Confidențialitate sau pentru exercitarea drepturilor tale:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> privacy@memoriedigitala.ro
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Telefon:</strong> +40 XXX XXX XXX
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Responsabil Protecția Datelor:</strong> MemorieDigitala.ro SRL
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


