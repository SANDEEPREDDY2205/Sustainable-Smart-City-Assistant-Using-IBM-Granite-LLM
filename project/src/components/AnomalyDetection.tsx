import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Activity, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const AnomalyDetection: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('energy');
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const metrics = [
    { id: 'energy', label: 'Energy Consumption', unit: 'kWh', color: '#f59e0b' },
    { id: 'water', label: 'Water Usage', unit: 'L', color: '#3b82f6' },
    { id: 'traffic', label: 'Traffic Flow', unit: 'vehicles/hr', color: '#8b5cf6' },
    { id: 'air_quality', label: 'Air Quality', unit: 'AQI', color: '#10b981' },
  ];

  const generateDataWithAnomalies = (metric: string) => {
    const data = [];
    const baseValue = metric === 'energy' ? 2500 : metric === 'water' ? 1800 : metric === 'traffic' ? 3200 : 45;
    
    for (let i = 0; i < 30; i++) {
      let value = baseValue + Math.sin(i * 0.2) * 200 + (Math.random() - 0.5) * 100;
      
      // Inject anomalies
      if (i === 15 || i === 23) {
        value = value * (Math.random() > 0.5 ? 1.8 : 0.4); // Spike or drop
      }
      
      data.push({
        day: i + 1,
        value: Math.round(value),
        isAnomaly: i === 15 || i === 23,
        expected: Math.round(baseValue + Math.sin(i * 0.2) * 200)
      });
    }
    
    return data;
  };

  const [chartData, setChartData] = useState(generateDataWithAnomalies('energy'));

  useEffect(() => {
    setChartData(generateDataWithAnomalies(selectedMetric));
  }, [selectedMetric]);

  const recentAnomalies = [
    {
      id: 1,
      metric: 'Energy Consumption',
      zone: 'Sector 12',
      severity: 'high',
      value: '4,200 kWh',
      expected: '2,400 kWh',
      timestamp: '2 hours ago',
      status: 'investigating'
    },
    {
      id: 2,
      metric: 'Water Usage',
      zone: 'Downtown',
      severity: 'medium',
      value: '850 L',
      expected: '1,800 L',
      timestamp: '6 hours ago',
      status: 'resolved'
    },
    {
      id: 3,
      metric: 'Traffic Flow',
      zone: 'Highway 101',
      severity: 'high',
      value: '5,800 vehicles/hr',
      expected: '3,200 vehicles/hr',
      timestamp: '1 day ago',
      status: 'monitoring'
    }
  ];

  const runAnomalyDetection = async () => {
    setIsScanning(true);
    
    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newAnomalies = chartData
      .filter(point => point.isAnomaly)
      .map(point => ({
        day: point.day,
        value: point.value,
        expected: point.expected,
        deviation: Math.abs(((point.value - point.expected) / point.expected) * 100).toFixed(1)
      }));
    
    setAnomalies(newAnomalies);
    setIsScanning(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'investigating': return <Activity className="w-4 h-4 text-yellow-600" />;
      default: return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Anomaly Detection System</h1>
        <p className="text-slate-600">AI-powered monitoring for unusual patterns in city infrastructure</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls and Metrics */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Select Metric</h3>
            <div className="space-y-2">
              {metrics.map(metric => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedMetric === metric.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    ></div>
                    <div>
                      <p className="font-medium">{metric.label}</p>
                      <p className="text-sm opacity-80">Unit: {metric.unit}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runAnomalyDetection}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            {isScanning ? 'Scanning...' : 'Run Detection'}
          </button>

          {anomalies.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Detected Anomalies</h3>
              <div className="space-y-3">
                {anomalies.map((anomaly, index) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-red-800">Day {anomaly.day}</span>
                      <span className="text-sm text-red-600">{anomaly.deviation}% deviation</span>
                    </div>
                    <p className="text-sm text-red-700">
                      Actual: {anomaly.value} | Expected: {anomaly.expected}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chart Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                {metrics.find(m => m.id === selectedMetric)?.label} - Last 30 Days
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Anomaly</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value, name) => [
                    `${value} ${metrics.find(m => m.id === selectedMetric)?.unit}`,
                    name === 'value' ? 'Actual' : 'Expected'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={(props) => {
                    const data = chartData[props.payload?.day - 1];
                    return data?.isAnomaly ? 
                      <circle cx={props.cx} cy={props.cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} /> :
                      <circle cx={props.cx} cy={props.cy} r={3} fill="#10b981" />;
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Anomalies Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Recent Anomalies</h3>
            <div className="space-y-4">
              {recentAnomalies.map(anomaly => (
                <div key={anomaly.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(anomaly.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-800">{anomaly.metric}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{anomaly.zone} • {anomaly.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-800">{anomaly.value}</p>
                    <p className="text-sm text-slate-500">Expected: {anomaly.expected}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;