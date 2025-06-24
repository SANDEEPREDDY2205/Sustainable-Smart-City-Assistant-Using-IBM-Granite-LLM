import React, { useState } from 'react';
import { Send, MapPin, Camera, AlertCircle, CheckCircle } from 'lucide-react';

const CitizenFeedback: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'water', label: 'Water & Sanitation', color: 'bg-blue-500' },
    { id: 'transport', label: 'Transportation', color: 'bg-purple-500' },
    { id: 'waste', label: 'Waste Management', color: 'bg-green-500' },
    { id: 'energy', label: 'Energy & Utilities', color: 'bg-yellow-500' },
    { id: 'safety', label: 'Public Safety', color: 'bg-red-500' },
    { id: 'environment', label: 'Environment', color: 'bg-emerald-500' },
  ];

  const recentReports = [
    { id: 1, title: 'Broken street light on Main St', category: 'energy', status: 'resolved', date: '2 days ago' },
    { id: 2, title: 'Pothole near City Hall', category: 'transport', status: 'in-progress', date: '5 days ago' },
    { id: 3, title: 'Overflowing waste bin', category: 'waste', status: 'pending', date: '1 week ago' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ title: '', category: '', description: '', location: '', priority: 'medium' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Citizen Feedback Portal</h1>
        <p className="text-slate-600">Report issues and help improve your city</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Submit New Report</h2>
          
          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-emerald-800 font-medium">Report submitted successfully!</p>
                <p className="text-emerald-600 text-sm">We'll review your report and take action soon.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Issue Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Street address or landmark"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Provide detailed information about the issue..."
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Add Photo
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Report
            </button>
          </form>
        </div>

        {/* Category Overview & Recent Reports */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <div key={category.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium text-slate-700">{category.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Reports</h3>
            <div className="space-y-4">
              {recentReports.map(report => (
                <div key={report.id} className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    report.status === 'resolved' ? 'bg-emerald-500' :
                    report.status === 'in-progress' ? 'bg-yellow-500' : 'bg-slate-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{report.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                        report.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {report.status}
                      </span>
                      <span className="text-xs text-slate-600">{report.date}</span>
                    </div>
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

export default CitizenFeedback;