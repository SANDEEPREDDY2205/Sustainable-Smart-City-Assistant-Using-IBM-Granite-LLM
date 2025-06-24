import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Lightbulb, MapPin, TrendingUp } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your Smart City AI Assistant powered by IBM Granite LLM. I can help you with sustainability questions, city planning insights, policy guidance, and environmental advice. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { icon: Lightbulb, text: "How can my city reduce carbon emissions?", category: "Environment" },
    { icon: MapPin, text: "What are smart city best practices?", category: "Planning" },
    { icon: TrendingUp, text: "How to improve energy efficiency?", category: "Energy" },
    { icon: Bot, text: "Explain sustainable transportation options", category: "Transport" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (question: string) => {
    const responses: { [key: string]: string } = {
      'carbon emissions': `To reduce carbon emissions, cities can implement several strategies:

🌱 **Green Infrastructure:**
- Expand urban forests and green rooftops
- Create more parks and green corridors
- Implement vertical gardens on buildings

⚡ **Energy Transition:**
- Switch to renewable energy sources (solar, wind)
- Upgrade to LED street lighting
- Improve building energy efficiency standards

🚊 **Sustainable Transportation:**
- Develop robust public transit systems
- Promote cycling infrastructure
- Encourage electric vehicle adoption
- Implement car-free zones in city centers

These initiatives can reduce emissions by 30-50% over 10 years while improving air quality and citizen health.`,

      'smart city': `Smart city best practices include:

📊 **Data-Driven Governance:**
- Real-time monitoring of city services
- Predictive analytics for resource planning
- Citizen engagement through digital platforms

🏗️ **Infrastructure Innovation:**
- IoT sensors for traffic and utilities
- Smart grid for energy distribution
- Integrated waste management systems

👥 **Citizen-Centric Services:**
- Mobile apps for city services
- Digital participation in decision-making
- Transparent governance through open data

🔒 **Security & Privacy:**
- Robust cybersecurity frameworks
- Data privacy protection
- Resilient communication networks`,

      'energy efficiency': `Improving city energy efficiency involves:

🏢 **Building Standards:**
- Mandatory energy audits for large buildings
- Green building certification requirements
- Retrofitting programs for older structures

💡 **Smart Systems:**
- Intelligent street lighting with sensors
- Smart thermostats in public buildings
- Energy management systems for facilities

📈 **Monitoring & Analytics:**
- Real-time energy consumption tracking
- AI-powered optimization algorithms
- Performance benchmarking across districts

Cities implementing these measures typically see 25-40% reduction in energy consumption within 5 years.`,

      'transportation': `Sustainable transportation options include:

🚲 **Active Mobility:**
- Protected bike lanes and cycling highways
- Bike-sharing programs
- Pedestrian-friendly urban design
- Micro-mobility integration (scooters, e-bikes)

🚌 **Public Transit:**
- Bus Rapid Transit (BRT) systems
- Light rail and metro networks
- Electric bus fleets
- Integrated payment systems

🚗 **Smart Mobility:**
- Car-sharing and ride-sharing platforms
- Electric vehicle charging infrastructure
- Autonomous vehicle pilot programs
- Traffic optimization through AI

These solutions can reduce private vehicle usage by 30-60% while improving air quality and reducing traffic congestion.`
    };

    // Find the most relevant response
    const query = question.toLowerCase();
    const matchedKey = Object.keys(responses).find(key => 
      query.includes(key) || key.split(' ').some(word => query.includes(word))
    );

    return responses[matchedKey] || `Thank you for your question about "${question}". As a Smart City AI Assistant, I can provide insights on urban sustainability, energy efficiency, transportation planning, and environmental policies.

Here are some general recommendations:

🌍 **Sustainability Focus:**
- Implement circular economy principles
- Prioritize renewable energy adoption
- Enhance waste reduction and recycling programs

📊 **Data-Driven Decisions:**
- Use IoT sensors for real-time monitoring
- Apply predictive analytics for resource planning
- Engage citizens through digital platforms

🏗️ **Infrastructure Development:**
- Invest in green building standards
- Develop resilient infrastructure
- Create integrated transportation networks

Would you like me to elaborate on any specific aspect of smart city development or sustainability?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      content: await generateResponse(inputMessage),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Chat Assistant</h1>
        <p className="text-slate-600">Powered by IBM Granite LLM - Your smart city advisor</p>
      </div>

      {/* Quick Questions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => {
            const Icon = question.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className="flex items-center gap-3 p-3 text-left bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
              >
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{question.text}</p>
                  <p className="text-xs text-slate-500">{question.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-lg p-4 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' 
                  : 'bg-slate-50 text-slate-800'
              }`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-emerald-100' : 'text-slate-500'
                }`}>
                  {message.timestamp}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-slate-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about smart city solutions, sustainability, or urban planning..."
              className="flex-1 resize-none border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;