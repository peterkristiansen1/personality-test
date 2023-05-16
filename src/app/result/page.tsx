import { extraversionDomain } from "../page";
import calculateScore from "@alheimsins/bigfive-calculate-score";
import getResult from "@alheimsins/b5-result-text";

interface ResultProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface Facet {
  facet: number;
  title: string;
  text: string;
  score: number;
  count: number;
  scoreText: string;
}

enum Domain {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

interface TestResult {
  domain: Domain;
  title: string;
  shortDescription: string;
  description: string;
  scoreText: string;
  count: number;
  score: number;
  facets: Facet[];
}

export default function Result({ searchParams }: ResultProps) {
  const result = {
    answers: Object.entries(searchParams).map(([facet, score]) => ({
      domain: extraversionDomain,
      facet,
      score,
    })),
  };
  const scores = calculateScore(result);
  const testResults = getResult({ scores, lang: "en" }).find(
    (testResult: TestResult) => testResult.domain === extraversionDomain
  );

  return (
    <main>
      <h1>{testResults.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: testResults.description }} />
      <div>
        Your score: {testResults.score} {testResults.scoreText}
      </div>
      <p dangerouslySetInnerHTML={{ __html: testResults.text }} />
      <section>
        <h2>Test results</h2>
        <ul>
          {testResults.facets.map((facet: Facet) => (
            <li>
              <h3>{facet.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: facet.text }} />
              <div>Your score: {facet.score}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
