import React from 'react';
import { FileDown, X } from 'lucide-react';

interface LaboratoryData {
  name: string;
  faculty: string;
  description: string;
  keywords: string;
  equipes: Array<{ name: string; description: string }>;
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
              background: '#ffffff'
            }}
          >
            {/* Header */}
            <div 
              className="text-white p-6 mb-6 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                border: '1px solid #1e3a8a'
              }}
            >
              <h1 className="text-xl font-bold text-center mb-2">
                ANNUAIRE DES LABORATOIRES DE RECHERCHE
              </h1>
              <div className="text-center text-blue-100 text-xs font-medium">
                Fiche d'Information Scientifique et Administrative
              </div>
              <div className="text-center text-blue-200 text-xs mt-2">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Main Information */}
            <div className="space-y-4 mb-6">
              {/* Basic Information Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border border-blue-200" style={{ backgroundColor: '#eff6ff' }}>
                  <div className="font-bold text-blue-900 text-xs mb-1">DÉNOMINATION</div>
                  <div className="text-gray-800 font-semibold text-sm">{data.name || 'N/A'}</div>
                </div>
                <div className="p-3 border border-blue-200" style={{ backgroundColor: '#f0f9ff' }}>
                  <div className="font-bold text-blue-900 text-xs mb-1">FACULTÉ</div>
                  <div className="text-gray-800 font-medium text-sm">{data.faculty || 'N/A'}</div>
                </div>
                <div className="p-3 border border-green-200" style={{ backgroundColor: '#f0fdf4' }}>
                  <div className="font-bold text-green-900 text-xs mb-1">CODE</div>
                  <div className="text-gray-800 font-mono font-bold text-sm">{data.code || 'N/A'}</div>
                </div>
              </div>

              {/* Administrative Information Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-blue-200" style={{ backgroundColor: '#eff6ff' }}>
                  <div className="font-bold text-blue-900 text-xs mb-1">DIRECTEUR</div>
                  <div className="text-gray-800 font-medium text-sm">{data.director || 'N/A'}</div>
                </div>
                <div className="p-3 border border-green-200" style={{ backgroundColor: '#f0fdf4' }}>
                  <div className="font-bold text-green-900 text-xs mb-1">MOTS-CLÉS</div>
                  <div className="text-gray-800 text-sm">{data.keywords || 'N/A'}</div>
                </div>
              </div>

              {/* Administrative Details Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border border-blue-200" style={{ backgroundColor: '#f0f9ff' }}>
                  <div className="font-bold text-blue-900 text-xs mb-1">ARRÊTÉ DE CRÉATION</div>
                  <div className="text-gray-800 text-xs">{data.arreteCreation || 'N/A'}</div>
                </div>
                <div className="p-3 border border-blue-200" style={{ backgroundColor: '#f0f9ff' }}>
                  <div className="font-bold text-blue-900 text-xs mb-1">DOMICILIATION</div>
                  <div className="text-gray-800 text-xs">{data.domiciliation || 'N/A'}</div>
                </div>
                <div className="p-3 border border-green-200" style={{ backgroundColor: '#f0fdf4' }}>
                  <div className="font-bold text-green-900 text-xs mb-1">AGENCE THÉMATIQUE</div>
                  <div className="text-gray-800 text-xs">{data.agenceThematique || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div 
              className="p-4 mb-6 border border-blue-200"
              style={{ backgroundColor: '#eff6ff' }}
            >
              <div className="mb-3">
                <div className="font-bold text-blue-900 text-sm">DESCRIPTION DU LABORATOIRE</div>
              </div>
              <div className="text-gray-800 leading-relaxed text-sm bg-white p-3 border border-gray-200">
                {data.description || 'No description provided'}
              </div>
            </div>

            {/* Teams Section */}
            <div 
              className="p-4 mb-6 border border-green-200"
              style={{ backgroundColor: '#f0fdf4' }}
            >
              <div className="mb-3">
                <div className="font-bold text-green-900 text-sm">ÉQUIPES DE RECHERCHE</div>
              </div>
              <div className="space-y-3">
                {data.equipes && data.equipes.length > 0 ? (
                  data.equipes.map((equipe, index) => (
                    <div key={index} className="bg-white p-3 border border-gray-200">
                      <div className="font-semibold text-green-900 text-sm mb-1">
                        {equipe.name || `Équipe ${index + 1}`}
                      </div>
                      <div className="text-gray-800 text-xs leading-relaxed">
                        {equipe.description || 'Aucune description fournie'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-3 border border-gray-200 text-gray-500 text-xs">
                    Aucune équipe renseignée
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-3 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-600 font-medium">
                  Annuaire des Laboratoires de Recherche
                </div>
                <div className="text-xs text-gray-500">
                  Généré le: {new Date().toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
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