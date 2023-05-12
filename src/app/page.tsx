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
      <h1>Big Five Test</h1>
      <form action="/result" method="get" className={styles.form}>
        {items.map((item) => (
          <fieldset key={item.id} className={styles.question}>
            <div className={styles.gridContainer}>
              <legend className={styles.text}>{item.text}</legend>
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
