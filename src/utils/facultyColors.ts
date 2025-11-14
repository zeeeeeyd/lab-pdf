export interface FacultyColorTheme {
  primary: string;
  light: string;
  text: string;
  fullName: string;
  abbr: string;
}

export const FACULTY_COLORS: Record<string, FacultyColorTheme> = {
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

export const getFacultyColors = (faculty: string): FacultyColorTheme => {
  const normalized = FACULTY_ALIASES[faculty] || faculty;
  return FACULTY_COLORS[normalized] || FACULTY_COLORS.FSEI;
};
