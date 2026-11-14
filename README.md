# Nearly

An AI companion in the spirit of *Her*: warm, curious, and always aware that it is an AI.

## Usage
1. Open `index.html` in your browser (or host it statically).
2. On first launch, pick **Female** or **Male**.
3. Fill in **Settings**:
   - **Proxy URL** — OpenAI-compatible endpoint, e.g. `https://your-proxy/api/v1` (`/chat/completions` is appended automatically)
   - **API key** — your OpenRouter key (leave empty if your proxy adds the key itself)
   - **Model** — e.g. `anthropic/claude-sonnet-4.5`
   - **Personality** — optional; sent after the fixed base prompt
4. Talk.

The fixed base prompt (`BASE_PROMPT` in `index.html`) is sent with every request and makes sure the AI knows it is an AI and builds a unique personality of its own. The AI picks its own name, which appears in the header. "Clear conversation" also clears the name, so a new personality starts fresh. Gender can be changed later in Settings.

Settings and conversation are stored locally in the browser (`localStorage`). The full conversation is sent as context, so very long chats will eventually hit the model's context limit.

## iOS app
The `ios/` folder is a native Xcode project (Capacitor) that wraps `index.html`. Requires a Mac with Xcode.

```
npm install
npm run ios        # copies index.html into the app, syncs, opens Xcode
```
In Xcode: select the **App** target → *Signing & Capabilities* → pick your Team (a free Apple ID works for your own iPhone; apps signed that way expire after 7 days). Then pick your iPhone and press Run.

After changing `index.html`, run `npm run ios` again.

### Without a Mac (sideloading)
Every push builds an unsigned `Nearly.ipa` via GitHub Actions (`.github/workflows/ios.yml`).
Download it from the **latest-build** release (or the workflow run's artifacts) and install it with AltStore, SideStore or Sideloadly — they sign it with your own Apple ID.

## Your own proxy (optional)
```
OPENROUTER_API_KEY=sk-or-... node proxy.js
```
Proxy URL: `http://localhost:8787/api/v1`. Keeps your key out of the browser.
