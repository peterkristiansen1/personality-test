import styles from "./page.module.css";
import { getItems } from "@alheimsins/b5-johnson-120-ipip-neo-pi-r";
import Image from "next/image";
import { Domain, Item } from "../types";

export default function Home() {
  const items: Item[] = getItems().filter(
    (item: Item) => item.domain === Domain.E
  );
  const getImageUrl = (query: string) =>
    `https://source.unsplash.com/random?${query.replace(/\s/g, "-")}`;
  const scoreSymbols = {
    "Very Inaccurate": "👎👎",
    "Moderately Inaccurate": "👎",
    "Neither Accurate Nor Inaccurate": "👎👍",
    "Moderately Accurate": "👍",
    "Very Accurate": "👍👍",
  };
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Introvert / Extrovert Test</h1>
      </header>
      <form action="/result" method="get" className={styles.form}>
        {items.map((item, index) => (
          <fieldset key={item.id} className={styles.question}>
            <div className={styles.gridContainer}>
              <legend>
                <span className={styles.number}>{index + 1}</span>
                <div className={styles.textWrapper}>
                  <p className={styles.text}>{item.text}</p>
                  <p className={styles.scrollMessage}>Scroll right →</p>
                </div>
              </legend>
              <Image
                src={getImageUrl(item.text)}
                className={styles.image}
                loading={item.num < 1 ? "eager" : "lazy"}
                alt=""
                fill={true}
              />
              {item.choices.map((choice) => (
                <div key={choice.score} className={styles.choice}>
                  <input
                    type="radio"
                    required
                    id={`${item.num}-${choice.score}`}
                    name={item.facet.toString()}
                    value={choice.score}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`${item.num}-${choice.score}`}
                    className={styles.choiceLabel}
                  >
                    <span className={styles.scoreSymbols}>
                      {scoreSymbols[choice.text]}
                    </span>
                    <span className={styles.choiceText}>{choice.text}</span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
        <div className={styles.submitWrapper}>
          <button type="submit" className={styles.submitButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className={styles.crownIcon}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
            </svg>
            <span>You made it!</span>
            <span>Tap to show result</span>
          </button>
        </div>
      </form>
    </main>
  );
}
