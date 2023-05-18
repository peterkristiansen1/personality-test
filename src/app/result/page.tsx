"use client";

import { Domain, TestResult, Facet } from "../../types";
import calculateScore from "@alheimsins/bigfive-calculate-score";
import getResult from "@alheimsins/b5-result-text";
import styles from "./page.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();
  const result = {
    answers: [...searchParams.entries()].map(([facet, score]) => ({
      domain: Domain.E,
      facet,
      score,
    })),
  };
  const scores = calculateScore(result);
  const testResults = getResult({ scores, lang: "en" }).find(
    (testResult: TestResult) => testResult.domain === Domain.E
  );

  if (!testResults) {
    return null;
  }

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
            <li key={facet.count}>
              <h3>{facet.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: facet.text }} />
              <div className={styles.score}>Your score: {facet.score} / 5</div>
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
