export const HEIGHT_OPTIONS = [
  '4\'10"', '4\'11"', '5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"',
  '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"',
  '6\'2"', '6\'3"', '6\'4"'
];

export const WAIST_OPTIONS = Array.from({ length: 29 }, (_, i) => `${24 + i}"`);

export const HIP_OPTIONS = Array.from({ length: 29 }, (_, i) => `${32 + i}"`);

export const BRANDS = ['Levi\'s', 'Wrangler', 'Lee', 'Zara', 'Uniqlo'];

export const WAIST_FIT_OPTIONS = ['Snug', 'Slightly Relaxed', 'Relaxed'];
export const WAIST_FIT_VALUES = ['snug', 'slightly-relaxed', 'relaxed'];

export const RISE_OPTIONS = ['High Rise', 'Mid Rise', 'Low Rise'];
export const RISE_VALUES = ['high-rise', 'mid-rise', 'low-rise'];

export const THIGH_OPTIONS = ['Fitted', 'Relaxed', 'Loose'];
export const THIGH_VALUES = ['fitted', 'relaxed', 'loose'];

export const ISSUE_OPTIONS = [
  'Waist Gap',
  'Hip Tightness',
  'Wrong Length',
  'Thigh Fit',
  'Rise',
  'Other'
];

export const QUESTIONS = [
  {
    id: 'height',
    label: 'What\'s your height?',
    voiceLabel: 'What\'s your height?',
    type: 'dropdown',
    options: HEIGHT_OPTIONS,
  },
  {
    id: 'weight',
    label: 'What\'s your weight? (optional)',
    voiceLabel: 'What\'s your weight? You can skip this.',
    type: 'input',
    optional: true,
  },
  {
    id: 'waist',
    label: 'What\'s your waist size?',
    voiceLabel: 'What\'s your waist size?',
    type: 'dropdown',
    options: WAIST_OPTIONS,
  },
  {
    id: 'hip',
    label: 'What\'s your hip size?',
    voiceLabel: 'What\'s your hip size?',
    type: 'dropdown',
    options: HIP_OPTIONS,
  },
  {
    id: 'waistFit',
    label: 'How do you prefer your waist fit?',
    voiceLabel: 'How do you prefer your waist fit? Snug, slightly relaxed, or relaxed?',
    type: 'radio',
    options: WAIST_FIT_OPTIONS,
  },
  {
    id: 'rise',
    label: 'What\'s your preferred rise?',
    voiceLabel: 'What\'s your preferred rise? High, mid, or low?',
    type: 'radio',
    options: RISE_OPTIONS,
  },
  {
    id: 'thigh',
    label: 'How do you like your thigh fit?',
    voiceLabel: 'How do you like your thigh fit? Fitted, relaxed, or loose?',
    type: 'radio',
    options: THIGH_OPTIONS,
  },
  {
    id: 'brands',
    label: 'Which denim brands have you bought before?',
    voiceLabel: 'Which denim brands have you bought before? You can mention multiple brands.',
    type: 'multi-select',
    options: BRANDS,
  },
  {
    id: 'brandSizes',
    label: 'What sizes do you usually buy?',
    voiceLabel: 'What sizes do you usually buy?',
    type: 'dependent',
    depends: 'brands',
  },
  {
    id: 'biggestIssue',
    label: 'What\'s your biggest issue with jeans?',
    voiceLabel: 'What\'s your biggest issue with jeans?',
    type: 'radio',
    options: ISSUE_OPTIONS,
  },
];
