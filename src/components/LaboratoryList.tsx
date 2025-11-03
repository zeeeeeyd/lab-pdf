import React from 'react';
import { Eye, Trash2, CreditCard as Edit } from 'lucide-react';

interface LaboratoryData {
  id: string;
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
  createdAt: string;
}

interface LaboratoryListProps {
  laboratories: LaboratoryData[];
  onView: (lab: LaboratoryData) => void;
  onEdit: (lab: LaboratoryData) => void;
  onDelete: (id: string) => void;
}

export default function LaboratoryList({ laboratories, onView, onEdit, onDelete }: LaboratoryListProps) {
  if (laboratories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No laboratories saved yet</h3>
        <p className="text-gray-600">Create your first laboratory information sheet using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gray-50 border-b">
        <h2 className="text-xl font-bold text-gray-800">Saved Laboratories ({laboratories.length})</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {laboratories.map((lab) => (
          <div key={lab.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {lab.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {lab.code}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Faculty:</span> {lab.faculty}
                  </div>
                  <div>
                    <span className="font-medium">Director:</span> {lab.director}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {new Date(lab.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {lab.description}
                </p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onView(lab)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="View Document"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(lab)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  title="Edit Laboratory"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(lab.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete Laboratory"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}