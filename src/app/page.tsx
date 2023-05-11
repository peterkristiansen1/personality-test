import styles from './page.module.css'
import { getItems } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r';

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
      <form>
        {items.map((item) => (
          <fieldset key={item.id}>
            <legend>{item.text}</legend>
            {item.choices.map((choice) => (
              <div key={choice.score}>
                <input type="radio" id={`${item.num}-${choice.score}`} name={item.id} value={choice.score} />
                <label htmlFor={`${item.num}-${choice.score}`}>{choice.text}</label>
              </div>
            ))}
          </fieldset>
        ))}

      </form>
    </main>
  )
}
