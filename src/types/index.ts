export type NewsLabel = 'REAL' | 'FAKE';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface DatasetItem {
  id: string;
  headline: string;
  label: NewsLabel;
  category: 'Politics' | 'Science & Health' | 'Government & Policy' | 'Technology' | 'World' | 'Entertainment & Viral';
  source: string;
  split: 'train' | 'test';
}

export interface SpecialCharacterAnalysis {
  totalCount: number;
  density: number; // percentage (0 to 100)
  isSuspicious: boolean;
  suspicionReason?: string;
  foundCharacters: { char: string; count: number }[];
  consecutivePunctuationFound: boolean;
  featureWeightAdjustment: number; // log-odds impact in ML model
}

export interface PreprocessingStepResult {
  rawText: string;
  lowercaseText: string;
  cleanedText: string;
  tokens: string[];
  tokensWithoutStopwords: string[];
  stemmedTokens: string[];
  removedStopwords: string[];
  specialCharAnalysis: SpecialCharacterAnalysis;
}

export interface TfidfFeatureItem {
  term: string;
  stem: string;
  rawFrequency: number;
  termFrequency: number; // TF
  docFrequency: number;  // DF
  inverseDocFrequency: number; // IDF
  tfidfWeight: number;   // TF * IDF (normalized)
  indicates: 'REAL' | 'FAKE' | 'NEUTRAL';
  logOddsRatio: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainCount: number;
  testCount: number;
  vocabularySize: number;
  confusionMatrix: {
    truePositive: number;  // Real correctly predicted Real
    falsePositive: number; // Fake incorrectly predicted Real
    trueNegative: number;  // Fake correctly predicted Fake
    falseNegative: number; // Real incorrectly predicted Fake
  };
}

export interface PredictionResult {
  id: string;
  headline: string;
  prediction: 'REAL NEWS' | 'FAKE NEWS';
  rawLabel: NewsLabel;
  confidence: number; // 0.0 to 1.0
  probabilities: {
    real: number;
    fake: number;
  };
  modelType: 'Multinomial Naive Bayes' | 'Logistic Regression';
  preprocessing: PreprocessingStepResult;
  tfidfFeatures: TfidfFeatureItem[];
  specialCharAnalysis: SpecialCharacterAnalysis;
  topIndicators: {
    term: string;
    weight: number;
    favors: NewsLabel;
  }[];
  timestamp: string;
}

export interface DetectionHistoryItem {
  id: string;
  userId: string;
  headline: string;
  prediction: 'REAL NEWS' | 'FAKE NEWS';
  confidence: number;
  modelType: string;
  timestamp: string;
}
