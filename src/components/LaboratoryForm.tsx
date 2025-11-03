import React, { useState } from 'react';
import { FileDown, Eye, Save } from 'lucide-react';

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

interface LaboratoryFormProps {
  onSubmit: (data: LaboratoryData) => void;
  onPreview: (data: LaboratoryData) => void;
  initialData?: LaboratoryData;
}

export default function LaboratoryForm({ onSubmit, onPreview, initialData }: LaboratoryFormProps) {
  const [formData, setFormData] = useState<LaboratoryData>(
    initialData || {
      name: '',
      faculty: '',
      description: '',
      keywords: '',
      equipes: [{ name: '', description: '' }],
      director: '',
      arreteCreation: '',
      code: '',
      domiciliation: '',
      agenceThematique: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEquipeChange = (index: number, field: 'name' | 'description', value: string) => {
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
      equipes: [...prev.equipes, { name: '', description: '' }]
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
  const handleSubmit = (e: React.FormEvent) => {
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
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter faculty"
            />
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
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
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
                  <textarea
                    value={equipe.description}
                    onChange={(e) => handleEquipeChange(index, 'description', e.target.value)}
                    placeholder="Team description"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
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