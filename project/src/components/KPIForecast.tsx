import React, { useState } from 'react';
import { Upload, TrendingUp, Calendar, BarChart3, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const KPIForecast: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState('energy');
  const [forecastPeriod, setForecastPeriod] = useState(6);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isForecasting, setIsForecasting] = useState(false);

  const kpiOptions = [
    { id: 'energy', label: 'Energy Consumption', unit: 'GWh', color: '#f59e0b' },
    { id: 'water', label: 'Water Usage', unit: 'ML', color: '#3b82f6' },
    { id: 'population', label: 'Population Growth', unit: 'K', color: '#10b981' },
    { id: 'waste', label: 'Waste Generation', unit: 'tons', color: '#8b5cf6' },
  ];

  const historicalData = {
    energy: [
      { month: 'Jan 2024', actual: 2.4, date: '2024-01' },
      { month: 'Feb 2024', actual: 2.1, date: '2024-02' },
      { month: 'Mar 2024', actual: 2.8, date: '2024-03' },
      { month: 'Apr 2024', actual: 2.6, date: '2024-04' },
      { month: 'May 2024', actual: 2.9, date: '2024-05' },
      { month: 'Jun 2024', actual: 3.1, date: '2024-06' },
      { month: 'Jul 2024', actual: 3.3, date: '2024-07' },
      { month: 'Aug 2024', actual: 3.0, date: '2024-08' },
      { month: 'Sep 2024', actual: 2.7, date: '2024-09' },
      { month: 'Oct 2024', actual: 2.5, date: '2024-10' },
      { month: 'Nov 2024', actual: 2.3, date: '2024-11' },
      { month: 'Dec 2024', actual: 2.6, date: '2024-12' },
    ],
    water: [
      { month: 'Jan 2024', actual: 1.8, date: '2024-01' },
      { month: 'Feb 2024', actual: 1.9, date: '2024-02' },
      { month: 'Mar 2024', actual: 2.1, date: '2024-03' },
      { month: 'Apr 2024', actual: 2.0, date: '2024-04' },
      { month: 'May 2024', actual: 2.2, date: '2024-05' },
      { month: 'Jun 2024', actual: 2.4, date: '2024-06' },
      { month: 'Jul 2024', actual: 2.6, date: '2024-07' },
      { month: 'Aug 2024', actual: 2.3, date: '2024-08' },
      { month: 'Sep 2024', actual: 2.1, date: '2024-09' },
      { month: 'Oct 2024', actual: 1.9, date: '2024-10' },
      { month: 'Nov 2024', actual: 1.8, date: '2024-11' },
      { month: 'Dec 2024', actual: 2.0, date: '2024-12' },
    ]
  };

  const generateForecast = async () => {
    setIsForecasting(true);
    
    // Simulate ML model processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const historical = historicalData[selectedKPI as keyof typeof historicalData] || historicalData.energy;
    const lastValue = historical[historical.length - 1].actual;
    const trend = (historical[historical.length - 1].actual - historical[0].actual) / historical.length;
    
    const forecast = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Add historical data
    historical.forEach(point => {
      forecast.push({
        ...point,
        type: 'historical',
        confidence: null
      });
    });
    
    // Generate forecast data
    for (let i = 1; i <= forecastPeriod; i++) {
      const baseValue = lastValue + (trend * i);
      const seasonality = Math.sin((i + 11) * Math.PI / 6) * 0.3; // Seasonal variation
      const noise = (Math.random() - 0.5) * 0.2;
      
      const forecastValue = Math.max(0, baseValue + seasonality + noise);
      const confidence = Math.max(60, 95 - (i * 5)); // Decreasing confidence over time
      
      forecast.push({
        month: `${months[(11 + i) % 12]} 2025`,
        actual: null,
        forecast: Number(forecastValue.toFixed(2)),
        confidence: confidence,
        type: 'forecast',
        date: `2025-${String((i % 12) + 1).padStart(2, '0')}`
      });
    }
    
    setForecastData(forecast);
    setIsForecasting(false);
  };

  const calculateGrowthRate = () => {
    if (forecastData.length === 0) return 0;
    
    const lastHistorical = forecastData.filter(d => d.type === 'historical').slice(-1)[0];
    const lastForecast = forecastData.filter(d => d.type === 'forecast').slice(-1)[0];
    
    if (!lastHistorical || !lastForecast) return 0;
    
    return (((lastForecast.forecast - lastHistorical.actual) / lastHistorical.actual) * 100);
  };

  const getInsights = () => {
    const growthRate = calculateGrowthRate();
    const currentKPI = kpiOptions.find(k => k.id === selectedKPI);
    
    if (growthRate > 10) {
      return {
        type: 'warning',
        message: `${currentKPI?.label} is projected to increase by ${growthRate.toFixed(1)}%. Consider efficiency measures.`,
        color: 'bg-orange-50 border-orange-200 text-orange-800'
      };
    } else if (growthRate < -5) {
      return {
        type: 'positive',
        message: `${currentKPI?.label} is projected to decrease by ${Math.abs(growthRate).toFixed(1)}%. Positive trend!`,
        color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
      };
    } else {
      return {
        type: 'stable',
        message: `${currentKPI?.label} is projected to remain stable with ${growthRate.toFixed(1)}% change.`,
        color: 'bg-blue-50 border-blue-200 text-blue-800'
      };
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">KPI Forecasting System</h1>
        <p className="text-slate-600">Machine learning-powered predictions for city planning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Select KPI</h3>
            <div className="space-y-2">
              {kpiOptions.map(kpi => (
                <button
                  key={kpi.id}
                  onClick={() => setSelectedKPI(kpi.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedKPI === kpi.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: kpi.color }}
                    ></div>
                    <div>
                      <p className="font-medium">{kpi.label}</p>
                      <p className="text-sm opacity-80">Unit: {kpi.unit}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Forecast Period</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Months ahead</label>
                <select
                  value={forecastPeriod}
                  onChange={(e) => setForecastPeriod(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>
              
              <button
                onClick={generateForecast}
                disabled={isForecasting}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                {isForecasting ? 'Forecasting...' : 'Generate Forecast'}
              </button>
            </div>
          </div>

          {forecastData.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Growth Rate</span>
                  <span className={`font-medium ${
                    calculateGrowthRate() > 0 ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {calculateGrowthRate() > 0 ? '+' : ''}{calculateGrowthRate().toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Confidence</span>
                  <span className="font-medium text-blue-600">
                    {forecastData.filter(d => d.type === 'forecast')[0]?.confidence || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Data Points</span>
                  <span className="font-medium text-slate-800">{forecastData.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart and Results */}
        <div className="lg:col-span-3 space-y-6">
          {forecastData.length > 0 ? (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {kpiOptions.find(k => k.id === selectedKPI)?.label} Forecast
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px' 
                      }}
                      formatter={(value, name) => [
                        `${value} ${kpiOptions.find(k => k.id === selectedKPI)?.unit}`,
                        name === 'actual' ? 'Historical' : name === 'forecast' ? 'Forecast' : name
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Insights */}
              <div className={`p-4 rounded-lg border ${getInsights().color}`}>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">AI Insight</span>
                </div>
                <p className="mt-2">{getInsights().message}</p>
              </div>

              {/* Forecast Table */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4">Detailed Forecast</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Period</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-700">Value</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-700">Confidence</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-700">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forecastData.filter(d => d.type === 'forecast').map((row, index) => (
                        <tr key={index} className="border-b border-slate-100">
                          <td className="py-3 px-4 text-slate-800">{row.month}</td>
                          <td className="py-3 px-4 text-right font-medium text-slate-800">
                            {row.forecast} {kpiOptions.find(k => k.id === selectedKPI)?.unit}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              row.confidence >= 80 ? 'bg-emerald-100 text-emerald-800' :
                              row.confidence >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {row.confidence}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-blue-600 font-medium">Forecast</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-50 p-12 rounded-xl border-2 border-dashed border-slate-200 text-center">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 text-lg mb-2">No forecast data yet</p>
              <p className="text-slate-500">Select a KPI and generate a forecast to see predictions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPIForecast;