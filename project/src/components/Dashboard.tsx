import React from 'react';
import { 
  Users, 
  Zap, 
  Droplets, 
  Car, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Thermometer
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const kpiData = [
    { name: 'Jan', energy: 2400, water: 1800, traffic: 3200, population: 45000 },
    { name: 'Feb', energy: 2100, water: 1900, traffic: 2800, population: 45200 },
    { name: 'Mar', energy: 2800, water: 2100, traffic: 3600, population: 45500 },
    { name: 'Apr', energy: 2600, water: 2000, traffic: 3100, population: 45800 },
    { name: 'May', energy: 2900, water: 2200, traffic: 3400, population: 46000 },
    { name: 'Jun', energy: 3100, water: 2400, traffic: 3800, population: 46300 },
  ];

  const sustainabilityData = [
    { name: 'Solar', value: 35, color: '#10B981' },
    { name: 'Wind', value: 25, color: '#3B82F6' },
    { name: 'Hydro', value: 20, color: '#6366F1' },
    { name: 'Fossil', value: 20, color: '#F59E0B' },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">City Health Dashboard</h1>
        <p className="text-slate-600">Real-time insights into your city's sustainability metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Population"
          value="46.3K"
          change={2.1}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Energy Usage"
          value="3.1 GWh"
          change={-5.2}
          icon={Zap}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Water Consumption"
          value="2.4M L"
          change={3.8}
          icon={Droplets}
          color="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Traffic Flow"
          value="3.8K/hr"
          change={-1.2}
          icon={Car}
          color="bg-gradient-to-br from-purple-500 to-indigo-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Resource Consumption Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px' 
                }} 
              />
              <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={3} />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="traffic" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Energy Sources Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sustainabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px' 
                }} 
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Air Quality Index</p>
              <p className="text-3xl font-bold mt-1">Good</p>
              <p className="text-emerald-100 text-sm mt-1">AQI: 42</p>
            </div>
            <Thermometer className="w-8 h-8 text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Renewable Energy</p>
              <p className="text-3xl font-bold mt-1">80%</p>
              <p className="text-blue-100 text-sm mt-1">+5% this month</p>
            </div>
            <Zap className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Green Spaces</p>
              <p className="text-3xl font-bold mt-1">67%</p>
              <p className="text-purple-100 text-sm mt-1">City coverage</p>
            </div>
            <MapPin className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;