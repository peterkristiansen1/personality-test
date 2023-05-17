import { extraversionDomain } from "../page";
import type { Domain } from "../page";
import calculateScore from "@alheimsins/bigfive-calculate-score";
import getResult from "@alheimsins/b5-result-text";
import styles from "./page.module.css";
import Link from "next/link";

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
    <main className={styles.main}>
      <h1>{testResults.title}</h1>
      <section>
        <h2>Introvert or extrovert?</h2>
        <p dangerouslySetInnerHTML={{ __html: testResults.description }} />
        <div className={styles.scoreWrapper}>
          Your overall score: {testResults.score} {testResults.scoreText}
        </div>
        <p>
          <strong dangerouslySetInnerHTML={{ __html: testResults.text }} />
        </p>
      </section>
      <section>
        <h2>Test results</h2>
        <ul>
          {testResults.facets.map((facet: Facet) => (
            <li>
              <h3>{facet.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: facet.text }} />
              <div className={styles.score}>Your score: {facet.score}</div>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <Link href="/">← Take text again</Link>
      </footer>
    </main>
  );
}
