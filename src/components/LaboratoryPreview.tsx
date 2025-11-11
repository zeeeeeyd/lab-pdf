import { FileDown, X } from 'lucide-react';

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

interface LaboratoryPreviewProps {
  data: LaboratoryData;
  onClose: () => void;
  onDownload: () => Promise<void>;
}

interface FacultyColorTheme {
  primary: string;
  light: string;
  text: string;
  fullName: string;
  abbr: string;
}

const FACULTY_COLORS: Record<string, FacultyColorTheme> = {
  FSNV: {
    primary: '#0D9488',
    light: '#CCFBF1',
    text: '#115E59',
    fullName: 'Faculte des Sciences de la Nature et de la Vie',
    abbr: 'FSNV'
  },
  FST: {
    primary: '#EA580C',
    light: '#FFEDD5',
    text: '#9A3412',
    fullName: 'Faculte des Sciences et Technologies',
    abbr: 'FST'
  },
  FMED: {
    primary: '#2563EB',
    light: '#DBEAFE',
    text: '#1D4ED8',
    fullName: 'Faculte de Medecine',
    abbr: 'FMED'
  },
  IESP: {
    primary: '#CA8A04',
    light: '#FEF3C7',
    text: '#92400E',
    fullName: 'Institut d\'Education Physique et Sportive',
    abbr: 'IESP'
  },
  FSESCSG: {
    primary: '#5B21B6',
    light: '#EDE9FE',
    text: '#4C1D95',
    fullName: 'Faculte des Sciences Economiques Commerciales et des Sciences de Gestion',
    abbr: 'FSESCSG'
  },
  FSS: {
    primary: '#0F172A',
    light: '#E2E8F0',
    text: '#1F2937',
    fullName: 'Faculte des Sciences Sociales',
    abbr: 'FSS'
  },
  FLAA: {
    primary: '#BE123C',
    light: '#FFE4E6',
    text: '#9F1239',
    fullName: 'Faculte de Litterature Arabe et des Arts',
    abbr: 'FLAA'
  },
  FDSP: {
    primary: '#9333EA',
    light: '#F3E8FF',
    text: '#7E22CE',
    fullName: 'Faculte de Droit et de Science Politique',
    abbr: 'FDSP'
  },
  FLE: {
    primary: '#16A34A',
    light: '#DCFCE7',
    text: '#166534',
    fullName: 'Faculte des Langues Etrangeres',
    abbr: 'FLE'
  },
  FSEI: {
    primary: '#DC2626',
    light: '#FEE2E2',
    text: '#991B1B',
    fullName: 'Faculte des Sciences Exactes et Informatique',
    abbr: 'FSEI'
  }
};

const FACULTY_ALIASES: Record<string, keyof typeof FACULTY_COLORS> = {
  MEDECINE: 'FMED'
};

const LANDMARK_VECTORS = [
  { src: '/landmarks/landmark-tower.png', baseOffset: 0, opacity: 0.35 },
  { src: '/landmarks/landmark-building.png', baseOffset: 90, opacity: 0.45 },
  { src: '/landmarks/landmark-gate.png', baseOffset: 180, opacity: 0.55 }
] as const;

const getFacultyColors = (faculty: string): FacultyColorTheme => {
  const normalized = FACULTY_ALIASES[faculty] || faculty;
  return FACULTY_COLORS[normalized] || FACULTY_COLORS.FSEI;
};

const UNIVERSITY_LOGO = '/universite-abdelhamid-logo.png';

