import React, { useState } from 'react';
import { Upload, FileText, Download, Sparkles } from 'lucide-react';

const DocumentSummarizer: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [summaries, setSummaries] = useState<any[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const processSummary = async (file: any) => {
    setProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockSummary = {
      id: file.id,
      fileName: file.name,
      originalLength: "2,847 words",
      summaryLength: "342 words",
      keyPoints: [
        "Urban sustainability requires integrated approach to energy, water, and waste management",
        "Citizens' engagement is crucial for successful smart city initiatives",
        "Data-driven decision making improves resource allocation efficiency",
        "Green infrastructure reduces urban heat island effects"
      ],
      summary: "This policy document outlines comprehensive strategies for sustainable urban development. It emphasizes the importance of renewable energy adoption, efficient water management systems, and citizen participation in environmental initiatives. The document proposes a framework for measuring sustainability metrics and implementing smart city technologies to improve quality of life while reducing environmental impact.",
      confidenceScore: 94
    };
    
    setSummaries(prev => [...prev, mockSummary]);
    setProcessing(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Document Summarizer</h1>
        <p className="text-slate-600">Upload policy documents for AI-powered summarization using IBM Granite LLM</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-800">Drop files here or click to upload</p>
                <p className="text-sm text-slate-500">Supports PDF, DOC, DOCX, TXT files</p>
              </div>
            </div>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {files.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-800">{file.name}</p>
                        <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => processSummary(file)}
                      disabled={processing}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      {processing ? 'Processing...' : 'Summarize'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summaries */}
        <div className="space-y-6">
          {summaries.map(summary => (
            <div key={summary.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">{summary.fileName}</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-600">Original Length</p>
                  <p className="font-medium text-slate-800">{summary.originalLength}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-emerald-600">Summary Length</p>
                  <p className="font-medium text-emerald-800">{summary.summaryLength}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">AI Confidence</h4>
                  <span className="text-sm font-medium text-emerald-600">{summary.confidenceScore}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${summary.confidenceScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-slate-800 mb-2">Key Points</h4>
                <ul className="space-y-2">
                  {summary.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-600">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-2">Summary</h4>
                <p className="text-slate-600 leading-relaxed">{summary.summary}</p>
              </div>
            </div>
          ))}

          {summaries.length === 0 && (
            <div className="bg-slate-50 p-8 rounded-xl border-2 border-dashed border-slate-200 text-center">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600">Upload documents to see AI-generated summaries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentSummarizer;