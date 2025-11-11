import { useState, useEffect } from 'react';
import { FlaskConical, Plus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import LaboratoryForm from './components/LaboratoryForm';
import LaboratoryPreview from './components/LaboratoryPreview';
import LaboratoryList from './components/LaboratoryList';

interface EquipeData {
  name: string;
  description: string;
  leader: string;
}

interface LaboratoryData {
  id: string;
  name: string;
  faculty: string;
  description: string;
  keywords: string;
  equipes: EquipeData[];
  director: string;
  arreteCreation: string;
  code: string;
  domiciliation: string;
  agenceThematique: string;
  email: string;
  phone: string;
  directorAppointmentDate: string;
  language: 'fr' | 'ar';
  createdAt: string;
}

type FormData = Omit<LaboratoryData, 'id' | 'createdAt'>;

const ensureEquipeStructure = (equipes: Array<Partial<EquipeData>> = []): EquipeData[] =>
  equipes.map((equipe) => ({
    name: equipe?.name || '',
    description: equipe?.description || '',
    leader: equipe?.leader || ''
  }));

function App() {
  const [laboratories, setLaboratories] = useState<LaboratoryData[]>([]);
  const [previewData, setPreviewData] = useState<FormData | null>(null);
  const [editingLab, setEditingLab] = useState<LaboratoryData | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Load laboratories from localStorage on component mount
  useEffect(() => {
    const savedLabs = localStorage.getItem('laboratories');
    if (savedLabs) {
      try {
        const parsed: LaboratoryData[] = JSON.parse(savedLabs);
        setLaboratories(parsed.map((lab) => ({
          ...lab,
          equipes: ensureEquipeStructure(lab.equipes || []),
          email: lab.email || '',
          phone: lab.phone || '',
          directorAppointmentDate: lab.directorAppointmentDate || '',
          language: lab.language === 'ar' ? 'ar' : 'fr'
        })));
      } catch (error) {
        console.error('Unable to parse saved laboratories', error);
      }
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
            ? { ...lab, ...formData, equipes: ensureEquipeStructure(formData.equipes) }
            : lab
        )
      );
      setEditingLab(null);
    } else {
      // Create new laboratory
      const newLab: LaboratoryData = {
        ...formData,
        equipes: ensureEquipeStructure(formData.equipes),
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

  const handleDownload = async () => {
    const documentContent = document.getElementById('laboratory-document');

    if (!(documentContent instanceof HTMLElement)) {
      alert('No document available for download.');
      return;
    }

    try {
      const canvas = await html2canvas(documentContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const sanitizedName = (previewData?.name?.trim() || 'laboratoire')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'laboratoire';

      pdf.save(`${sanitizedName}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('La génération du PDF a échoué. Veuillez réessayer.');
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
                  equipes: ensureEquipeStructure(editingLab.equipes),
                  director: editingLab.director,
                  arreteCreation: editingLab.arreteCreation,
                  code: editingLab.code,
                  domiciliation: editingLab.domiciliation,
                  agenceThematique: editingLab.agenceThematique,
                  email: editingLab.email || '',
                  phone: editingLab.phone || '',
                  directorAppointmentDate: editingLab.directorAppointmentDate || '',
                  language: editingLab.language || 'fr',
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
