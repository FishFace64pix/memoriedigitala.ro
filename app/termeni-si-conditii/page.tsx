import Link from 'next/link';

export default function TermsAndConditionsPage() {
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
        <h1 className="text-4xl font-bold mb-8">Termeni și Condiții</h1>
        <p className="text-sm text-gray-600 mb-8">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptarea Termenilor</h2>
            <p className="text-gray-700 mb-4">
              Prin accesarea și utilizarea MemorieDigitala.ro, accepti să fii legat de acești Termeni și Condiții. Dacă nu ești de acord cu acești termeni, te rugăm să nu utilizezi serviciul.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Descrierea Serviciului</h2>
            <p className="text-gray-700 mb-4">
              MemorieDigitala.ro oferă un serviciu de colectare centralizată a fotografiilor și videoclipurilor de la evenimente prin intermediul unui QR cod unic. Serviciul include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Generarea unui QR cod și link unic pentru eveniment</li>
              <li>Stocarea fotografiilor și videoclipurilor încărcate</li>
              <li>Panou de administrare pentru gestionarea conținutului</li>
              <li>Descărcare în masă a tuturor fișierelor</li>
              <li>Acces timp de 12 luni</li>
              <li>Opțional: Carduri fizice cu QR, Mesaje vocale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Politica de Folosire Acceptabilă</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Încărcări Nelimitate - Policy de Utilizare Corectă</h3>
            <p className="text-gray-700 mb-4">
              Deși oferim „încărcări nelimitate", aceasta este supusă unei politici de utilizare corectă și bună credință:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Serviciul este destinat pentru evenimente personale (nunti, botezuri, aniversări, etc.)</li>
              <li>Ne așteptăm la încărcări rezonabile pentru un eveniment (sute, nu mii de fișiere)</li>
              <li>Încărcări excessive sau automate vor fi blocate</li>
              <li>Ne rezervăm dreptul să limităm accesul dacă utilizarea este deja rezonabilă sau chiar excesivă</li>
              <li>Orice tip de abuz (spam, malware, conținut ilegal) va rezulta în blocare imediată</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Conținut Interzis</h3>
            <p className="text-gray-700 mb-4">
              Este strict interzisă încărcarea de conținut:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Încălcarea drepturilor de autor</li>
              <li>Conținut pornografic, explicit sau inadecvat</li>
              <li>Conținut care încurajează violența, ură sau discriminarea</li>
              <li>Malware, viruși sau cod rău intenționat</li>
              <li>Spam sau conținut care încălcește bunule măsuri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Proprietate Intelectuală</h2>
            <p className="text-gray-700 mb-4">
              Prin încărcarea conținutului, garantăm că:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Deții drepturile asupra conținutului sau ai permisiunea să îl încarci</li>
              <li>Conținutul nu încalcă drepturile terților</li>
              <li>Acordă MemorieDigitala.ro dreptul de a stoca, procesa și livra conținutul gazdei evenimentului</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Plăți și Facturare</h2>
            <p className="text-gray-700 mb-4">
              <strong>Prețuri:</strong> Toate prețurile sunt în RON și includ TVA. Înțelegem că prețurile pot fi modificate în viitor, dar vor fi aplicate doar pentru comenzile noi.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Plata:</strong> Toate plățile sunt procesate prin Stripe. Plata se face înainte de activarea evenimentului.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Factură:</strong> Factura fiscală va fi trimisă pe adresa de email furnizată la comandă.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Livrare Carduri Fizice:</strong> Cardurile fizice cu QR vor fi livrate în 5-7 zile lucrătoare la adresa furnizată. Este responsabilitatea ta să furnizezi o adresă completă și corectă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Drept de Retragere</h2>
            <p className="text-gray-700 mb-4">
              Conform legislației României, ai dreptul să te retragi de la comandă în termen de 14 zile de la achiziție, <strong>cu excepția serviciilor complet livrate</strong> (dacă ai descărcat deja conținutul sau ai generat QR codul și l-ai distribuit).
            </p>
            <p className="text-gray-700 mb-4">
              Pentru returnări, contactează-ne la: contact@memoriedigitala.ro
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitarea Răspunderii</h2>
            <p className="text-gray-700 mb-4">
              MemorieDigitala.ro nu este răspunzător pentru:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Pierderea conținutului din motive tehnice (însă facem backup regulat)</li>
              <li>Calitatea fotografilor sau videoclipurilor încărcate de invitați</li>
              <li>Conținutul necorespunzător încărcat de invitați</li>
              <li>Probleme de conectivitate Internet ale invitaților</li>
              <li>Din urmărirea violării GDPR sau a legilor locale de către utilizatori</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Modificări ale Serviciului</h2>
            <p className="text-gray-700 mb-4">
              Ne rezervăm dreptul de a modifica, suspenda sau încheia serviciul în orice moment. Evenimentele active vor continua să funcționeze pentru perioada cumpărată (12 luni).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Notificări și Email</h2>
            <p className="text-gray-700 mb-4">
              Prin folosirea serviciului, accepti să primești emailuri de la noi pentru:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Confirmarea comenzii</li>
              <li>Instrucțiuni de utilizare</li>
              <li>Notificări importante despre evenimentul tău</li>
              <li>Actualizări ale serviciului</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Lege Aplicabilă și Jurisdicție</h2>
            <p className="text-gray-700 mb-4">
              Acești Termeni și Condiții sunt guvernați de legea României. Orice dispută va fi soluționată de instanțele competente din România.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pentru întrebări despre acești Termeni și Condiții:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> contact@memoriedigitala.ro
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Telefon:</strong> +40 XXX XXX XXX
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


