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
}

interface LaboratoryPreviewProps {
  data: LaboratoryData;
  onClose: () => void;
  onDownload: () => Promise<void>;
}

const getFacultyColors = (faculty: string) => {
  const colors: { [key: string]: { primary: string; light: string; text: string; fullName: string; abbr: string } } = {
    'FSEI': {
      primary: '#DC2626',
      light: '#FEE2E2',
      text: '#991B1B',
      fullName: 'Faculty of Exact Sciences and Computer Science',
      abbr: 'FSEI'
    },
    'FLE': {
      primary: '#16A34A',
      light: '#DCFCE7',
      text: '#166534',
      fullName: 'Faculty of Letters and Languages',
      abbr: 'FLE'
    },
    'MEDECINE': {
      primary: '#2563EB',
      light: '#DBEAFE',
      text: '#1E40AF',
      fullName: 'Faculty of Medicine',
      abbr: 'MEDECINE'
    },
    'FST': {
      primary: '#EA580C',
      light: '#FFEDD5',
      text: '#C2410C',
      fullName: 'Faculty of Science and Technology',
      abbr: 'FST'
    },
    'FDSP': {
      primary: '#9333EA',
      light: '#F3E8FF',
      text: '#6B21A8',
      fullName: 'Faculty of Law and Political Science',
      abbr: 'FDSP'
    }
  };

  return colors[faculty] || colors['FSEI'];
};

const UNIVERSITY_LOGO = '/universite-abdelhamid-logo.png';

export default function LaboratoryPreview({ data, onClose, onDownload }: LaboratoryPreviewProps) {
  const facultyColors = getFacultyColors(data.faculty);

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
                overflow: 'hidden'
              }}
            >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '100%',
              backgroundColor: facultyColors.primary
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
            </div>

            <div style={{
              position: 'absolute',
              top: '120px',
              left: '40px',
              bottom: '20px',
              width: '2px',
              backgroundColor: facultyColors.primary
            }} />

            <div style={{ marginLeft: '95px', padding: '25px 25px 25px 15px' }}>
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
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                fontSize: '9px',
                marginBottom: '10px'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Arrêté de création :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.arreteCreation || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Code :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.code || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Domiciliation :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.domiciliation || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Agence thématique de rattachement :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.agenceThematique || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Directeur :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.director || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>E-mail :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>N/A</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>Tel :</span>
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>N/A</span>
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
                          marginLeft: '8px',
                          lineHeight: '1.4',
                          textAlign: 'justify'
                        }}>
                          <span style={{ fontWeight: 'bold' }}>Chef d'équipe :</span>
                          <span style={{ marginLeft: '4px' }}>{equipe.leader || 'Non renseigné'}</span>
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
                  <span style={{ marginLeft: '4px', color: '#6B7280' }}>{data.keywords}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
