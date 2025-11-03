import React from 'react';
import { FileDown, X } from 'lucide-react';

interface LaboratoryData {
  name: string;
  faculty: string;
  description: string;
  keywords: string;
  equipes: string;
  director: string;
  arreteCreation: string;
  code: string;
  domiciliation: string;
  agenceThematique: string;
}

interface LaboratoryPreviewProps {
  data: LaboratoryData;
  onClose: () => void;
  onDownload: () => void;
}

export default function LaboratoryPreview({ data, onClose, onDownload }: LaboratoryPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Laboratory Document Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileDown size={16} />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* A4 Document Preview */}
        <div className="p-8">
          <div 
            id="laboratory-document" 
            className="bg-white shadow-lg mx-auto"
            style={{
              width: '210mm',
              minHeight: '297mm',
              padding: '15mm',
              fontSize: '11px',
              lineHeight: '1.4',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}
          >
            {/* Header with gradient background */}
            <div 
              className="text-white p-6 mb-6 rounded-lg shadow-md"
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
                border: '2px solid #1e40af'
              }}
            >
              <h1 className="text-2xl font-bold text-center mb-2">
                🧪 LABORATORY DIRECTORY
              </h1>
              <div className="text-center text-blue-100 text-sm font-medium">
                Research & Development Information Sheet
              </div>
              <div className="text-center text-blue-200 text-xs mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              {/* Left Column - Primary Info */}
              <div className="col-span-7 space-y-4">
                {/* Laboratory Name Card */}
                <div 
                  className="p-4 rounded-lg shadow-sm border-l-4"
                  style={{ 
                    backgroundColor: '#fef3c7', 
                    borderLeftColor: '#f59e0b',
                    border: '1px solid #fbbf24'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: '#f59e0b' }}
                    ></div>
                    <div className="font-bold text-amber-800 text-sm">LABORATORY NAME</div>
                  </div>
                  <div className="text-gray-800 font-semibold text-base">
                    {data.name || 'N/A'}
                  </div>
                </div>

                {/* Faculty Card */}
                <div>
                  <div 
                    className="p-4 rounded-lg shadow-sm border-l-4"
                    style={{ 
                      backgroundColor: '#dbeafe', 
                      borderLeftColor: '#3b82f6',
                      border: '1px solid #60a5fa'
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: '#3b82f6' }}
                      ></div>
                      <div className="font-bold text-blue-800 text-sm">FACULTY</div>
                    </div>
                    <div className="text-gray-800 font-medium">
                      {data.faculty || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Keywords & Teams Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="p-3 rounded-lg shadow-sm border-l-4"
                    style={{ 
                      backgroundColor: '#f0fdf4', 
                      borderLeftColor: '#22c55e',
                      border: '1px solid #4ade80'
                    }}
                  >
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: '#22c55e' }}
                      ></div>
                      <div className="font-bold text-green-800 text-xs">KEYWORDS</div>
                    </div>
                    <div className="text-gray-700 text-xs">
                      {data.keywords || 'N/A'}
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-lg shadow-sm border-l-4"
                    style={{ 
                      backgroundColor: '#fdf2f8', 
                      borderLeftColor: '#ec4899',
                      border: '1px solid #f472b6'
                    }}
                  >
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: '#ec4899' }}
                      ></div>
                      <div className="font-bold text-pink-800 text-xs">ÉQUIPES</div>
                    </div>
                    <div className="text-gray-700 text-xs">
                      {data.equipes || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Administrative Info */}
              <div className="col-span-5 space-y-4">
                {/* Director Card */}
                <div 
                  className="p-4 rounded-lg shadow-sm border-l-4"
                  style={{ 
                    backgroundColor: '#f3e8ff', 
                    borderLeftColor: '#8b5cf6',
                    border: '1px solid #a78bfa'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: '#8b5cf6' }}
                    ></div>
                    <div className="font-bold text-purple-800 text-sm">DIRECTOR</div>
                  </div>
                  <div className="text-gray-800 font-medium">
                    {data.director || 'N/A'}
                  </div>
                </div>

                {/* Code Card */}
                <div 
                  className="p-4 rounded-lg shadow-sm border-l-4"
                  style={{ 
                    backgroundColor: '#fef7ff', 
                    borderLeftColor: '#d946ef',
                    border: '1px solid #e879f9'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: '#d946ef' }}
                    ></div>
                    <div className="font-bold text-fuchsia-800 text-sm">CODE</div>
                  </div>
                  <div className="text-gray-800 font-mono font-bold text-lg">
                    {data.code || 'N/A'}
                  </div>
                </div>

                {/* Administrative Details */}
                <div className="space-y-2">
                  <div 
                    className="p-2 rounded shadow-sm"
                    style={{ backgroundColor: '#e0f2fe', border: '1px solid #0891b2' }}
                  >
                    <div className="font-semibold text-cyan-800 text-xs mb-1">Arrêté de création:</div>
                    <div className="text-gray-700 text-xs">{data.arreteCreation || 'N/A'}</div>
                  </div>

                  <div 
                    className="p-2 rounded shadow-sm"
                    style={{ backgroundColor: '#ecfdf5', border: '1px solid #059669' }}
                  >
                    <div className="font-semibold text-emerald-800 text-xs mb-1">Domiciliation:</div>
                    <div className="text-gray-700 text-xs">{data.domiciliation || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div 
              className="p-5 rounded-lg shadow-md mb-6 border-l-4"
              style={{ 
                backgroundColor: '#fffbeb', 
                borderLeftColor: '#f59e0b',
                border: '1px solid #fbbf24'
              }}
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: '#f59e0b' }}
                ></div>
                <div className="font-bold text-amber-800 text-base">LABORATORY DESCRIPTION</div>
              </div>
              <div className="text-gray-800 leading-relaxed text-sm bg-white p-4 rounded border">
                {data.description || 'No description provided'}
              </div>
            </div>

            {/* Thematic Agency Section */}
            <div 
              className="p-4 rounded-lg shadow-md border-l-4"
              style={{ 
                backgroundColor: '#f0f9ff', 
                borderLeftColor: '#0ea5e9',
                border: '1px solid #38bdf8'
              }}
            >
              <div className="flex items-center mb-2">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: '#0ea5e9' }}
                ></div>
                <div className="font-bold text-sky-800 text-sm">AGENCE THÉMATIQUE DE RATTACHEMENT</div>
              </div>
              <div className="text-gray-800 font-medium">
                {data.agenceThematique || 'N/A'}
              </div>
            </div>

            {/* Decorative Footer */}
            <div className="mt-8 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: '#3b82f6' }}
                  ></div>
                  <div className="text-xs text-gray-600 font-medium">
                    Laboratory Directory System
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Generated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}