/* =============================================================================
   profile.js — Personal / identity content (bilingual)
   -----------------------------------------------------------------------------
   ⚠️  VERIFY THESE FIELDS — they were inferred from your project files.
   Edit name, email, links, and location to taste. Nothing here is published
   until you host the site.
   ============================================================================= */

window.PROFILE = {
  name: "H.Y.",
  role: {
    zh: "代理式工程師",
    en: "Agentic Engineer",
  },
  // The big hero line. Keep it short, confident, specific.
  headline: {
    zh: "設計一套讓 AI 代理自行完成工作的系統。",
    en: "I build systems where autonomous AI agents do the work.",
  },
  subhead: {
    zh: "多代理流水線、會自己排程運行的代理、可重複使用的 Claude 技能，還有大半程式碼都由 AI 編碼代理寫出來的複雜應用——橫跨 AI 自動化、工具開發與 AI 影像創作。",
    en: "Multi-agent pipelines, scheduled autonomous agents, reusable Claude skills, and complex applications built by AI coding agents — across AI automation, tooling, and AI filmmaking.",
  },

  location: { zh: "台灣", en: "Taiwan" },
  // Anonymous contact — a fresh ProtonMail alias (no real name / handle).
  email: "agneng@proton.me",
  links: [
    { label: "Email", url: "mailto:agneng@proton.me" },
    // Add an anonymous channel only if it can't be traced back to you, e.g.:
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle" },
  ],

  // --- "Approach" section: how I work with agents ---
  capabilities: [
    {
      no: "01",
      title: { zh: "多代理協作編排", en: "Multi-Agent Orchestration" },
      body: {
        zh: "設計一條由多個專責代理組成的流水線，讓它們用結構化輸出和 JSON Schema 彼此交接，再交給一個會多輪呼叫工具的代理自我審查、修補、直到收斂——全程不靠任何代理框架，純用標準函式庫手寫。",
        en: "Design pipelines of specialized agents that hand off structured, schema-validated work, with multi-turn tool-use agents that self-review, patch, and converge — hand-rolled without any agent framework.",
      },
    },
    {
      no: "02",
      title: { zh: "自主代理與自動化", en: "Autonomous Agents & Automation" },
      body: {
        zh: "排程代理每天自動跑真實的營運工作：自己找資料、抓網頁、做判斷、產出成果，最後留一道關卡交給人審核。背後有校時機制、子代理的脈絡隔離，還有「把每次失敗都記下來、再重新設計」的工程紀律。",
        en: "Scheduled agents that run real operations daily — researching, fetching, judging, and producing deliverables behind human-in-the-loop gates, with time-correction, sub-agent context isolation, and documented failure-driven redesigns.",
      },
    },
    {
      no: "03",
      title: { zh: "代理技能與工具", en: "Agent Skills & Tooling" },
      body: {
        zh: "寫出可重複使用、可發佈的 Claude 技能與開發者工具，內建能量化的品質關卡和防護機制，讓 AI 編碼代理寫出來的東西更一致、更可靠。這些技能還能彼此組合，長成更大的自主系統。",
        en: "Author reusable, shippable Claude skills and developer tools with measurable quality gates and guardrails that make AI coding agents more consistent — and that compose into larger autonomous systems.",
      },
    },
    {
      no: "04",
      title: { zh: "代理打造的應用", en: "Agent-Built Applications" },
      body: {
        zh: "在我主導、實作交給 AI 編碼代理的流程下，做出複雜的即時應用——從自己寫的 GPU 影像合成管線、即時動作捕捉，到跨程序的硬體協定橋接。",
        en: "Ship complex, real-time applications through a human-directed, agent-executed workflow — from custom GPU compositing pipelines and real-time motion capture to cross-process hardware-protocol bridges.",
      },
    },
  ],

  // --- About paragraph(s) ---
  about: {
    zh: [
      "讓 AI 代理變成程式化的人力——安排角色、交接規則、品質關卡和防護機制，讓降本增效不再只是口號。",
      "這段時間，我用這套方法做了好幾樣東西：多代理的提示流水線、每天自己運行的排程代理、幾個已經發佈的 Claude 技能，還有一套大半程式碼都由 AI 編碼代理寫出來的即時桌面應用。我也把同樣的工程紀律帶進 AI 影像創作——把生成式影片那些「做不到」的限制，整理成代理能穩定照著執行的拍攝規格。",
      "對我來說，代理工程的核心其實是「品味」和「紀律」：知道該在哪裡留一道人工審核的關卡、怎麼把每次失敗變成能累積的經驗，以及怎麼讓一套系統在你沒盯著的時候，也值得信任。",
    ],
    en: [
      "I turn AI agents into programmable labor — assigning roles, hand-off rules, quality gates, and guardrails — so cutting cost while boosting output stops being just a slogan and starts being real.",
      "With that approach I've built multi-agent prompt pipelines, scheduled agents that run autonomously every day, several shipped Claude skills, and a complex real-time desktop application whose implementation was largely carried out by an AI coding agent under my direction. I bring the same engineering discipline to AI filmmaking, turning the limits of generative video into shot specs an agent can execute deterministically.",
      "I believe agentic engineering is mostly taste and discipline: knowing where to place human-in-the-loop gates, how to turn failures into compounding knowledge, and how to make a system trustworthy when you're not watching it.",
    ],
  },

  // --- Headline stats strip ---
  stats: [
    { value: "16",  label: { zh: "精選作品", en: "Featured projects" } },
    { value: "5",   label: { zh: "代理技能與工具", en: "Agent skills & tools" } },
    { value: "3",   label: { zh: "正式上線的自主系統", en: "Autonomous systems in production" } },
    { value: "2",   label: { zh: "介面語言", en: "Languages" } },
  ],

  // --- "Tools I run on" (from real usage) ---
  toolbelt: ["Claude Code", "Claude Cowork", "MCP", "Python", "TypeScript", "Electron", "Three.js", "Higgsfield", "Midjourney", "Meshy", "Suno"],
};
