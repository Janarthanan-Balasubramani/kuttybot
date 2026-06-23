import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Vite plugins + config are imported statically so the dev server never has to
// load vite.config.js as a module at runtime (under tsx on Windows that path is
// unreliable). Mirrors vite.config.js exactly.
async function getViteConfig() {
  const react = (await import("@vitejs/plugin-react")).default;
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const { createServer: createViteServer } = await import("vite");

  const viteConfig = {
    plugins: [react(), tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };

  return { viteConfig, createViteServer };
}


/**
 * Local Chotu response engine.
 *
 * This is a fully self-contained, rule-based responder so the live sandbox
 * works without any external API key. It understands a handful of common
 * intents (greetings, math, code, recipes, translation, jokes, etc.) and
 * always falls back to a warm, persona-flavoured reply.
 */
function generateChotuReply(
  rawMessage: string,
  history: { role: string; text: string }[]
): string {
  // The sandbox simulates voice notes by prefixing text with this wrapper.
  const message = rawMessage.replace(/^🎤\s*\[Voice Note\]:\s*/i, "").trim();
  const lower = message.toLowerCase();
  const turns = history.filter((h) => h.role === "user").length;

  // --- Identity questions -------------------------------------------------
  if (/\b(who are you|what are you|your name|who made you|who created you|are you (an? )?ai|are you (a )?bot)\b/.test(lower)) {
    return [
      `I'm **Chotu**, Boss! 🙌`,
      ``,
      `Think of me as your dependable pocket assistant living right inside **WhatsApp** & **Telegram**. I can help you with:`,
      ``,
      `- 💻 Writing & debugging code`,
      `- 🔢 Step-by-step math`,
      `- 🌍 Translations across languages`,
      `- 🍝 Recipes, ideas & creative writing`,
      `- 📄 Summarising long documents`,
      ``,
      `No logins, no downloads — just chat. What can I do for you today?`,
    ].join("\n");
  }

  // --- Greetings ----------------------------------------------------------
  if (/\b(hi|hello|hey|yo|namaste|namaskar|salaam|hola|good (morning|evening|afternoon))\b/.test(lower) && message.length < 30) {
    return `Namaste, Boss! 🙏 I'm Chotu, always ready to roll.\n\nWhat are we tackling today — code, math, a recipe, a translation, or a quick creative spark? Just say the word!`;
  }

  // --- Thanks -------------------------------------------------------------
  if (/\b(thank|thanks|thx|cheers|shukriya|dhanyavad)\b/.test(lower)) {
    return `Anytime, Boss! 😊 That's what I'm here for. Ping me whenever you need a hand — I never sleep.`;
  }

  // --- Capabilities / help ------------------------------------------------
  if (/\b(what can you do|help me|your (features|capabilities)|how do you work|menu)\b/.test(lower)) {
    return [
      `Here's my toolkit, Boss 🛠️`,
      ``,
      `1. **Code** — debug, explain, or write code in 20+ languages`,
      `2. **Math** — solve & explain equations step-by-step`,
      `3. **Translate** — switch between languages instantly`,
      `4. **Create** — recipes, emails, poems, side-hustle ideas`,
      `5. **Summarise** — distill long articles & docs`,
      ``,
      `Try one of the suggestion chips on the left, or just type a question!`,
    ].join("\n");
  }

  // --- Math ---------------------------------------------------------------
  const mathReply = solveMath(message, lower);
  if (mathReply) return mathReply;

  // --- Code / debugging ---------------------------------------------------
  if (/\b(code|bug|error|function|def |return|python|javascript|java|c\+\+|react|typescript|null|undefined|exception|stack trace)\b/.test(lower) || /def\s+\w+\s*\(/.test(message)) {
    return explainCodeBug(message);
  }

  // --- Translation --------------------------------------------------------
  if (/\b(translate|translation|how do (i|you) (say|ask)|in (spanish|french|hindi|german|italian|arabic|chinese|japanese|tamil|telugu|bengali)|fluent (spanish|french|hindi))\b/.test(lower)) {
    return translateHelp(message, lower);
  }

  // --- Recipe -------------------------------------------------------------
  if (/\b(recipe|cook|dinner|lunch|breakfast|meal|ingredient|chicken|broccoli|pasta|salad)\b/.test(lower)) {
    return recipeHelp(lower);
  }

  // --- Side-hustle / ideas ------------------------------------------------
  if (/\b(side[- ]?hustle|startup idea|business idea|weekend project|creative idea)\b/.test(lower)) {
    return [
      `Love this energy, Boss! 🔥 Here are **3 weekend tech side hustles** for a software engineer:`,
      ``,
      `1. **Micro-SaaS for niche workflows** — pick one boring spreadsheet process (e.g. invoice tracking for freelancers) and ship a focused tool. Charge $9–$29/mo.`,
      ``,
      `2. **AI-powered templates / GPT wrappers** — bundle a polished prompt + UI for a specific vertical (real-estate listings, resume tuning). Sell on Gumroad.`,
      ``,
      `3. **Automated content pipeline as a service** — help small creators auto-generate & schedule social posts from their blog. Retainer pricing = predictable revenue.`,
      ``,
      `Pick one, ship an MVP in 2 weekends, and validate with 5 real users. Want me to flesh out any of these? 🚀`,
    ].join("\n");
  }

  // --- Explain simply (quantum, etc.) ------------------------------------
  if (/\b(quantum|explain .*(simple|kid|child|8 year|8-year|beginner)|eli5)\b/.test(lower)) {
    return `Sure thing, Boss! 🧠\n\n**Quantum computing, super simple:**\n\nA normal computer thinks in bits — each is either **0 or 1**, like a light switch that's on or off.\n\nA quantum computer uses **qubits**, which can be 0 **and** 1 at the same time (like a spinning coin that's both heads and tails while it spins). Because they explore many possibilities at once, they can solve certain puzzles — like cracking codes or simulating molecules — way faster than regular computers.\n\nThink of it as a computer that can walk through a maze by trying **all paths at the same time** instead of one by one. Wild, right? ✨`;
  }

  // --- Jokes --------------------------------------------------------------
  if (/\b(joke|funny|make me laugh|make me smile)\b/.test(lower)) {
    const jokes = [
      `Why do programmers prefer dark mode? 🌑\n\nBecause light attracts bugs! 🐛😄`,
      `Why did the developer go broke? 💸\n\nBecause they used up all their **cache**! 💰`,
      `I told my computer I needed a break... 💻\n\nNow it won't stop sending me KitKat ads. 🍫`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // --- Fallback -----------------------------------------------------------
  return [
    `Got it, Boss! 👍 Here's my take:`,
    ``,
    `> ${truncate(message, 280)}`,
    ``,
    `That's a great thing to explore. I'm running in **offline demo mode** right now (no external API connected), so I'll do my best with the smarts built into this sandbox.`,
    ``,
    `Try asking me about **code**, **math** (e.g. *"15 * 12 + 7"*), a **recipe**, a **translation**, or a **joke** — those are my strongest lanes! 💪`,
    turns > 2 ? `\n\n_We're ${turns + 1} messages in — on a roll! 🎉_` : ``,
  ].join("\n");
}

/** Attempts to evaluate a math expression found in the message. */
function solveMath(message: string, lower: string): string | null {
  // Explicit "log base N of X"
  const logMatch = lower.match(/log\s*base\s*(\d+)\s*of\s*([\d.]+)/);
  if (logMatch) {
    const base = parseFloat(logMatch[1]);
    const x = parseFloat(logMatch[2]);
    if (base > 0 && base !== 1 && x > 0) {
      const result = Math.log(x) / Math.log(base);
      return `Let's work it out, Boss! 🔢\n\n**log base ${base} of ${x}**\n\n= ln(${x}) / ln(${base})\n\n= **${result.toFixed(4)}** ✅`;
    }
  }

  // Pull out an arithmetic expression (digits, operators, parentheses, ^).
  const exprMatch = message.match(/[-+/*^().\d\s]{3,}/);
  if (exprMatch) {
    const raw = exprMatch[0].trim();
    // Must contain at least one operator between numbers.
    if (!/\d\s*[-+/*^]\s*\d/.test(raw)) return null;
    const sanitized = raw.replace(/\^/g, "**").replace(/[^-+/*().\d\s]/g, "");
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized});`)();
      if (typeof result === "number" && Number.isFinite(result)) {
        return `Easy maths, Boss! 🧮\n\n**${raw} = ${result}** ✅\n\nWant me to break down the steps?`;
      }
    } catch {
      return null;
    }
  }
  return null;
}

/** Explains a common "function returns None" style bug. */
function explainCodeBug(message: string): string {
  const hasNoneIssue = /return(?:ing)?\s*(none|null|undefined)/i.test(message) || /def\s+\w+/i.test(message);
  return [
    `Good catch, Boss — let's debug it together! 🐞`,
    ``,
    hasNoneIssue
      ? `Your function is **returning \`None\`** because there's no \`return\` that fires for every path. The classic culprit: a \`return\` is *inside* a loop/condition, so when nothing matches, Python falls off the end and hands back \`None\` by default.`
      : `Most bugs hide in one of three places: **edge cases** (empty input, 0, negatives), **state** that changed unexpectedly, or **silent failures** (a swallowed exception returning nothing).`,
    ``,
    `**Quick fixes:**`,
    ``,
    `1. Make sure every code path returns a value.`,
    `2. Add a default \`return\` **after** the loop.`,
    `3. Print/log intermediate values to see where it goes wrong.`,
    ``,
    `\`\`\`python`,
    `def find_first(lst):`,
    `    for x in lst:`,
    `        if x > 5:`,
    `            return x`,
    `    return None  # 👈 explicit fallback so behaviour is clear`,
    `\`\`\``,
    ``,
    `Paste the full snippet + the error message and I'll pin it down precisely! ✅`,
  ].join("\n");
}

/** Lightweight canned translation helper for common demo phrases. */
function translateHelp(message: string, lower: string): string {
  if (/spanish/.test(lower)) {
    return `¡Claro, Boss! 🌍\n\n**"Where is the nearest coffee shop?"** in Spanish:\n\n> **"¿Dónde está la cafetería más cercana?"**\n\nPronounced: *¿DOHN-day es-TAH la kah-feh-TEH-ree-ah MAHS cer-KAH-nah?*\n\nWant it in another language? Just say the word! ☕`;
  }
  if (/french/.test(lower)) {
    return `Bien sûr, Boss! 🌍\n\n**"Where is the nearest coffee shop?"** in French:\n\n> **"Où se trouve le café le plus proche ?"**\n\nPronounced: *oo suh troov luh kah-FAY luh ploo prosh?* ☕`;
  }
  if (/hindi/.test(lower)) {
    return `ज़रूर, Boss! 🌍\n\n**"Where is the nearest coffee shop?"** in Hindi:\n\n> **"सबसे नज़दीकी कॉफ़ी शॉप कहाँ है?"**\n\nRomanised: *Sabse nazdiki coffee shop kahan hai?* ☕`;
  }
  return `Happy to translate, Boss! 🌍\n\nTell me the **phrase** and the **target language** (e.g. Spanish, French, Hindi, German) and I'll hand it right over.`;
}

/** Suggests a recipe based on detected ingredients. */
function recipeHelp(lower: string): string {
  const wantsChicken = /chicken/.test(lower);
  const wantsBroccoli = /broccoli/.test(lower);
  if (wantsChicken && wantsBroccoli) {
    return [
      `Tasty choice, Boss! 🍳 Here's a **15-min Garlic Chicken & Broccoli Stir-fry**:`,
      ``,
      `**Ingredients**`,
      `- 2 chicken breasts (sliced)`,
      `- 1 head broccoli (florets)`,
      `- 3 garlic cloves (minced), 1 tbsp soy sauce, 1 tsp honey, olive oil, salt & pepper`,
      ``,
      `**Steps**`,
      `1. Season & sear chicken in a hot pan (~4 min/side). Set aside.`,
      `2. Stir-fry broccoli with garlic for 3 min.`,
      `3. Return chicken, splash in soy + honey, toss 2 min.`,
      `4. Done — high protein, low fuss! 💪`,
      ``,
      `Want a vegetarian or low-carb twist? Just ask! 🥦`,
    ].join("\n");
  }
  return [
    `Happy to cook with you, Boss! 👨‍🍳`,
    ``,
    `Tell me your **main ingredient** (chicken, paneer, pasta...) and any **diet** (vegan, low-carb, gluten-free), and I'll draft a quick, healthy recipe with steps.`,
  ].join("\n");
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Small delay so the typing indicator feels natural.
      await new Promise((resolve) => setTimeout(resolve, 350 + Math.random() * 350));

      const replyText = generateChotuReply(
        String(message),
        Array.isArray(history) ? history : []
      );
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("API Error:", err);
      res.status(500).json({
        error: "Failed to communicate with Chotu.",
        details: err.message || "Unknown error",
      });
    }
  });

  // Serve health status
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "ChotuBot Server" });
  });

  // Vite Middleware integration
  if (process.env.NODE_ENV !== "production") {
    // Vite config is built inline (see getViteConfig) so we never load
    // vite.config.js as a module at runtime — that's unreliable under tsx.
    const { viteConfig, createViteServer } = await getViteConfig();

    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      server: { ...viteConfig.server, middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ChotuBot Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start ChotuBot Server:", err);
});
