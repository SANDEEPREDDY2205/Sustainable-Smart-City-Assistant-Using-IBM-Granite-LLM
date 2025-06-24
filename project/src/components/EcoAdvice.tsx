import React, { useState } from 'react';
import { Search, Leaf, Lightbulb, Sparkles, Recycle } from 'lucide-react';

const EcoAdvice: React.FC = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'energy', label: 'Energy Saving', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'water', label: 'Water Conservation', icon: '💧', color: 'bg-blue-100 text-blue-800' },
    { id: 'waste', label: 'Waste Reduction', icon: '♻️', color: 'bg-green-100 text-green-800' },
    { id: 'transport', label: 'Green Transport', icon: '🚲', color: 'bg-purple-100 text-purple-800' },
    { id: 'food', label: 'Sustainable Food', icon: '🌱', color: 'bg-emerald-100 text-emerald-800' },
  ];

  const sampleTips = {
    energy: [
      "Switch to LED bulbs to reduce energy consumption by up to 80%",
      "Use smart thermostats to optimize heating and cooling automatically",
      "Install solar panels or consider community solar programs",
      "Unplug electronics when not in use to prevent phantom energy draw"
    ],
    water: [
      "Install low-flow showerheads and faucet aerators",
      "Collect rainwater for garden irrigation",
      "Fix leaks promptly - a dripping faucet can waste over 3,000 gallons per year",
      "Use native plants in landscaping to reduce watering needs"
    ],
    waste: [
      "Start composting organic waste to reduce landfill contribution",
      "Choose reusable bags, bottles, and containers",
      "Buy products with minimal packaging",
      "Donate or sell items instead of throwing them away"
    ],
    transport: [
      "Use public transportation, bike, or walk for short trips",
      "Consider carpooling or ride-sharing for longer journeys",
      "Maintain your vehicle properly for better fuel efficiency",
      "Work from home when possible to reduce commuting"
    ],
    food: [
      "Buy local and seasonal produce to reduce transportation emissions",
      "Reduce meat consumption or try plant-based alternatives",
      "Grow your own herbs and vegetables",
      "Plan meals to reduce food waste"
    ]
  };

  const generateAdvice = async (searchQuery: string, category?: string) => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const relevantCategory = category || 
      (searchQuery.toLowerCase().includes('energy') ? 'energy' :
       searchQuery.toLowerCase().includes('water') ? 'water' :
       searchQuery.toLowerCase().includes('waste') ? 'waste' :
       searchQuery.toLowerCase().includes('transport') ? 'transport' :
       searchQuery.toLowerCase().includes('food') ? 'food' : 'energy');
    
    const tips = sampleTips[relevantCategory as keyof typeof sampleTips] || sampleTips.energy;
    
    const newAdvice = {
      id: Date.now(),
      query: searchQuery || `${relevantCategory} tips`,
      category: relevantCategory,
      tips: tips.slice(0, 3),
      impact: {
        co2Reduction: Math.floor(Math.random() * 500) + 100,
        moneySaved: Math.floor(Math.random() * 200) + 50,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)]
      }
    };
    
    setAdvice(prev => [newAdvice, ...prev]);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      generateAdvice(query);
      setQuery('');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    generateAdvice('', categoryId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Eco Advice Generator</h1>
        <p className="text-slate-600">Get personalized sustainability tips powered by AI</p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for eco-friendly tips... (e.g., 'how to reduce plastic waste')"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Get Tips'}
          </button>
        </form>
      </div>

      {/* Category Quick Access */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Quick Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${category.color} hover:opacity-80 transition-opacity`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advice Results */}
      <div className="space-y-6">
        {advice.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">{item.query}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                categories.find(c => c.id === item.category)?.color || 'bg-slate-100 text-slate-800'
              }`}>
                {categories.find(c => c.id === item.category)?.label || 'General'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">CO₂ Reduction</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{item.impact.co2Reduction} kg/year</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💰</span>
                  <span className="font-medium text-blue-800">Money Saved</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">${item.impact.moneySaved}/year</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Difficulty</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{item.impact.difficulty}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Recommended Actions:</h4>
              <ul className="space-y-3">
                {item.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {advice.length === 0 && (
          <div className="bg-slate-50 p-12 rounded-xl border-2 border-dashed border-slate-200 text-center">
            <Recycle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Search for eco-friendly tips or select a category to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoAdvice;