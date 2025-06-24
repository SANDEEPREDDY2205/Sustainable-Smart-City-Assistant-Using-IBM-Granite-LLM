import React, { useState } from 'react';
import { Search, FileText, Filter, Download, Eye } from 'lucide-react';

const PolicySearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'environment', label: 'Environmental' },
    { id: 'transport', label: 'Transportation' },
    { id: 'housing', label: 'Housing & Development' },
    { id: 'energy', label: 'Energy & Utilities' },
    { id: 'social', label: 'Social Services' }
  ];

  const samplePolicies = [
    {
      id: 1,
      title: 'Green Building Standards Initiative',
      category: 'environment',
      summary: 'Comprehensive guidelines for sustainable construction practices, energy efficiency requirements, and environmental impact assessments for new developments.',
      relevanceScore: 95,
      lastUpdated: '2024-11-15',
      status: 'Active',
      tags: ['sustainability', 'construction', 'energy efficiency'],
      documentType: 'Policy Framework'
    },
    {
      id: 2,
      title: 'Public Transportation Expansion Plan',
      category: 'transport',
      summary: 'Strategic roadmap for expanding public transit network, including bus rapid transit systems and integration with existing infrastructure.',
      relevanceScore: 88,
      lastUpdated: '2024-10-20',
      status: 'Under Review',
      tags: ['public transit', 'infrastructure', 'mobility'],
      documentType: 'Strategic Plan'
    },
    {
      id: 3,
      title: 'Renewable Energy Adoption Framework',
      category: 'energy',
      summary: 'Guidelines for transitioning to renewable energy sources, including solar panel installations and wind energy projects for municipal buildings.',
      relevanceScore: 92,
      lastUpdated: '2024-12-01',
      status: 'Active',
      tags: ['renewable energy', 'solar', 'sustainability'],
      documentType: 'Implementation Guide'
    },
    {
      id: 4,
      title: 'Affordable Housing Development Policy',
      category: 'housing',
      summary: 'Regulations and incentives for developers to include affordable housing units in new residential projects.',
      relevanceScore: 85,
      lastUpdated: '2024-09-30',
      status: 'Active',
      tags: ['affordable housing', 'development', 'zoning'],
      documentType: 'Regulatory Framework'
    }
  ];

  const performSearch = async () => {
    setIsSearching(true);
    
    // Simulate semantic search processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let results = samplePolicies;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(policy => policy.category === selectedCategory);
    }
    
    // Filter by search query (simple text matching for demo)
    if (searchQuery.trim()) {
      results = results.filter(policy => 
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      // Adjust relevance scores based on search query
      results = results.map(policy => ({
        ...policy,
        relevanceScore: Math.max(60, policy.relevanceScore - Math.random() * 20)
      }));
    }
    
    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-slate-100 text-slate-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environment': return 'bg-green-100 text-green-800';
      case 'transport': return 'bg-purple-100 text-purple-800';
      case 'housing': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-yellow-100 text-yellow-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Policy Search & Analysis</h1>
        <p className="text-slate-600">Semantic search through city policies using AI-powered document analysis</p>
      </div>

      {/* Search Interface */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policies, regulations, and documents..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {searchResults.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Found {searchResults.length} policy document{searchResults.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Sorted by relevance</span>
            </div>
          </div>
        )}

        {searchResults.map(policy => (
          <div key={policy.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{policy.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(policy.category)}`}>
                      {categories.find(c => c.id === policy.category)?.label}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 mb-3 leading-relaxed">{policy.summary}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>Updated: {policy.lastUpdated}</span>
                  <span>•</span>
                  <span>{policy.documentType}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium">{policy.relevanceScore}%</span>
                    relevance
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {policy.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                    View Full Document
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Generate Summary
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-200 rounded-full h-2 w-24">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${policy.relevanceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {searchResults.length === 0 && (searchQuery || selectedCategory !== 'all') && !isSearching && (
          <div className="bg-slate-50 p-12 rounded-xl border-2 border-dashed border-slate-200 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">No policies found</p>
            <p className="text-slate-500">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {searchResults.length === 0 && !searchQuery && selectedCategory === 'all' && (
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-12 rounded-xl border border-emerald-200 text-center">
            <Search className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <p className="text-slate-800 text-lg mb-2">Semantic Policy Search</p>
            <p className="text-slate-600 mb-4">Search through city policies using natural language queries</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-sm">Try: "renewable energy"</span>
              <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-sm">Try: "affordable housing"</span>
              <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-sm">Try: "public transport"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicySearch;