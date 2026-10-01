/**
 * UIAA grade helpers: validation, numeric sort order and colour buckets.
 * Other systems (SAC, Alpine) can be added alongside UIAA later.
 */

export const GRADE_SYSTEMS = ['UIAA'] as const;
export type GradeSystem = (typeof GRADE_SYSTEMS)[number];

const UIAA_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as const;

/** Roman numeral I–XII with an optional "+" or "-", e.g. "IV+", "VI-". */
export const UIAA_GRADE_PATTERN = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)([+-])?$/;

export interface ParsedGrade {
  /** 1–12 */
  level: number;
  /** -1 for "-", 0 for none, 1 for "+" */
  modifier: -1 | 0 | 1;
}

export function parseUiaaGrade(grade: string): ParsedGrade {
  const match = UIAA_GRADE_PATTERN.exec(grade);
  if (!match) {
    throw new Error(`Invalid UIAA grade: "${grade}"`);
  }
  const [, numeral, sign] = match;
  const level = UIAA_NUMERALS.indexOf(numeral as (typeof UIAA_NUMERALS)[number]) + 1;
  const modifier = sign === '+' ? 1 : sign === '-' ? -1 : 0;
  return { level, modifier };
}

/** Numeric value for sorting: IV- < IV < IV+ < V- ... */
export function gradeSortValue(grade: string): number {
  const { level, modifier } = parseUiaaGrade(grade);
  return level * 3 + modifier;
}

export function compareGrades(a: string, b: string): number {
  return gradeSortValue(a) - gradeSortValue(b);
}

export interface GradeBucket {
  /** Stable id, used in data attributes and URL query params. */
  id: 'i-iii' | 'iv-v' | 'vi-vii' | 'viii-plus';
  label: string;
  minLevel: number;
  maxLevel: number;
  /** Tailwind classes for DifficultyBadge. */
  badgeClass: string;
}

export const GRADE_BUCKETS: readonly GradeBucket[] = [
  {
    id: 'i-iii',
    label: 'I–III',
    minLevel: 1,
    maxLevel: 3,
    badgeClass: 'bg-neutral-100 text-neutral-900 ring-1 ring-inset ring-neutral-300',
  },
  {
    id: 'iv-v',
    label: 'IV–V',
    minLevel: 4,
    maxLevel: 5,
    badgeClass: 'bg-neutral-700 text-white',
  },
  {
    id: 'vi-vii',
    label: 'VI–VII',
    minLevel: 6,
    maxLevel: 7,
    badgeClass: 'bg-accent text-white',
  },
  {
    id: 'viii-plus',
    label: 'VIII+',
    minLevel: 8,
    maxLevel: 12,
    badgeClass: 'bg-neutral-950 text-white ring-2 ring-inset ring-accent',
  },
];

export function getGradeBucket(grade: string): GradeBucket {
  const { level } = parseUiaaGrade(grade);
  const bucket = GRADE_BUCKETS.find((b) => level >= b.minLevel && level <= b.maxLevel);
  if (!bucket) {
    throw new Error(`No grade bucket for "${grade}"`);
  }
  return bucket;
}
