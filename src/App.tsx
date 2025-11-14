import { useState, useEffect } from 'react';
import { FlaskConical, Plus } from 'lucide-react';
import { jsPDF } from 'jspdf';
import LaboratoryForm from './components/LaboratoryForm';
import LaboratoryPreview from './components/LaboratoryPreview';
import LaboratoryList from './components/LaboratoryList';
import { getFacultyColors } from './utils/facultyColors';

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
    if (!previewData) {
      alert('No document available for download.');
      return;
    }

    try {
      const loadImageAsDataUrl = async (path: string) => {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Unable to load image at ${path}`);
        }
        const blob = await response.blob();
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to read image data'));
            }
          };
          reader.onerror = () => reject(reader.error || new Error('Failed to read image data'));
          reader.readAsDataURL(blob);
        });
      };

      const facultyColors = getFacultyColors(previewData.faculty);
      const logoDataUrl = await loadImageAsDataUrl('/universite-abdelhamid-logo.png').catch(() => null);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const bandWidth = 22;
      const safeMarginTop = 18;
      const safeMarginBottom = 22;
      const contentLeft = bandWidth + 12;
      const contentRightMargin = 12;
      const contentWidth = pageWidth - contentLeft - contentRightMargin;
      const defaultFontSize = 10;
      const pointsToMillimeters = 25.4 / 72;
      const getLineHeight = (fontSize = defaultFontSize) =>
        pdf.getLineHeightFactor() * fontSize * pointsToMillimeters;
      const lineHeight = getLineHeight();

      const hexToRgb = (hex: string): [number, number, number] => {
        const normalized = hex.replace('#', '');
        const bigint = parseInt(normalized, 16);
        return [
          (bigint >> 16) & 255,
          (bigint >> 8) & 255,
          bigint & 255
        ];
      };

      const primaryRgb = hexToRgb(facultyColors.primary);
      const lightRgb = hexToRgb(facultyColors.light);
      const textRgb: [number, number, number] = [31, 41, 55];
      const mutedRgb: [number, number, number] = [107, 114, 128];

      const setTextColor = (rgb: [number, number, number]) => {
        pdf.setTextColor(rgb[0], rgb[1], rgb[2]);
      };

      let cursorY = safeMarginTop;
      let currentPageNumber = 0;

      const drawPageChrome = (isFirstPage: boolean) => {
        pdf.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
        pdf.rect(0, 0, bandWidth, pageHeight, 'F');

        pdf.setFillColor(255, 255, 255);
        pdf.circle(bandWidth / 2, safeMarginTop - 5, 10, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        setTextColor(primaryRgb);
        pdf.text(facultyColors.abbr, bandWidth / 2, safeMarginTop - 2.5, { align: 'center' });

        pdf.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
        pdf.setLineWidth(0.6);
        pdf.line(bandWidth + 4, safeMarginTop - 6, bandWidth + 4, pageHeight - safeMarginBottom + 6);

        if (logoDataUrl && isFirstPage) {
          const logoWidth = 26;
          const logoHeight = 26;
          pdf.addImage(
            logoDataUrl,
            'PNG',
            pageWidth - logoWidth - contentRightMargin,
            safeMarginTop - 10,
            logoWidth,
            logoHeight
          );
        }
      };

      const startPage = (isFirst = false) => {
        if (!isFirst) {
          pdf.addPage();
          currentPageNumber++;
        }
        drawPageChrome(currentPageNumber === 0);
        cursorY = safeMarginTop;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(defaultFontSize);
        setTextColor(textRgb);
      };

      const ensureSpace = (heightNeeded: number) => {
        if (cursorY + heightNeeded <= pageHeight - safeMarginBottom) {
          return;
        }
        startPage();
      };

      const addSectionBlock = (title: string, body: string) => {
        const normalizedBody = body?.trim() ? body : 'Non renseigné';
        const cardPadding = 4;
        const headerHeight = 6.5;
        const titleContentGap = 4;
        const innerWidth = contentWidth - cardPadding * 2;
        const bodyLines = pdf.splitTextToSize(normalizedBody, innerWidth);
        let lineIndex = 0;
        let isFirstChunk = true;

        while (lineIndex < bodyLines.length) {
          const structuralHeight = cardPadding * 2 + (isFirstChunk ? headerHeight + titleContentGap : 0);
          const availableHeight = pageHeight - safeMarginBottom - cursorY;
          const usableHeight = availableHeight - structuralHeight;

          if (usableHeight < lineHeight) {
            startPage();
            continue;
          }

          const maxLines = Math.max(1, Math.floor(usableHeight / lineHeight));
          const chunkLines = bodyLines.slice(lineIndex, lineIndex + maxLines);
          lineIndex += chunkLines.length;
          const blockHeight = structuralHeight + chunkLines.length * lineHeight;

          pdf.setFillColor(lightRgb[0], lightRgb[1], lightRgb[2]);
          pdf.rect(contentLeft, cursorY, contentWidth, blockHeight, 'F');

          if (isFirstChunk) {
            pdf.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            pdf.rect(
              contentLeft + cardPadding,
              cursorY + cardPadding,
              contentWidth - cardPadding * 2,
              headerHeight,
              'F'
            );
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(defaultFontSize);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
              title,
              contentLeft + cardPadding + 1.5,
              cursorY + cardPadding + headerHeight - 1
            );
          }

          setTextColor(textRgb);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(defaultFontSize);
          const textStartY = cursorY + cardPadding + (isFirstChunk ? headerHeight + titleContentGap + 1 : 3);
          pdf.text(chunkLines, contentLeft + cardPadding, textStartY);

          cursorY += blockHeight;

          if (lineIndex < bodyLines.length) {
            cursorY += 1;
            startPage();
          } else {
            cursorY += 5;
          }

          isFirstChunk = false;
        }
      };

      const addTeamsSection = () => {
        const teams = previewData.equipes || [];
        if (teams.length === 0) {
          addSectionBlock('Organisation des équipes de recherche :', 'Aucune équipe renseignée');
          return;
        }

        const teamsText = teams
          .map((team, index) => {
            const name = team.name?.trim() || `Équipe ${index + 1}`;
            const leader = team.leader?.trim() || 'Non renseigné';
            const description = team.description?.trim();
            const descriptionPart = description ? `\n${description}` : '';
            return `Équipe ${index + 1} : ${name}\nChef d'équipe : ${leader}${descriptionPart}`;
          })
          .join('\n\n');

        addSectionBlock('Organisation des équipes de recherche :', teamsText);
      };

      const addKeywords = () => {
        if (!previewData.keywords?.trim()) {
          return;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(defaultFontSize);
        ensureSpace(lineHeight * 2);
        pdf.text('Mots-clés :', contentLeft, cursorY);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(defaultFontSize);
        const keywordLines = pdf.splitTextToSize(previewData.keywords, contentWidth - 20);
        pdf.text(keywordLines, contentLeft + 20, cursorY);
        cursorY += keywordLines.length * lineHeight + 2;
      };

      startPage(true);

      // Header information
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setTextColor(textRgb);
      const facultyLines = pdf.splitTextToSize(facultyColors.fullName, contentWidth);
      ensureSpace(facultyLines.length * lineHeight + 10);
      pdf.text(facultyLines, contentLeft, cursorY);
      cursorY += facultyLines.length * lineHeight + 2;

      pdf.setFontSize(18);
      pdf.text(previewData.name || 'N/A', contentLeft, cursorY + 6);
      cursorY += 12;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(defaultFontSize);
      setTextColor(mutedRgb);
      pdf.text(`Faculté : ${previewData.faculty}`, contentLeft, cursorY);
      cursorY += 6;
      setTextColor(textRgb);

      const leftColumnRows = [
        { label: 'Arrêté de création', value: previewData.arreteCreation },
        { label: 'Domiciliation', value: previewData.domiciliation },
        { label: 'Directeur', value: previewData.director },
        { label: 'Tel', value: previewData.phone }
      ];

      const rightColumnRows = [
        { label: 'Code', value: previewData.code },
        { label: 'Agence thématique de rattachement', value: previewData.agenceThematique },
        { label: 'E-mail', value: previewData.email },
        { label: 'Date de nomination du directeur', value: previewData.directorAppointmentDate }
      ];

      const columnGap = 12;
      const infoColumnWidth = (contentWidth - columnGap) / 2;

      const measureInfoRow = (
        row: { label: string; value?: string },
        columnWidth: number
      ) => {
        const labelText = `${row.label} : `;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(defaultFontSize);
        const labelWidth = pdf.getTextWidth(labelText);
        const valueText = row.value?.trim() ? row.value : 'N/A';
        const availableWidth = Math.max(columnWidth - labelWidth - 2, 20);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(defaultFontSize);
        const lines = pdf.splitTextToSize(valueText, availableWidth);
        const height = Math.max(lineHeight, lines.length * lineHeight);
        return { labelText, labelWidth, lines, height };
      };

      const renderInfoRow = (
        columnX: number,
        metrics: ReturnType<typeof measureInfoRow>,
        rowTop: number
      ) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(defaultFontSize);
        pdf.text(metrics.labelText, columnX, rowTop + lineHeight);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(defaultFontSize);
        metrics.lines.forEach((line, idx) => {
          const lineY = rowTop + lineHeight + idx * lineHeight;
          pdf.text(line, columnX + metrics.labelWidth + 1, lineY);
        });
      };

      const renderInfoGrid = () => {
        const totalRows = Math.max(leftColumnRows.length, rightColumnRows.length);
        for (let i = 0; i < totalRows; i++) {
          const leftRow = leftColumnRows[i];
          const rightRow = rightColumnRows[i];
          const leftMetrics = leftRow ? measureInfoRow(leftRow, infoColumnWidth) : null;
          const rightMetrics = rightRow ? measureInfoRow(rightRow, infoColumnWidth) : null;
          const rowHeight = Math.max(leftMetrics?.height || 0, rightMetrics?.height || 0, lineHeight);
          ensureSpace(rowHeight + 2);
          if (leftMetrics) {
            renderInfoRow(contentLeft, leftMetrics, cursorY);
          }
          if (rightMetrics) {
            renderInfoRow(contentLeft + infoColumnWidth + columnGap, rightMetrics, cursorY);
          }
          cursorY += rowHeight + 2;
        }
        cursorY += 4;
      };

      renderInfoGrid();

      addSectionBlock(
        'Descriptif des activités de recherche du laboratoire :',
        previewData.description || 'No description provided'
      );

      addTeamsSection();
      addKeywords();

      const sanitizedName = (previewData.name?.trim() || 'laboratoire')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'laboratoire';

      pdf.save(`${sanitizedName}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('La generation du PDF a echoue. Veuillez reessayer.');
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