export default function LaboratoryPreview({ data, onClose, onDownload }: LaboratoryPreviewProps) {
  const facultyColors = getFacultyColors(data.faculty);
  const isArabic = data.language === 'ar';
  const languageLabel = isArabic ? 'Arabe' : 'Francais';
  const documentDirection = isArabic ? 'rtl' : 'ltr';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Laboratory Document Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={() => { void onDownload(); }}
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

        <div className="p-8">
            <div
              id="laboratory-document"
              className="bg-white shadow-lg mx-auto relative"
              style={{
                width: '210mm',
                height: '297mm',
                padding: '0',
                fontSize: '14px',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: '#ffffff',
                overflow: 'hidden',
                direction: documentDirection
              }}
            >
            <div style={{
              position: 'absolute',
              top: 0,
              width: '80px',
              height: '100%',
              backgroundColor: facultyColors.primary,
              ...(isArabic ? { right: 0 } : { left: 0 })
            }}>
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '60px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 'bold',
                color: facultyColors.primary
              }}>
                {facultyColors.abbr}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                pointerEvents: 'none',
                width: '70px',
                ...(isArabic ? { right: '5px' } : { left: '5px' })
              }}>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              top: '120px',
              bottom: '20px',
              width: '2px',
              backgroundColor: facultyColors.primary,
              ...(isArabic ? { right: '40px' } : { left: '40px' })
            }} />

            <div style={{
              marginInlineStart: '95px',
              paddingTop: '25px',
              paddingBottom: '25px',
              paddingInlineStart: '15px',
              paddingInlineEnd: '25px',
              textAlign: isArabic ? 'right' : 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '10px'
              }}>
                <div style={{
                  fontSize: '10px',
                  color: facultyColors.text,
                  fontWeight: 600,
                  lineHeight: 1.4
                }}>
                  {facultyColors.fullName}
                </div>
                <img
                  src={UNIVERSITY_LOGO}
                  alt="Université Abdelhamid Ibn Badis"
                  crossOrigin="anonymous"
                  style={{
                    height: '55px',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>

              <h1 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>
                {data.name || 'N/A'}
              </h1>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '9px',
                color: facultyColors.primary,
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: '999px',
                backgroundColor: facultyColors.light,
                marginBottom: '10px'
              }}>
                Langue : {languageLabel}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                fontSize: '9px',
                marginBottom: '10px'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Arrêté de création :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.arreteCreation || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Code :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.code || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Domiciliation :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.domiciliation || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Agence thématique de rattachement :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.agenceThematique || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Directeur :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.director || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>E-mail :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.email || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Date de nomination du directeur :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.directorAppointmentDate || 'N/A'}</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Tel :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.phone || 'N/A'}</span>
                </div>
              </div>

              <div style={{
                marginTop: '12px',
                padding: '10px',
                backgroundColor: facultyColors.light,
                borderLeft: `3px solid ${facultyColors.primary}`,
                borderRadius: '2px'
              }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: facultyColors.primary,
                  padding: '4px 8px',
                  marginBottom: '8px',
                  borderRadius: '2px',
                  display: 'inline-block'
                }}>
                  Descriptif des activités de recherche du laboratoire :
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#1F2937',
                  lineHeight: '1.5',
                  textAlign: 'justify'
                }}>
                  {data.description || 'No description provided'}
                </div>
              </div>

              <div style={{
                marginTop: '12px',
                padding: '10px',
                backgroundColor: facultyColors.light,
                borderLeft: `3px solid ${facultyColors.primary}`,
                borderRadius: '2px'
              }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: facultyColors.primary,
                  padding: '4px 8px',
                  marginBottom: '8px',
                  borderRadius: '2px',
                  display: 'inline-block'
                }}>
                  Organisation des équipes de recherche :
                </div>
                <div style={{ fontSize: '9px' }}>
                  {data.equipes && data.equipes.length > 0 ? (
                    data.equipes.map((equipe, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{
                          fontWeight: 'bold',
                          color: '#1F2937',
                          marginBottom: '2px'
                        }}>
                          Équipe {index + 1} : {equipe.name || `Équipe ${index + 1}`}
                        </div>
                        <div style={{
                          color: '#4B5563',
                          marginInlineStart: '8px',
                          lineHeight: '1.4',
                          textAlign: 'justify'
                        }}>
                          <span style={{ fontWeight: 'bold' }}>Chef d'équipe :</span>
                          <span style={{ marginInlineStart: '4px' }}>{equipe.leader || 'Non renseigné'}</span>
                          {equipe.description && (
                            <div style={{ marginTop: '3px' }}>
                              {equipe.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#6B7280', fontSize: '9px' }}>
                      Aucune équipe renseignée
                    </div>
                  )}
                </div>
              </div>

              {data.keywords && (
                <div style={{
                  marginTop: '12px',
                  fontSize: '9px'
                }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Mots-clés :</span>
                  <span style={{ marginInlineStart: '4px', color: '#6B7280' }}>{data.keywords}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
