import { PreprocessingStepResult, SpecialCharacterAnalysis } from '../types';

/**
 * Textual pattern analysis: detects special character frequencies, densities,
 * and suspicious patterns (e.g. excessive exclamation marks, dollar signs, symbols).
 * Used as an auxiliary classification feature.
 */
export function analyzeSpecialCharacters(rawText: string): SpecialCharacterAnalysis {
  const trimmed = rawText.trim();
  const totalLength = trimmed.length;

  if (totalLength === 0) {
    return {
      totalCount: 0,
      density: 0,
      isSuspicious: false,
      foundCharacters: [],
      consecutivePunctuationFound: false,
      featureWeightAdjustment: 0
    };
  }

  // Count non-alphanumeric and non-space characters
  const charCounts: Record<string, number> = {};
  let totalCount = 0;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    // Special characters: neither alphanumeric nor whitespace
    if (!/[\w\s]/.test(char)) {
      charCounts[char] = (charCounts[char] || 0) + 1;
      totalCount++;
    }
  }

  const density = Math.round((totalCount / totalLength) * 1000) / 10; // e.g. 8.4%

  // Check for sensational consecutive punctuation: !!, ???, $$$, etc.
  const consecutivePunctuationFound = /[!?$*#%]{2,}/.test(trimmed);

  // Unusually high special character frequency criteria:
  // - High density (> 6.5%) with at least 3 special characters, OR
  // - Multiple exclamation marks or sensational symbols (e.g. !! or $$$ or ???), OR
  // - Total special characters >= 5 in a short-medium headline
  let isSuspicious = false;
  let suspicionReason: string | undefined;

  if (consecutivePunctuationFound) {
    isSuspicious = true;
    suspicionReason = 'Contains consecutive sensational punctuation (e.g. "!!", "??", or "$$$") commonly associated with viral clickbait.';
  } else if (density >= 6.5 && totalCount >= 3) {
    isSuspicious = true;
    suspicionReason = `Unusually high special character density (${density}% of headline) exceeding standard journalistic headline thresholds.`;
  } else if (totalCount >= 6) {
    isSuspicious = true;
    suspicionReason = `High volume of special characters (${totalCount} symbols) detected.`;
  }

  // Feature weight contribution (acts as an auxiliary log-odds shift, never an overriding veto)
  // Bounded moderate shift: +0.35 to +0.70 log-odds if suspicious, slightly negative (-0.05) if clean/normal
  let featureWeightAdjustment = 0;
  if (isSuspicious) {
    featureWeightAdjustment = Math.min(0.75, 0.35 + (density / 100) * 2.0);
  } else if (density <= 2.0 && totalCount <= 2) {
    featureWeightAdjustment = -0.05; // Normal journalistic punctuation (e.g. single comma or period)
  }

  const foundCharacters = Object.entries(charCounts)
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCount,
    density,
    isSuspicious,
    suspicionReason,
    foundCharacters,
    consecutivePunctuationFound,
    featureWeightAdjustment: Math.round(featureWeightAdjustment * 100) / 100
  };
}

/**
 * Standard English Stopwords list for NLP text processing
 */
export const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have',
  'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into',
  'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my',
  'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

/**
 * Porter Stemmer implementation for English word stemming
 */
