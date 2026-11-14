import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { AboutPage } from './pages/AboutPage';
import { ArchivePage } from './pages/ArchivePage';
import { HomePage } from './pages/HomePage';
import { ImpressumPage, ImageCreditsPage, PrivacyPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReportagePage } from './pages/ReportagePage';

export function AppRoutes() {
  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reportagen" element={<ArchivePage />} />
          <Route path="/reportagen/:slug" element={<ReportagePage />} />
          <Route path="/ueber-uns" element={<AboutPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<PrivacyPage />} />
          <Route path="/bildnachweis" element={<ImageCreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
