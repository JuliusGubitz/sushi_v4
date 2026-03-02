export default function DatenschutzPage() {
  return (
    <main className="flex-1 pt-24 pb-16 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-4 text-foreground">
          <h2 className="text-xl font-semibold mt-8 mb-4">Datenschutz auf einen Blick</h2>

          <h3 className="text-lg font-medium mt-6 mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben Ihnen einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website und App für POP UP SU-SHI Sushi Pop-up Tubes besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Detaillierte Informationen finden Sie in den folgenden Abschnitten dieser Erklärung.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Wer ist verantwortlich für die Datenverarbeitung?</h3>
          <p>
            Verantwortlich für die Datenverarbeitung ist die <strong>Society Outsiders GbR</strong> (POP UP SU-SHI), Gartenstraße 1, 91242 Ottensoos, Deutschland. Die GbR wird vertreten durch die vertretungsberechtigten Gesellschafter Noah Richter und Julius Gubitz. Unsere Kontaktdaten lauten: Telefon +49 176 60980118, E-Mail{" "}
            <a href="mailto:info@society-outsiders.com" className="text-accent hover:underline">info@society-outsiders.com</a>, USt-IdNr. DE332070407. Ein Datenschutzbeauftragter ist bei uns nicht bestellt.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Welche Daten verarbeiten wir?</h3>
          <p>
            Wir verarbeiten Daten aus Ihrem Kontaktformular (Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Nachricht, optional Firma und Stückzahl) sowie hochgeladene Bilder aus dem Customizer. Zusätzlich entstehen automatisch Serverlogs bei Vercel mit Ihrer IP-Adresse, dem Datum und der Uhrzeit Ihres Zugriffs, der angeforderten URL, User-Agent-Daten, Referrer und HTTP-Statuscodes.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Wofür nutzen wir Ihre Daten?</h3>
          <p>
            Wir nutzen Ihre Daten ausschließlich zur Beratung und Angebotserstellung für individuelle Sushi Pop-up Tubes, zur internen Visualisierung mit hochgeladenen Bildern als Arbeitsgrundlage, für die Kommunikation mit Ihnen sowie zur Sicherstellung des technischen Betriebs und der Sicherheit unserer Website.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Auf welcher Rechtsgrundlage basiert die Verarbeitung?</h3>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung und vorvertragliche Maßnahmen), Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung durch Checkbox) sowie Art. 6 Abs. 1 lit. f DSGVO (unsere berechtigten Interessen an IT-Sicherheit).
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Wie lange speichern wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Konkrete Fristen finden Sie in Abschnitt 3.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">An wen geben wir Ihre Daten weiter?</h3>
          <p>
            Ihre Daten werden intern nur den vertretungsberechtigten Gesellschaftern Noah Richter und Julius Gubitz zugänglich gemacht. Externe Empfänger sind ausschließlich unsere Auftragsverarbeiter Vercel (Hosting) und Resend (E-Mail-Versand).
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Welche Rechte haben Sie?</h3>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Die Einwilligung können Sie jederzeit per E-Mail an{" "}
            <a href="mailto:info@popupsu-shi.de" className="text-accent hover:underline">info@popupsu-shi.de</a> widerrufen. Bei Datenschutzverstößen können Sie sich an das Bayerische Landesamt für Datenschutzaufsicht (BayLDA) wenden.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">1. Hosting und Serverlogs</h2>
          <p>
            Wir hosten unsere Website und App bei Vercel Inc. (
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://vercel.com</a>) in der EU-Region FRA1 (Frankfurt am Main). Während Ihres Besuchs protokolliert Vercel automatisch sogenannte Server-Logs, die technische Daten enthalten: Ihre IP-Adresse, das Datum und die Uhrzeit Ihres Zugriffs, die angeforderte URL oder Datei, den HTTP-Statuscode, die übertragene Datenmenge, die Referrer-URL und technische Informationen wie Browser-Typ und Betriebssystem (User-Agent). Diese Daten dienen der Fehlerbehebung, zur Sicherstellung der Systemsicherheit und zur Optimierung unseres Angebots. Eine Auswertung zu Marketingzwecken findet nicht statt.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an der technischen Stabilität und Sicherheit der Website).
            <br />
            <strong>Speicherdauer:</strong> Serverlogs werden nach 30 Tagen automatisch gelöscht.
            <br />
            <strong>Auftragsverarbeitung:</strong> Vercel ist nach Art. 28 DSGVO unser Auftragsverarbeiter. Mit Vercel besteht ein Auftragsverarbeitungsvertrag (AVV/DPA), abrufbar unter{" "}
            <a href="https://vercel.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://vercel.com/legal/dpa</a>. Da Vercel die EU-Region FRA1 nutzt, kommt es zu keiner Datenübermittlung in Drittländer.
          </p>
          <p>
            Es werden keine Cookies gesetzt und keine externen Skripte oder Tracking-Tools verwendet. Google Fonts (Inter, Bebas Neue) werden lokal über next/font/google beim Build bereitgestellt. Lucide-Icons liegen als SVG-Komponenten im eigenen JavaScript-Bundle.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">2. Kontaktformular und Customizer</h2>
          <p>
            Wenn Sie unser Kontaktformular ausfüllen oder den Customizer nutzen, erheben wir die von Ihnen eingegebenen Daten: Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Nachricht, optional Firmenname und Stückzahl sowie hochgeladene Bilddateien. Die Verarbeitung dieser Daten dient der Bearbeitung Ihrer Anfrage, der Erstellung individueller Angebote für Sushi Pop-up Tubes und der internen Visualisierung anhand der hochgeladenen Bilder. Die Bilder dienen ausschließlich als Arbeitsgrundlage zur Verständigung über Ihre Designwünsche und werden nicht veröffentlicht, nicht für Marketingzwecke verwendet und nicht an weitere Dritte weitergegeben (außer technisch an Resend).
          </p>
          <p>
            Die Nutzung des Customizers und das Absenden des Formulars ist nur mit gesetzter Checkbox möglich („Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu“). Ohne diese Zustimmung können Sie die Funktionen nicht nutzen.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen und Vertragserfüllung) sowie Art. 6 Abs. 1 lit. a DSGVO (Ihre freiwillige Einwilligung durch Checkbox). Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft per E-Mail an{" "}
            <a href="mailto:info@popupsu-shi.de" className="text-accent hover:underline">info@popupsu-shi.de</a> widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
          </p>
          <h3 className="text-lg font-medium mt-6 mb-2">E-Mail-Versand über Resend</h3>
          <p>
            Die Formulardaten inklusive hochgeladener Bilddateien werden über den Dienstleister Resend (
            <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://resend.com</a>) an unsere Geschäfts-E-Mail-Adresse versandt. Resend löscht die dort zwischengespeicherten Daten automatisch nach etwa 3 Tagen, sobald die E-Mail erfolgreich zugestellt wurde (Free Plan).
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.
            <br />
            <strong>Auftragsverarbeitung:</strong> Resend ist unser Auftragsverarbeiter (Art. 28 DSGVO). Der Auftragsverarbeitungsvertrag (DPA) ist unter{" "}
            <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://resend.com/legal/dpa</a> einsehbar.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">3. Speicherdauer und Löschung</h2>
          <p>
            Ihre personenbezogenen Daten werden nur so lange gespeichert, wie es zur Erfüllung der Verarbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten (insbesondere aus Handels- und Steuerrecht, §§ 257 HGB, 147 AO) bestehen. Nach Ablauf dieser Fristen werden die Daten routinemäßig gelöscht.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Kontaktformular-Daten (ohne Auftrag):</strong> Bis zur vollständigen Bearbeitung Ihrer Anfrage und danach bis zu 3 Jahren (zur Abwehr von Rechtsansprüchen und Bearbeitung von Rückfragen).</li>
            <li><strong>Daten bei Auftragserteilung:</strong> Bis zu 10 Jahre (gesetzliche Aufbewahrungspflichten aus Handels- und Steuerrecht).</li>
            <li><strong>Hochgeladene Bilder:</strong> 6 Monate nach Abschluss der Anfrage (ohne Auftrag) bzw. 3 Jahre bei Auftragserteilung (sofern für die Projektabwicklung erforderlich).</li>
            <li><strong>Serverlogs:</strong> 30 Tage.</li>
            <li><strong>Resend-Daten:</strong> Automatisch ca. 3 Tage nach erfolgreichem Versand.</li>
          </ul>
          <p>
            Bei vorzeitiger Erreichung des Verarbeitungszwecks oder Widerruf Ihrer Einwilligung werden die Daten umgehend gelöscht.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">4. Internationale Datenübermittlung</h2>
          <p>
            Eine Datenübermittlung in Drittländer (außerhalb der EU/EEA) erfolgt ausschließlich an Resend in den USA. Diese Übermittlung ist durch den mit Resend geschlossenen Auftragsverarbeitungsvertrag (DPA) sowie durch Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO und ggf. das EU-US Data Privacy Framework (DPF) abgesichert. Die Details finden Sie im DPA unter{" "}
            <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://resend.com/legal/dpa</a>. Für Vercel (EU-Region FRA1) kommt es zu keiner Drittlandübermittlung.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">5. Ihre Datenschutzrechte</h2>
          <p>
            Sie haben jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO): Sie können Auskunft darüber verlangen, ob und wie wir Ihre Daten verarbeiten.</li>
            <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.</li>
            <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, soweit die Verarbeitung unrechtmäßig ist oder der Zweck entfällt.</li>
            <li><strong>Recht auf Einschränkung</strong> (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung verlangen.</li>
            <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</li>
            <li><strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO): Sie können gegen die Verarbeitung auf Basis berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) Widerspruch einlegen, sofern hierfür zwingende schutzwürdige Gründe vorliegen oder es sich um Widerspruch gegen Direktwerbung handelt.</li>
            <li><strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Sie können erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft widerrufen.</li>
          </ul>
          <p>
            <strong>Kontaktaufnahme:</strong> Bitte richten Sie Ihre Anfragen an{" "}
            <a href="mailto:info@popupsu-shi.de" className="text-accent hover:underline">info@popupsu-shi.de</a>. Wir bearbeiten Ihre Anliegen umgehend und kostenfrei.
          </p>
          <p>
            Bei Datenschutzverstößen haben Sie das <strong>Recht auf Beschwerde</strong> bei einer Aufsichtsbehörde. Zuständig ist das <strong>Bayerische Landesamt für Datenschutzaufsicht (BayLDA)</strong>, Promenade 18, 91522 Ansbach, Telefon: 0981/18009-0, E-Mail:{" "}
            <a href="mailto:poststelle@lda.bayern.de" className="text-accent hover:underline">poststelle@lda.bayern.de</a>, Internet:{" "}
            <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.lda.bayern.de</a>.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">6. SSL/TLS-Verschlüsselung</h2>
          <p>
            Die Übertragung von Daten zwischen Ihrem Browser und unserer Server erfolgt über eine sichere SSL/TLS-Verschlüsselung (erkennbar am Schloss-Symbol und „https://“ in der Adressleiste). Dies schützt Ihre Daten vor unbefugtem Zugriff während der Übertragung. Eine vollständige Absicherung gegen alle Risiken kann jedoch nicht garantiert werden.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">7. Keine Weitere Verarbeitung</h2>
          <p>
            Wir verarbeiten Ihre Daten ausschließlich zu den in dieser Erklärung genannten Zwecken. Es findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt. Eine Profiling-Maßnahme oder Direktwerbung erfolgt nicht. Ihre Daten stammen ausschließlich direkt von Ihnen (Kontaktformular, Customizer).
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">8. Aktualität und Änderungen</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei technologischen oder gesetzlichen Änderungen anzupassen. Bei wesentlichen Änderungen werden wir Sie hierüber auf unserer Website informieren. Diese Datenschutzerklärung ist gültig seit 2. März 2026.
          </p>

        </div>
      </div>
    </main>
  );
}
