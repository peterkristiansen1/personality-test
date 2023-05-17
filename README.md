This is a small personality test app which provides a list of questions which
the user must answer. After completing the questions the user will be presented
with a results page, analyzing the answers given.

The questions are based on the "[Big Five personality traits](https://en.wikipedia.org/wiki/Big_Five_personality_traits)", but only has questions related
to [extraversion and
introversion](https://en.wikipedia.org/wiki/Extraversion_and_introversion).

The application uses these libraries under the hood to provide the framework for
questions and answers:

- [@alheimsins/b5-johnson-120-ipip-neo-pi-r](https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r)
- [@alheimsins/b5-result-text](https://github.com/Alheimsins/b5-result-text)
- [@alheimsins/bigfive-calculate-score](https://github.com/Alheimsins/bigfive-calculate-score)

## Getting started with development

First, run the development server:

```bash
npm run dev-start
# or
yarn dev-start
# or
pnpm dev-start
```

Open [http://localhost:8765](http://localhost:8765) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