export function stemWord(word: string): string {
  if (word.length <= 2) return word;

  let w = word.toLowerCase();

  // Step 1a
  if (w.endsWith('sses')) {
    w = w.slice(0, -2);
  } else if (w.endsWith('ies')) {
    w = w.slice(0, -2);
  } else if (!w.endsWith('ss') && w.endsWith('s')) {
    w = w.slice(0, -1);
  }

  // Step 1b
  let step1bSuccess = false;
  if (w.endsWith('eed')) {
    const stem = w.slice(0, -3);
    if (countConsonantVowelTransitions(stem) > 0) {
      w = stem + 'ee';
    }
  } else if (w.endsWith('ed')) {
    const stem = w.slice(0, -2);
    if (containsVowel(stem)) {
      w = stem;
      step1bSuccess = true;
    }
  } else if (w.endsWith('ing')) {
    const stem = w.slice(0, -3);
    if (containsVowel(stem)) {
      w = stem;
      step1bSuccess = true;
    }
  }

  if (step1bSuccess) {
    if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) {
      w += 'e';
    } else if (endsInDoubleConsonant(w) && !w.endsWith('l') && !w.endsWith('s') && !w.endsWith('z')) {
      w = w.slice(0, -1);
    } else if (countConsonantVowelTransitions(w) === 1 && endsWithCvc(w)) {
      w += 'e';
    }
  }

  // Step 1c: y -> i if preceded by vowel
  if (w.endsWith('y')) {
    const stem = w.slice(0, -1);
    if (containsVowel(stem)) {
      w = stem + 'i';
    }
  }

  // Step 2: common suffixes
  const step2Replacements: [string, string][] = [
    ['ational', 'ate'],
    ['tional', 'tion'],
    ['enci', 'ence'],
    ['anci', 'ance'],
    ['izer', 'ize'],
    ['abli', 'able'],
    ['alli', 'al'],
    ['entli', 'ent'],
    ['eli', 'e'],
    ['ousli', 'ous'],
    ['ization', 'ize'],
    ['ation', 'ate'],
    ['ator', 'ate'],
    ['alism', 'al'],
    ['iveness', 'ive'],
    ['fulness', 'ful'],
    ['ousness', 'ous'],
    ['aliti', 'al'],
    ['iviti', 'ive'],
    ['biliti', 'ble']
  ];

  for (const [suffix, replacement] of step2Replacements) {
    if (w.endsWith(suffix)) {
      const stem = w.slice(0, -suffix.length);
      if (countConsonantVowelTransitions(stem) > 0) {
        w = stem + replacement;
      }
      break;
    }
  }

  // Step 3
  const step3Replacements: [string, string][] = [
    ['icate', 'ic'],
    ['ative', ''],
    ['alize', 'al'],
    ['iciti', 'ic'],
    ['ical', 'ic'],
    ['ful', ''],
    ['ness', '']
  ];

  for (const [suffix, replacement] of step3Replacements) {
    if (w.endsWith(suffix)) {
      const stem = w.slice(0, -suffix.length);
      if (countConsonantVowelTransitions(stem) > 0) {
        w = stem + replacement;
      }
      break;
    }
  }

  // Step 4: remove large suffixes
  const step4Suffixes = [
    'al', 'ance', 'ence', 'er', 'ic', 'able', 'ible', 'ant', 'ement',
    'ment', 'ent', 'ou', 'ism', 'ate', 'iti', 'ous', 'ive', 'ize'
  ];

  for (const suffix of step4Suffixes) {
    if (w.endsWith(suffix)) {
      const stem = w.slice(0, -suffix.length);
      if (countConsonantVowelTransitions(stem) > 1) {
        w = stem;
      }
      break;
    }
  }

  // Step 5: final e / double l cleanup
  if (w.endsWith('e')) {
    const stem = w.slice(0, -1);
    const m = countConsonantVowelTransitions(stem);
    if (m > 1 || (m === 1 && !endsWithCvc(stem))) {
      w = stem;
    }
  }

  if (w.endsWith('ll') && countConsonantVowelTransitions(w) > 1) {
    w = w.slice(0, -1);
  }

  return w;
}

function isVowel(c: string): boolean {
  return 'aeiou'.includes(c);
}

function containsVowel(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i])) return true;
  }
  return false;
}

function endsInDoubleConsonant(str: string): boolean {
  if (str.length < 2) return false;
  const c1 = str[str.length - 1];
  const c2 = str[str.length - 2];
  return c1 === c2 && !isVowel(c1);
}

function endsWithCvc(str: string): boolean {
  if (str.length < 3) return false;
  const c1 = str[str.length - 1];
  const c2 = str[str.length - 2];
  const c3 = str[str.length - 3];
  return !isVowel(c1) && isVowel(c2) && !isVowel(c3) && !'wxy'.includes(c1);
}

function countConsonantVowelTransitions(str: string): number {
  let m = 0;
  let state = 0; // 0 = start, 1 = vowel sequence, 2 = consonant sequence
  for (let i = 0; i < str.length; i++) {
    const v = isVowel(str[i]);
    if (state === 0) {
      if (v) state = 1;
    } else if (state === 1) {
      if (!v) {
        state = 2;
        m++;
      }
    } else if (state === 2) {
      if (v) {
        state = 1;
      }
    }
  }
  return m;
}

/**
 * FR4: Full text preprocessing pipeline conforming to SRS
 */
export function preprocessText(rawInput: string): PreprocessingStepResult {
  const rawText = rawInput.trim();

  // 1. Lowercase
  const lowercaseText = rawText.toLowerCase();

  // 2. Remove unnecessary characters (URLs, emails, punctuation, digits, symbols)
  // Keeps letters and spaces
  const cleanedText = lowercaseText
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\w\s]|_/g, ' ')
    .replace(/\d+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 3. Tokenize
  const rawTokens = cleanedText.length > 0 ? cleanedText.split(' ').filter(t => t.length > 0) : [];

  // 4. Stop word removal
  const tokensWithoutStopwords: string[] = [];
  const removedStopwords: string[] = [];

  for (const token of rawTokens) {
    if (STOPWORDS.has(token)) {
      removedStopwords.push(token);
    } else if (token.length > 1) {
      tokensWithoutStopwords.push(token);
    }
  }

  // 5. Stemming (Porter Stemmer)
  const stemmedTokens = tokensWithoutStopwords.map(token => stemWord(token));

  // 6. Textual Pattern & Special Character Analysis
  const specialCharAnalysis = analyzeSpecialCharacters(rawText);

  return {
    rawText,
    lowercaseText,
    cleanedText,
    tokens: rawTokens,
    tokensWithoutStopwords,
    stemmedTokens,
    removedStopwords,
    specialCharAnalysis
  };
}
