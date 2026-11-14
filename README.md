# Nearly

Een AI-gezelschap in de geest van *Her*: warm, nieuwsgierig, en zich er altijd van bewust dat ze een AI is.

## Gebruik
1. Open `index.html` in je browser (of host 'm statisch).
2. Vul in bij **Instellingen**:
   - **Proxy URL** — OpenAI-compatibel endpoint, bv. `https://jouw-proxy/api/v1` (`/chat/completions` wordt zelf toegevoegd)
   - **API key** — je OpenRouter key (leeg laten als je proxy de key zelf toevoegt)
   - **Model** — bv. `anthropic/claude-sonnet-4.5`
   - **Persoonlijkheid** — optioneel; wordt ná de vaste basisprompt meegestuurd
3. Praten.

De vaste basisprompt (`BASE_PROMPT` in `index.html`) gaat bij elk verzoek mee en legt vast dat de AI weet dat ze een AI is. De persoonlijkheid kan die kern niet overschrijven. Noem een naam ("Je heet Ivy") en die verschijnt bovenin.

Instellingen en gesprek blijven lokaal in de browser (`localStorage`).

## Eigen proxy (optioneel)
```
OPENROUTER_API_KEY=sk-or-... node proxy.js
```
Proxy URL: `http://localhost:8787/api/v1`. Zo blijft je key uit de browser.
