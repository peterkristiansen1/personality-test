import styles from "./page.module.css";
import { getItems } from "@alheimsins/b5-johnson-120-ipip-neo-pi-r";

interface Choice {
  text: string;
  score: number;
  color: number;
}

interface Item {
  id: string;
  text: string;
  keyed: string;
  domain: string;
  facet: number;
  num: number;
  choices: Choice[];
}

export const extraversionDomain = "E";

export default function Home() {
  const items: Item[] = getItems()
    .filter((item) => item.domain === extraversionDomain)
    .slice(0, 2);
  const getImageUrl = (query: string) =>
    `https://source.unsplash.com/random?${query.replace(/\s/g, "-")}`;
  const scoreSymbols = ["👎👎", "👎", "👎👍", "👍", "👍👍"];
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Big Five Test</h1>
        <p className={styles.scrollText}>Make a choice and scroll right!</p>
      </header>
      <form action="/result" method="get" className={styles.form}>
        {items.map((item) => (
          <fieldset key={item.id} className={styles.question}>
            <div className={styles.gridContainer}>
              <legend>
                <span className={styles.number}>{item.num}</span>
                <span className={styles.text}>{item.text}</span>
              </legend>
              <img
                src={getImageUrl(item.text)}
                className={styles.image}
                loading={item.num < 1 ? "eager" : "lazy"}
                alt=""
              />
              {item.choices.map((choice) => (
                <div key={choice.score} className={styles.choice}>
                  {/* TODO: Make input required */}
                  <input
                    type="radio"
                    id={`${item.num}-${choice.score}`}
                    name={item.facet}
                    value={choice.score}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`${item.num}-${choice.score}`}
                    className={styles.choiceLabel}
                  >
                    <span className={styles.scoreSymbols}>
                      {scoreSymbols[choice.score - 1]}
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
