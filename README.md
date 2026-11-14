# Nearly

An AI companion in the spirit of *Her*: warm, curious, and always aware that it is an AI.

## Usage
1. Open `index.html` in your browser (or host it statically).
2. On first launch, pick **Female** or **Male**.
3. Fill in **Settings** (full-screen page):
   - **Proxy** — chat endpoint: URL (OpenAI-compatible, `/chat/completions` appended automatically), API key, model
   - **Image proxy** — URL, API key, model. Only used when you explicitly ask for an image. Works with OpenRouter image models (chat endpoint with `modalities`) and `/images/generations` endpoints
   - **Prompt** — gender, your full system prompt, optional personality notes
   - **Customization** — Original / Light / Dark (OLED) mode (keyboard + status bar follow it in the iOS app), accent color, 20 fonts for AI and your messages, size, boldness, line height, letter spacing, italic, underline, glow, solid or gradient text color with presets
4. Talk.

You paste your own **System prompt** in Settings; it is sent with every request, followed by a short identity block (gender + name handling) and your optional Personality notes. The AI picks its own name, which appears in the header. "Clear conversation" also clears the name, so a new personality starts fresh. Gender can be changed later in Settings.

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
