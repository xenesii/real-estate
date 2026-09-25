import React from 'react';
import { LocaleProvider } from './context/LocaleContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DetailPage } from './pages/DetailPage';
import { PublishWizardPage } from './pages/PublishWizardPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { ComparePage } from './pages/ComparePage';
import { AgenciesPage } from './pages/AgenciesPage';
import { ValuationPage } from './pages/ValuationPage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { DiasporaPage } from './pages/DiasporaPage';
import { FinancingPage } from './pages/FinancingPage';
import { NeighborhoodsPage } from './pages/NeighborhoodsPage';
import { DevelopmentsPage } from './pages/DevelopmentsPage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { LegalContractsPage } from './pages/LegalContractsPage';
import { OpenHousesPage } from './pages/OpenHousesPage';
import { PropertyManagementPage } from './pages/PropertyManagementPage';
import { ContactPage } from './pages/ContactPage';
import { VirtualTourModal } from './components/VirtualTourModal';
import { ClosingCostsModal } from './components/ClosingCostsModal';
import { ContractBuilderModal } from './components/ContractBuilderModal';
import { AiMatchmakerModal } from './components/AiMatchmakerModal';
import { SafeTransactionTrackerModal } from './components/SafeTransactionTrackerModal';
import { TenantApplicationModal } from './components/TenantApplicationModal';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    isContractModalOpen, 
    contractModalListing, 
    closeContractBuilder,
    isMatchmakerOpen,
    closeMatchmaker,
    isTransactionTrackerOpen,
    activeTransactionId,
    closeTransactionTracker
  } = useApp();

  return (
    <div className="flex flex-col min-h-screen text-stone-900 font-sans antialiased bg-[#FBFBFA]">
      <Header />
      <main className="flex-1">
        {activeView === 'home' && <HomePage />}
        {activeView === 'search' && <SearchPage />}
        {activeView === 'detail' && <DetailPage />}
        {activeView === 'publish' && <PublishWizardPage />}
        {activeView === 'dashboard' && <DashboardPage />}
        {activeView === 'admin' && <AdminPage />}
        {activeView === 'compare' && <ComparePage />}
        {activeView === 'agencies' && <AgenciesPage />}
        {activeView === 'valuation' && <ValuationPage />}
        {activeView === 'market_insights' && <MarketInsightsPage />}
        {activeView === 'diaspora' && <DiasporaPage />}
        {activeView === 'financing' && <FinancingPage />}
        {activeView === 'neighborhoods' && <NeighborhoodsPage />}
        {activeView === 'developments' && <DevelopmentsPage />}
        {activeView === 'investments' && <InvestmentsPage />}
        {(activeView === 'legal_contracts' || activeView === 'contracts') && <LegalContractsPage />}
        {activeView === 'open_houses' && <OpenHousesPage />}
        {(activeView === 'property_management' || (activeView as string) === 'management') && <PropertyManagementPage />}
        {activeView === 'contact' && <ContactPage />}
      </main>
      <Footer />

      {/* Global Modals for Sprints 08, 09, 10 */}
      <VirtualTourModal />
      <ClosingCostsModal />
      <ContractBuilderModal />
      <AiMatchmakerModal
        isOpen={isMatchmakerOpen}
        onClose={closeMatchmaker}
      />
      <SafeTransactionTrackerModal
        isOpen={isTransactionTrackerOpen}
        onClose={closeTransactionTracker}
        transactionId={activeTransactionId || undefined}
      />
      <TenantApplicationModal />
    </div>
  );
};

export default function App() {
  return (
    <LocaleProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LocaleProvider>
  );
}
