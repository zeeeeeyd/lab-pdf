import React, { useState, useEffect } from 'react';
import { FlaskConical, Plus } from 'lucide-react';
import LaboratoryForm from './components/LaboratoryForm';
import LaboratoryPreview from './components/LaboratoryPreview';
import LaboratoryList from './components/LaboratoryList';

interface LaboratoryData {
  id: string;
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
  createdAt: string;
}

type FormData = Omit<LaboratoryData, 'id' | 'createdAt'>;

function App() {
  const [laboratories, setLaboratories] = useState<LaboratoryData[]>([]);
  const [previewData, setPreviewData] = useState<FormData | null>(null);
  const [editingLab, setEditingLab] = useState<LaboratoryData | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Load laboratories from localStorage on component mount
  useEffect(() => {
    const savedLabs = localStorage.getItem('laboratories');
    if (savedLabs) {
      setLaboratories(JSON.parse(savedLabs));
    }
  }, []);

  // Save laboratories to localStorage whenever laboratories change
  useEffect(() => {
    localStorage.setItem('laboratories', JSON.stringify(laboratories));
  }, [laboratories]);

  const handleSubmit = (formData: FormData) => {
    if (editingLab) {
      // Update existing laboratory
      setLaboratories(prev => 
        prev.map(lab => 
          lab.id === editingLab.id 
            ? { ...lab, ...formData }
            : lab
        )
      );
      setEditingLab(null);
    } else {
      // Create new laboratory
      const newLab: LaboratoryData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setLaboratories(prev => [newLab, ...prev]);
    }
    
    setShowForm(false);
    alert('Laboratory saved successfully!');
  };

  const handlePreview = (formData: FormData) => {
    setPreviewData(formData);
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const documentContent = document.getElementById('laboratory-document');
      if (documentContent) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Laboratory Document</title>
              <style>
                body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
                @page { size: A4; margin: 0; }
                @media print { body { margin: 0; } }
                .no-print { display: none !important; }
              </style>
            </head>
            <body>
              ${documentContent.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleViewLab = (lab: LaboratoryData) => {
    const { id, createdAt, ...formData } = lab;
    setPreviewData(formData);
  };

  const handleEditLab = (lab: LaboratoryData) => {
    setEditingLab(lab);
    setShowForm(true);
  };

  const handleDeleteLab = (id: string) => {
    if (window.confirm('Are you sure you want to delete this laboratory?')) {
      setLaboratories(prev => prev.filter(lab => lab.id !== id));
    }
  };

  const handleNewLab = () => {
    setEditingLab(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Laboratory Management System</h1>
                <p className="text-sm text-gray-600">Create and manage laboratory information sheets</p>
              </div>
            </div>
            <button
              onClick={handleNewLab}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={16} />
              New Laboratory
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Form Section */}
          {showForm && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingLab ? 'Edit Laboratory' : 'Create New Laboratory'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingLab(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <LaboratoryForm
                onSubmit={handleSubmit}
                onPreview={handlePreview}
                initialData={editingLab ? {
                  name: editingLab.name,
                  faculty: editingLab.faculty,
                  description: editingLab.description,
                  keywords: editingLab.keywords,
                  equipes: editingLab.equipes,
                  director: editingLab.director,
                  arreteCreation: editingLab.arreteCreation,
                  code: editingLab.code,
                  domiciliation: editingLab.domiciliation,
                  agenceThematique: editingLab.agenceThematique,
                } : undefined}
              />
            </div>
          )}

          {/* Laboratory List */}
          <LaboratoryList
            laboratories={laboratories}
            onView={handleViewLab}
            onEdit={handleEditLab}
            onDelete={handleDeleteLab}
          />
        </div>
      </main>

      {/* Preview Modal */}
      {previewData && (
        <LaboratoryPreview
          data={previewData}
          onClose={handleClosePreview}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}

export default App;