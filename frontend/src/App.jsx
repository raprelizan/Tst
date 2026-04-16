import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TermsModal } from './components/TermsModal';
import { translations } from './i18n/translations';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ReportStatusPage } from './pages/ReportStatusPage';
import { SubmitReportPage } from './pages/SubmitReportPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const [language, setLanguage] = useState('ar');
  const [termsAccepted, setTermsAccepted] = useState(() => localStorage.getItem('as_terms_accepted') === '1');

  const copy = useMemo(() => translations[language], [language]);

  const onAcceptTerms = () => {
    localStorage.setItem('as_terms_accepted', '1');
    setTermsAccepted(true);
  };

  return (
    <>
      <TermsModal
        open={!termsAccepted}
        onAccept={onAcceptTerms}
        title={copy.tosTitle}
        acceptLabel={copy.accept}
      />
      <Layout language={language} setLanguage={setLanguage} copy={copy}>
        <Routes>
          <Route path="/" element={<HomePage copy={copy} />} />
          <Route path="/submit" element={<SubmitReportPage copy={copy} />} />
          <Route path="/status" element={<ReportStatusPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}
