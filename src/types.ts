export enum Domain {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export interface Facet {
  facet: number;
  title: string;
  text: string;
  score: number;
  count: number;
  scoreText: string;
}

export interface TestResult {
  domain: Domain;
  title: string;
  shortDescription: string;
  description: string;
  scoreText: string;
  count: number;
  score: number;
  facets: Facet[];
}

export interface Choice {
  text: string;
  score: number;
  color: number;
}

export interface Item {
  id: string;
  text: string;
  keyed: string;
  domain: string;
  facet: number;
  num: number;
  choices: Choice[];
}
