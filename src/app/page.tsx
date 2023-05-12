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

export default function Home() {
  const items: Item[] = getItems();
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
                src="https://source.unsplash.com/random?people"
                className={styles.image}
              />
              {item.choices.map((choice) => (
                <div key={choice.score} className={styles.choice}>
                  {/* TODO: Make input required */}
                  <input
                    type="radio"
                    id={`${item.num}-${choice.score}`}
                    name={`${item.domain}${item.facet}`}
                    value={choice.score}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`${item.num}-${choice.score}`}
                    className={styles.choiceText}
                  >
                    {choice.text}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
        <div className={styles.submitWrapper}>
          You've reached the end.
          <button type="submit">Show result</button>
        </div>
      </form>
    </main>
  );
}
