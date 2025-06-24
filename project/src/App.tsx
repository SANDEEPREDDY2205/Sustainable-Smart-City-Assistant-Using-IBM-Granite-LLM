import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CitizenFeedback from './components/CitizenFeedback';
import DocumentSummarizer from './components/DocumentSummarizer';
import EcoAdvice from './components/EcoAdvice';
import AnomalyDetection from './components/AnomalyDetection';
import KPIForecast from './components/KPIForecast';
import ChatAssistant from './components/ChatAssistant';
import PolicySearch from './components/PolicySearch';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'feedback':
        return <CitizenFeedback />;
      case 'documents':
        return <DocumentSummarizer />;
      case 'eco-advice':
        return <EcoAdvice />;
      case 'anomaly':
        return <AnomalyDetection />;
      case 'forecast':
        return <KPIForecast />;
      case 'chat':
        return <ChatAssistant />;
      case 'policy':
        return <PolicySearch />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-auto">
        {renderActiveModule()}
      </main>
    </div>
  );
}

export default App;