import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Leaf, 
  AlertTriangle, 
  TrendingUp, 
  Bot,
  Search,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'dashboard', label: 'City Dashboard', icon: LayoutDashboard },
    { id: 'feedback', label: 'Citizen Feedback', icon: MessageSquare },
    { id: 'documents', label: 'Document Summarizer', icon: FileText },
    { id: 'eco-advice', label: 'Eco Advice', icon: Leaf },
    { id: 'anomaly', label: 'Anomaly Detection', icon: AlertTriangle },
    { id: 'forecast', label: 'KPI Forecast', icon: TrendingUp },
    { id: 'policy', label: 'Policy Search', icon: Search },
    { id: 'chat', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-slate-200">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800">Smart City</h1>
            <p className="text-sm text-slate-500">Assistant</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;