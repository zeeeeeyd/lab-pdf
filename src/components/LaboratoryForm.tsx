import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, Save } from 'lucide-react';

const FACULTIES = [
  { value: 'FSNV', label: 'FSNV - Faculte des Sciences de la Nature et de la Vie' },
  { value: 'FST', label: 'FST - Faculte des Sciences et Technologies' },
  { value: 'FMED', label: 'FMED - Faculte de Medecine' },
  { value: 'IESP', label: 'IESP - Institut d\'Education Physique et Sportive' },
  { value: 'FSESCSG', label: 'FSESCSG - Faculte des Sciences Economiques Commerciales et des Sciences de Gestion' },
  { value: 'FSS', label: 'FSS - Faculte des Sciences Sociales' },
  { value: 'FLAA', label: 'FLAA - Faculte de Litterature Arabe et des Arts' },
  { value: 'FDSP', label: 'FDSP - Faculte de Droit et de Science Politique' },
  { value: 'FLE', label: 'FLE - Faculte des Langues Etrangeres' },
  { value: 'FSEI', label: 'FSEI - Faculte des Sciences Exactes et Informatique' },
] as const;

const normalizeFacultyValue = (value: string) => {
  const legacyMap: Record<string, string> = {
    MEDECINE: 'FMED',
  };

  return legacyMap[value] || value;
};

interface LaboratoryData {
  name: string;
  faculty: string;
  description: string;
  keywords: string;
  equipes: Array<{ name: string; description: string; leader: string }>;
  director: string;
  arreteCreation: string;
  code: string;
  domiciliation: string;
  agenceThematique: string;
  email: string;
  phone: string;
  directorAppointmentDate: string;
  language: 'fr' | 'ar';
}

interface LaboratoryFormProps {
  onSubmit: (data: LaboratoryData) => void;
  onPreview: (data: LaboratoryData) => void;
  initialData?: LaboratoryData;
}

export default function LaboratoryForm({ onSubmit, onPreview, initialData }: LaboratoryFormProps) {
  const [formData, setFormData] = useState<LaboratoryData>(
    initialData
      ? { ...initialData, faculty: normalizeFacultyValue(initialData.faculty) }
      : {
          name: '',
          faculty: '',
          description: '',
          keywords: '',
          equipes: [{ name: '', description: '', leader: '' }],
          director: '',
          arreteCreation: '',
          code: '',
          domiciliation: '',
          agenceThematique: '',
          email: '',
          phone: '',
          directorAppointmentDate: '',
          language: 'fr',
        }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEquipeChange = (index: number, field: 'name' | 'description' | 'leader', value: string) => {
    setFormData(prev => ({
      ...prev,
      equipes: prev.equipes.map((equipe, i) => 
        i === index ? { ...equipe, [field]: value } : equipe
      )
    }));
  };

  const addEquipe = () => {
    setFormData(prev => ({
      ...prev,
      equipes: [...prev.equipes, { name: '', description: '', leader: '' }]
    }));
  };

  const removeEquipe = (index: number) => {
    if (formData.equipes.length > 1) {
      setFormData(prev => ({
        ...prev,
        equipes: prev.equipes.filter((_, i) => i !== index)
      }));
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Laboratory Information</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laboratory Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter laboratory name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faculty *
            </label>
            <select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select a faculty</option>
              {FACULTIES.map((faculty) => (
                <option key={faculty.value} value={faculty.value}>
                  {faculty.label}
                </option>
              ))}
              {formData.faculty && !FACULTIES.some((faculty) => faculty.value === formData.faculty) && (
                <option value={formData.faculty}>{formData.faculty}</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="contact@university.dz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telephone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+213 00 00 00 00"
            />
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Langue du document
          </span>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="language"
                value="fr"
                checked={formData.language === 'fr'}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              Francais
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="language"
                value="ar"
                checked={formData.language === 'ar'}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              Arabe
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter laboratory description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter keywords (comma separated)"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Équipes
              </label>
              <button
                type="button"
                onClick={addEquipe}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Team
              </button>
            </div>
            <div className="space-y-3">
              {formData.equipes.map((equipe, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Team name *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={equipe.name}
                        onChange={(e) => handleEquipeChange(index, 'name', e.target.value)}
                        placeholder="Team name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      {formData.equipes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEquipe(index)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Chef d'équipe *
                    </label>
                    <input
                      type="text"
                      value={equipe.leader}
                      onChange={(e) => handleEquipeChange(index, 'leader', e.target.value)}
                      placeholder="Team leader name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Team description
                    </label>
                    <textarea
                      value={equipe.description}
                      onChange={(e) => handleEquipeChange(index, 'description', e.target.value)}
                      placeholder="Team description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Administrative Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Director *
            </label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter director name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de nomination du directeur
            </label>
            <input
              type="date"
              name="directorAppointmentDate"
              value={formData.directorAppointmentDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code *
            </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter laboratory code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrêté de création
              </label>
              <input
                type="text"
                name="arreteCreation"
                value={formData.arreteCreation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter creation decree"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domiciliation
              </label>
              <input
                type="text"
                name="domiciliation"
                value={formData.domiciliation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter domiciliation"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agence thématique de rattachement
            </label>
            <input
              type="text"
              name="agenceThematique"
              value={formData.agenceThematique}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter thematic agency"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Save size={16} />
            Save Laboratory
          </button>
        </div>
      </form>
    </div>
  );
}
