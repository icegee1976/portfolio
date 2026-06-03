/* =============================================================================
   projects.js — THE place to add new projects
   -----------------------------------------------------------------------------
   ORDER OF THIS ARRAY = ORDER ON THE PAGE. The list is sorted by engineering
   difficulty / scale (hardest & largest first). `featured: true` only enlarges
   a card (full-width); it no longer reorders. To add a project: copy an object,
   edit it, and place it where it belongs in the difficulty order. No build step.

   SCHEMA (every text field is bilingual: { zh, en }):
   {
     slug, category, featured?, confidential?, year, source,
     title:{zh,en}, tagline:{zh,en}, description:{zh,en},
     highlights:[{zh,en}], tech:["Tag"], status:{zh,en},
     links?:[{label,url}], images?:[{src,alt:{zh,en},caption:{zh,en}}],
     pipeline?:[{label:{zh,en},note:{zh,en}}], metrics?:[{value,label:{zh,en}}],
     terminal?:{title,lines:["..."]}, logos?:["path.svg"],
   }
   categories: "agentic-systems" | "skills-tooling" | "agent-apps" | "ai-creative"
   ============================================================================= */

window.PROJECTS = [

  /* 01 ───────────────────────────────────────────────────────── (most complex) */
  {
    slug: "agent-prompt-pipeline",
    category: "agentic-systems",
    featured: true,
    confidential: true,
    year: "2026",
    source: "Code",
    title: {
      zh: "多代理腳本 → 提示流水線",
      en: "Multi-Agent Script-to-Prompt Pipeline",
    },
    tagline: {
      zh: "一套不靠任何套件、也不挑 LLM 供應商的六代理編排伺服器，把劇本一路轉成驗證過、可以直接拿去用的提示——最後還有一個會自己反覆修補、直到收斂的 QA 代理。",
      en: "A dependency-free, provider-agnostic 6-agent orchestration server that compiles a narrative script into validated, ready-to-run prompts — with an autonomous QA agent that patches the pipeline's own output until it converges.",
    },
    description: {
      zh: "設計並實作了一套多代理系統，把寫好的劇本轉成生成式影片引擎可以直接用的成品提示。六個分工明確的代理串成一條流水線：前五個用各家供應商原生支援的結構化輸出，每一次交接都用 JSON Schema 驗證；最後一關是一個真的會多輪呼叫工具的代理——它會讀完前面所有產物，每次只動一個地方做精準修補，再從六個維度重新評分，並在寫死的迭代上限、收斂偵測，還有「真的不行就強制收尾」的安全網底下定稿。整個編排層用純 Python 標準函式庫手寫（不靠代理框架，也沒有任何第三方套件），而且只要是模型自己提議要寫的檔案，都得先過白名單才放行。",
      en: "Designed and built a multi-agent system that transforms a written script into production-ready prompts for generative-video engines. Six role-specialized agents run as a staged pipeline; the first five use provider-native structured output validated against JSON Schemas, and the final stage is a true multi-turn tool-use agent that reads prior artifacts, applies one targeted patch at a time, re-scores quality across six dimensions, and finalizes — guarded by a hard iteration cap, convergence detection, and a forced-finalize safety net. The orchestration layer is hand-rolled in pure Python standard library (no agent framework, zero third-party deps), with whitelist guardrails on any model-proposed file write.",
    },
    pipeline: [
      { label: { zh: "製片", en: "Producer" },        note: { zh: "故事聖經", en: "Story bible" } },
      { label: { zh: "導演", en: "Director" },         note: { zh: "敘事與節奏", en: "Narrative & beats" } },
      { label: { zh: "美術指導", en: "Art Director" }, note: { zh: "視覺風格", en: "Visual style" } },
      { label: { zh: "分鏡師", en: "Storyboard" },     note: { zh: "鏡頭表", en: "Shot list" } },
      { label: { zh: "提示設計", en: "Prompt Designer" }, note: { zh: "每鏡提示", en: "Per-shot prompts" } },
      { label: { zh: "QA 編輯", en: "QA Editor" },     note: { zh: "多輪自我修補迴圈", en: "Multi-turn self-patch loop" } },
    ],
    highlights: [
      { zh: "六個專責代理，各自受專屬 JSON Schema 約束，達成可機器驗證的可靠交接。",
        en: "Six specialized agents, each constrained by a dedicated JSON Schema for machine-checkable, reliable hand-offs." },
      { zh: "自主多輪 QA 代理：具備讀取／修補（每次一處、目標檔案白名單）／定稿工具，在硬性上限內迭代至收斂，並強制「先讀再改」。",
        en: "Autonomous multi-turn QA agent with read / patch (one fix per call, whitelisted targets) / finalize tools, iterating to convergence under a hard cap with enforced read-before-patch." },
      { zh: "約 5,000 行、零依賴的 Python——完整 LLM 工具使用迴圈直接建構在標準函式庫之上。",
        en: "~5,000 lines of zero-dependency Python — a full LLM tool-use loop built directly on the standard library." },
      { zh: "跨兩家 LLM 供應商（含推理模型 API 差異），以提示快取撐過長迴圈的速率限制。",
        en: "Provider-agnostic across two LLM vendors (incl. reasoning-model quirks), with prompt-caching to survive rate limits on long runs." },
      { zh: "資安導向：抗提示注入的寫入白名單、本機限定的管理端點、CSP 與安全標頭。",
        en: "Security-minded: prompt-injection-resistant write whitelisting, localhost-gated admin endpoint, CSP and security headers." },
      { zh: "成本意識的關卡：在最貴的「影片提示」步驟前先停下等人確認，因為那一步重做的成本是分鏡的 10–50 倍。",
        en: "A cost-aware checkpoint pauses for human sign-off before the most expensive step — a redo there costs 10–50× a storyboard." },
    ],
    tech: ["Python (stdlib-only)", "Multi-Agent Orchestration", "LLM Tool-Use", "JSON Schema", "Prompt Caching", "SSE", "Vanilla JS"],
    status: { zh: "生產中（內部）", en: "Production (internal)" },
    images: [
      { src: "assets/img/projects/agent-prompt-pipeline/ui.webp",
        alt: { zh: "多代理工作台介面（去識別化重繪）", en: "Multi-agent workbench UI (anonymized recreation)" },
        caption: { zh: "工作台介面——去識別化重繪，左側即六代理流水線。", en: "The workbench UI — an anonymized recreation; the six-agent pipeline runs down the left rail." } },
    ],
  },

  /* 02 ───────────────────────────────────────────────────────── */
  {
    slug: "vp-studio",
    category: "agent-apps",
    featured: true,
    confidential: true,
    year: "2026",
    source: "Code",
    title: {
      zh: "即時虛擬製作與虛擬人棚（跨平台桌面應用）",
      en: "Real-Time Virtual Production & Avatar Studio (Desktop App)",
    },
    tagline: {
      zh: "一套大半由 AI 代理寫出來的 Electron 桌面棚：即時合成、AI 去背、用動作捕捉驅動的 3D 虛擬人——拿現代 WebGL 管線換掉老舊的原生程式。",
      en: "An agent-built Electron studio for live compositing, AI background removal, and motion-captured 3D avatars — replacing a legacy native app with a modern WebGL pipeline.",
    },
    description: {
      zh: "由我主導、實作大部分交給 AI 編碼代理，一起架構並做出一套跨平台的即時虛擬製作桌面應用。整個渲染堆疊都跑在前端：Three.js/WebGL 場景配上自己寫的多階段 GLSL 合成管線（廣播級去背、Clean Plate 去底、Light Wrap 邊緣融合），再加上跑在裝置端的 ML 模型，做到不用綠幕也能去背、用一支網路攝影機就能驅動虛擬人的動作捕捉。另外有一支輕量的 Node.js 橋接器，用 UDP 收業界的攝影機追蹤協定再串給渲染器，讓虛擬攝影機跟著實體攝影機一起動。最後包成原生 Electron 安裝檔發佈，同時保留瀏覽器開發模式。我負責的範圍涵蓋整體架構、即時 GPU 管線、跨程序的追蹤橋接，以及這套「人帶著代理一起寫」、最終產出約 40 個 TypeScript 模組的開發流程。",
      en: "Under a human-directed workflow where an AI coding agent carried out the bulk of implementation, I architected and built a cross-platform real-time virtual-production desktop app. The rendering stack is entirely client-side: a Three.js/WebGL scene with a custom multi-stage GLSL compositing pipeline (broadcast-grade keying, clean-plate subtraction, light-wrap edge blending) plus on-device ML for green-screen-free background removal and webcam-driven avatar motion capture. A lightweight Node.js bridge ingests an industry camera-tracking protocol over UDP and streams it to the renderer to sync a virtual camera to a physical one. Shipped as a native Electron installer with a browser-based dev mode. My role spanned the full architecture, the real-time GPU pipeline, the cross-process tracking bridge, and the agent-assisted workflow that produced ~40 TypeScript modules.",
    },
    pipeline: [
      { label: { zh: "擷取", en: "Capture" },       note: { zh: "攝影機 / HDMI", en: "Camera / HDMI" } },
      { label: { zh: "去背合成", en: "Keyer" },      note: { zh: "色鍵 ∩ AI 遮罩", en: "Chroma ∩ AI matte" } },
      { label: { zh: "3D 場景", en: "3D Scene" },    note: { zh: "VRM 虛擬人 + 動捕", en: "VRM avatars + mocap" } },
      { label: { zh: "合成輸出", en: "Composite" },  note: { zh: "Light Wrap 兩階段", en: "Light-wrap, two-pass" } },
      { label: { zh: "輸出", en: "Output" },         note: { zh: "OBS / 錄製", en: "OBS / record" } },
    ],
    highlights: [
      { zh: "自訂的多階段即時 GLSL 合成器（色鍵與 AI 遮罩混合、去溢色、Light Wrap），每幀在兩階段渲染迴圈中運作。",
        en: "Custom multi-stage real-time GLSL compositor (chroma + AI matte hybrid, despill, light-wrap) running per-frame in a two-pass loop." },
      { zh: "用裝置端的 ML 做到不用綠幕也能去背、無標記就能做全身虛擬人動捕，再用 One Euro Filter 把次幀的抖動磨平。",
        en: "On-device ML for no-green-screen keying and markerless full-body avatar mocap with sub-frame One-Euro jitter filtering." },
      { zh: "跨程序即時橋接：UDP → WebSocket，解碼業界攝影機追蹤協定來驅動虛擬攝影機。",
        en: "Cross-process real-time bridge (UDP → WebSocket) decoding an industry camera-tracking protocol to drive a virtual camera." },
      { zh: "單一程式庫同時支援原生 Electron 應用與瀏覽器開發模式。",
        en: "Dual-runtime: native Electron app and browser dev mode from one codebase." },
      { zh: "約 40 個 TypeScript 模組的實作與技術交接文件，主要由 AI 編碼代理在我的指導下產出。",
        en: "~40 TypeScript modules and the technical handover, largely produced by an AI coding agent under my direction." },
      { zh: "所有擷取與 ML 運算都在本機完成、影像不上傳雲端；並以約 150MB 的 Electron 取代約 500MB 的舊原生應用。",
        en: "All capture and ML inference run on-device — no video leaves the machine — and a ~150MB Electron build replaces a ~500MB legacy native app." },
    ],
    tech: ["Electron", "Vite", "TypeScript", "React / Radix", "Three.js (WebGL2 / GLSL)", "MediaPipe", "VRM / kalidokit", "Node WS / UDP"],
    status: { zh: "Alpha（內部）", en: "Alpha (internal)" },
    images: [
      { src: "assets/img/projects/vp-studio/ui.webp",
        alt: { zh: "即時虛擬製作介面（去識別化重繪）", en: "Real-time virtual-production UI (anonymized recreation)" },
        caption: { zh: "即時合成介面——去識別化重繪，右側為多階段去背 Keyer。", en: "The live-compositing UI — an anonymized recreation; the multi-stage keyer is on the right." } },
    ],
  },

  /* 03 ───────────────────────────────────────────────────────── */
  {
    slug: "buyee-sniper",
    category: "agentic-systems",
    featured: true,
    year: "2026",
    source: "Cowork",
    title: {
      zh: "日拍狙擊手 — 自主競標掃描代理",
      en: "Auction Sniper — Autonomous Bargain-Scanning Agent",
    },
    tagline: {
      zh: "每天早上 09:00，一個代理會掃過 65 組存好的拍賣搜尋，拿每件商品去比對近半年的成交行情，只把 24 小時內就要截標、又真的划算的撈出來寄到你信箱。",
      en: "Every morning at 09:00, an agent scans 65 saved searches, prices each item against half a year of sold data, and emails you only the genuine bargains closing within 24 hours.",
    },
    description: {
      zh: "一個排程代理：先讀使用者從瀏覽器匯出的書籤（約 65 組關鍵字搜尋），逐一抓每則拍賣，跟快取起來的 180 天成交中位數比對，篩出「是商品本體、有人出價、低於行情、而且 24 小時內就截標」的標的，最後整理成一封 HTML 摘要、放進 Gmail 草稿。中途它還整個打掉重練過一次——從瀏覽器自動化改成全無頭的 web-fetch 加子代理流水線——過程都寫在交接文件裡。",
      en: "A scheduled agent that parses the user's exported browser bookmarks (~65 keyword searches), fetches each listing, compares against a cached 180-day median \"sold\" price, and filters for genuine bodies that have a bid, are priced below market, and close within 24 hours — then assembles an HTML digest delivered as a Gmail draft. It survived a full architecture rewrite (browser-automation → fully headless web-fetch + sub-agent pipeline), all captured in handoff docs.",
    },
    highlights: [
      { zh: "脈絡預算工程：派出用完即丟的子代理吸收龐大網頁、只回傳計數，避免主脈絡在每天約 130 頁的抓取中爆掉。",
        en: "Context-budget engineering: throwaway sub-agents absorb large pages and return only counts, preventing main-context blowup across ~130 pages/day." },
      { zh: "踩坑之後打掉重練：瀏覽器在無人值守時權限一直卡關，於是整個改成全無頭，並把這些反模式整理成一張表。",
        en: "Failure-driven redesign: after unattended-browser permission failures, rebuilt fully headless — documented as an anti-patterns table." },
      { zh: "成交中位數每週才更新一次，把每天的抓取從約 128 次降到約 64 次，免得請求打太兇。",
        en: "Weekly median cache cut daily fetches from ~128 to ~64, respecting rate limits." },
      { zh: "硬性安全規則寫死在系統中：永不出價、永不刪信、永不改書籤，啟動必先校時。",
        en: "Hard safety rules encoded: never bids, never deletes mail, never edits bookmarks, mandatory clock-sync at start." },
      { zh: "每天在生產環境運行，逐日產出原始 JSON、得獎清單、HTML 信件與執行日誌。",
        en: "Runs daily in production, producing raw JSON, winners list, HTML emails, and run logs every day." },
      { zh: "每次改完都先用 py_compile 自我驗證才上線，並把「掛載檔被截斷」這類坑寫成 SOP，避免重蹈覆轍。",
        en: "Every change self-verifies with py_compile before going live, and gotchas (like mounted-file truncation) get written into the SOP so they don't recur." },
    ],
    tech: ["Python", "Claude Scheduled Tasks", "web_fetch", "Sub-Agents", "Gmail MCP", "Caching"],
    status: { zh: "生產中（每日）", en: "Production (daily)" },
    images: [
      { src: "assets/img/projects/buyee-sniper/digest.webp",
        alt: { zh: "代理每日自動產生的便宜貨摘要信", en: "The daily bargain digest the agent generates" },
        caption: { zh: "代理每天自動產生、寄進信箱的便宜貨摘要（現價 vs 行情中位數）。", en: "The daily bargain digest the agent generates and emails — current price vs. market median." } },
    ],
  },

  /* 04 ───────────────────────────────────────────────────────── */
  {
    slug: "fb-content-engine",
    category: "agentic-systems",
    featured: true,
    year: "2026",
    source: "Code · Cowork",
    title: {
      zh: "Facebook 粉絲專頁 — 自主內容引擎",
      en: "Facebook Page — Autonomous Content Engine",
    },
    tagline: {
      zh: "排程代理把當週最新的 AI 動態，變成沒有「AI 味」的貼文和值得收藏的知識卡——自己找資料、寫稿、出圖、做品質掃描，最後留一個位置給人一鍵審核。",
      en: "Scheduled agents turn the week's freshest AI developments into anti-AI-slop posts and save-worthy knowledge cards — researched, written, rendered, quality-scanned, and queued for one-tap human approval.",
    },
    description: {
      zh: "一套用來經營某 Facebook 粉絲專頁的內容自動化系統，靠一份用 Markdown 寫的 SOP（單一真實來源）在驅動：每次排程時間一到，代理就掃過近 7–14 天的 AI 進展（來源分成 A／B／C 三級），用新鮮度評分挑題、同時硬性把已經過時的技術剔掉，再照一套嚴格的「反 AI 味」規則寫稿，接著用 Python/PIL 直接畫出 6–8 張知識卡，跑一次 AI 味掃描器（目標 ≤25 分），最後生成 Gmail 草稿、順手建一則日曆提醒。它從不自動發文——一定要人看過、再手動發佈。",
      en: "A content-automation system for a Facebook page, driven by a single Markdown \"source of truth\" SOP: on each scheduled wake-up the agent scans the last 7–14 days of AI developments (tiered A/B/C sources), scores candidates for freshness while hard-excluding deprecated tech, writes under a strict anti-AI-tells ruleset, renders 6–8 knowledge cards directly with Python/PIL, runs an AI-smell scanner (target ≤25), then produces a Gmail draft and a calendar reminder. It never auto-posts — a human always reviews and publishes.",
    },
    highlights: [
      { zh: "到「人工審核」前完全無人值守的自主迴圈：掃描 → 評分 → 撰寫 → 渲染 → 品質把關 → 排程。",
        en: "A fully unattended autonomous loop up to the approval step: scan → score → write → render → QA → schedule." },
      { zh: "首組實跑的七張卡：AI 味 16/100、新鮮度 95/100。",
        en: "First real card set scored AI-tells 16/100 and freshness 95/100." },
      { zh: "新鮮度引擎主動排除已停更／淘汰技術與「常青填充」題材。",
        en: "Freshness engine actively excludes deprecated/sunset tech and evergreen filler." },
      { zh: "純 PIL 卡片渲染器，含逐字元的中英字型 fallback，繞過缺字問題。",
        en: "Pure-PIL card renderer with character-level CJK/Latin font fallback to dodge missing glyphs." },
      { zh: "直接把我自己寫的 writers-guild 技能組進來——證明技能可以一層層組裝成更大的自主系統。",
        en: "Composes my own writers-guild skill — demonstrating skills assembling into larger autonomous systems." },
      { zh: "時間校正關卡：用三步驟日期比對，避免 App 重開後自動補跑、造成誤發。",
        en: "A time-correction gate (three-step date comparison) prevents mis-fired catch-up runs when the app reopens after a missed slot." },
    ],
    tech: ["Python", "Pillow", "Claude Scheduled Tasks", "MCP (Gmail / Calendar)", "WebSearch", "writers-guild skill"],
    status: { zh: "生產中", en: "Production" },
  },

  /* 05 ───────────────────────────────────────────────────────── */
  {
    slug: "income-alpha",
    category: "agentic-systems",
    year: "2026",
    source: "Code",
    title: {
      zh: "Polymarket Alpha 引擎 — 代理開發的量化研究套件",
      en: "Polymarket Alpha Engine — Agent-Built Quant Research Suite",
    },
    tagline: {
      zh: "一套由 AI 代理開發的量化工具，從預測市場的資料裡挖出「大戶共識」訊號——用 8,154 筆真實交易回測過，還附了一個不用寫程式就能操作的 Streamlit 儀表板。",
      en: "An AI-agent-developed quant toolkit that mines prediction-market data for whale-consensus signals — backtested over 8,154 real trades, with a no-code Streamlit dashboard.",
    },
    description: {
      zh: "一個橫跨好幾個 Claude Code 工作階段做出來的研究專案，最有意思的地方在於：它的「打造過程」本身就是一個 agentic engineering 的案例。我用一份 HANDOFF.md 當作代理與代理之間的接力協定（下一個工作階段開場第一件事，就是先讀它）；另一個工作階段則自己跑完一整輪程式碼審查（22 項修正：原子寫入、崩潰自動復原、清掉 13 處裸 except），全程沒動到策略邏輯。策略上驗證了兩條路——跟著大戶共識下單，以及買進高機率的債券——再用 Streamlit 把每個 CLI 工具包成可以拉滑桿的圖表。一條不能踩的紅線：代理永遠不會真的下單。",
      en: "A research project built across many Claude Code sessions whose real highlight is that its *construction* is a case study in agentic engineering: a HANDOFF.md acts as an agent-to-agent continuity protocol (the next session's first act is to read it), and a separate session ran a full autonomous code review (22 fixes: atomic writes, crash auto-recovery, removing 13 bare excepts) without touching strategy logic. Two strategies were validated — copy-trading whale consensus and buying high-probability bonds — and every CLI tool is wrapped into a slider-driven Streamlit dashboard. Hard red line: agents never place real trades.",
    },
    metrics: [
      { value: "8,154", label: { zh: "回測真實交易", en: "Real trades backtested" } },
      { value: "99.78%", label: { zh: "債券策略命中率", en: "Bond-strategy hit rate" } },
      { value: "22", label: { zh: "自主審查修正項", en: "Autonomous-review fixes" } },
    ],
    highlights: [
      { zh: "用一份 HANDOFF.md 當作代理之間的接力協定，裡面有冷啟動步驟和 10 個「轉折點」教訓，讓經驗能一直累積下去。",
        en: "HANDOFF.md agent-to-agent continuity protocol with a cold-start procedure and 10 logged \"turning points\" so knowledge compounds." },
      { zh: "一個工作階段自主完成的程式碼審查：原子狀態寫入、資金復原修補、崩潰自動復原。",
        en: "An autonomously executed code-review session: atomic state writes, fund-recovery fix, crash auto-recovery." },
      { zh: "紙上模擬涵蓋 8,154 筆鏈上交易；債券回測 5,792 筆、命中率 99.78%。",
        en: "Paper simulation over 8,154 on-chain trades; bond backtest of 5,792 buys at a 99.78% hit rate." },
      { zh: "記錄下死路（被 HFT 秒殺的套利、壞掉的歷史價 API），避免未來重蹈。",
        en: "Documented dead-ends (arbitrage killed by HFT, a broken price-history API) so they aren't re-tried." },
      { zh: "連線走作業系統憑證庫（truststore）做 SSL 驗證；並用單一來源的關鍵字架構，避免過濾條件在各處悄悄分歧。",
        en: "Connections verify SSL against the OS trust store, and a single-source keyword architecture stops filters from silently diverging across the codebase." },
    ],
    tech: ["Python", "Streamlit", "pandas / plotly", "Polymarket APIs", "Claude Code (worktrees, HANDOFF protocol)"],
    status: { zh: "已驗證原型", en: "Validated prototype" },
    images: [
      { src: "assets/img/projects/income-alpha/backtest.webp",
        alt: { zh: "回測驗證結果圖", en: "Backtest validation chart" },
        caption: { zh: "回測驗證結果（紙上模擬，代理永不下真單）。", en: "Backtest validation results (paper simulation; agents never trade live)." } },
    ],
  },

  /* 06 ───────────────────────────────────────────────────────── */
  {
    slug: "vibe-coding-safety",
    category: "skills-tooling",
    featured: true,
    year: "2026",
    source: "Code",
    title: {
      zh: "AI 編碼安全插件 — 攔住代理寫出的高風險程式碼",
      en: "AI-Coding Safety Plugin",
    },
    tagline: {
      zh: "用確定性掃描器、一個獨立脈絡的審查代理、加上寫檔前 hook，把 AI 寫出來的高風險漏洞擋在落盤之前。",
      en: "A deterministic scanner, an independent fresh-context reviewer agent, and pre-write hooks that block high-risk vulnerabilities before AI-written code ever hits disk.",
    },
    description: {
      zh: "一個給「AI 輔助寫程式」用的安全插件，結合三層防護：regex 確定性掃描、一個獨立脈絡的審查代理，以及寫檔／推送前的 hook。它的起點是一次真實的「AI 自審漏報」——代理自己審自己的程式碼，卻把漏洞放了過去——於是我把這個失效模式明確建模出來，做成可安裝、會主動阻擋、又能交接的安全工作流，而不是事後才補。",
      en: "A safety plugin for AI-assisted coding that layers three defenses: deterministic regex scanning, an independent fresh-context reviewer agent, and hooks that gate writes and pushes. It started from a real \"AI self-review miss\" — an agent reviewing its own code and waving a vulnerability through — so I modeled that failure mode explicitly into an installable, actively-blocking, handoff-ready workflow instead of patching after the fact.",
    },
    terminal: {
      title: "safety-hook",
      lines: [
        "$ git commit   (pre-write hook fires)",
        "  scan: 1 high-risk pattern flagged",
        "  → escalated to independent reviewer",
        "  reviewer: CONFIRMED — eval() on user input",
        "  commit BLOCKED · patch suggested",
      ],
    },
    pipeline: [
      { label: { zh: "掃描", en: "Scan" }, note: { zh: "先用確定性樣式找出高風險片段。", en: "Deterministic patterns find high-risk snippets first." } },
      { label: { zh: "獨立複查", en: "Independent review" }, note: { zh: "交給全新脈絡的審查代理確認與修補。", en: "A fresh-context reviewer agent confirms and patches." } },
      { label: { zh: "阻擋", en: "Block" }, note: { zh: "在寫檔與推送前設下安全閘門。", en: "Safety gates sit before any write or push." } },
    ],
    highlights: [
      { zh: "明確把「AI 自審會漏」這個失效模式建模出來，強制改用一個獨立脈絡的代理來複查。",
        en: "Explicitly models the \"AI self-review blind spot\" and forces a separate, fresh-context agent to re-check." },
      { zh: "寫檔前的 hook 會在內容真正落盤之前，攔下高風險的注入樣式。",
        en: "Pre-write hooks intercept high-risk injection patterns before content ever reaches disk." },
      { zh: "先用確定性 regex 找出可疑片段，再交給審查代理確認——快，而且不靠運氣。",
        en: "Deterministic regex finds suspect snippets first, then the reviewer agent confirms — fast, and not left to chance." },
      { zh: "完整打包成可安裝的插件：技能、審查代理、hook、文件與 release 結構一應俱全。",
        en: "Fully packaged as an installable plugin — skill, reviewer agent, hooks, docs, and release structure included." },
    ],
    tech: ["Python", "Regex Scanner", "Agent Review", "Pre-write Hooks", "Plugin Packaging"],
    status: { zh: "已打包、可安裝", en: "Packaged & installable" },
  },

  /* 07 ───────────────────────────────────────────────────────── */
  {
    slug: "trend-briefing-cli",
    category: "skills-tooling",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "趨勢簡報 CLI — 趨勢情報自動化",
      en: "Trend Briefing CLI — Trend-Intelligence Automation",
    },
    tagline: {
      zh: "每天自動抓公開趨勢、用 LLM 評分、生成切入角度與草稿——但判斷與發布一律留給人。",
      en: "Every day it pulls public trends, scores them with an LLM, and drafts angles and copy — judgment and publishing stay with a human.",
    },
    description: {
      zh: "一個 CLI 工具：每天抓公開的熱門來源、用 LLM 依利基（niche）評分排序，產生切入角度與多種格式的草稿，再把全部寫進本機 SQLite 與當日簡報。它刻意只自動化「低風險的蒐集與起草」，把判斷、編輯、發布、回覆全部留給人——讓代理流程不會反過來變成平台風險。（為保護個人副業，平台、帳號與定位細節都已拿掉。）",
      en: "A CLI tool that, each day, pulls public trend sources, scores and ranks them with an LLM by niche, generates angles and multi-format drafts, then writes everything into a local SQLite store and a daily brief. By design it only automates the low-risk parts — collection and drafting — and keeps judgment, editing, posting, and replies human-led, so the agent workflow never becomes platform risk. (Platform, account, and positioning details are stripped to protect a personal side-project.)",
    },
    terminal: {
      title: "trendcli",
      lines: [
        "$ trendcli brief",
        "  scanned 5 public feeds · 42 candidates",
        "  scored by niche → kept top 6",
        "  drafted 6 angles, 3 formats each",
        "  → daily_brief.md ready for review",
        "  auto-post: DISABLED (human only)",
      ],
    },
    pipeline: [
      { label: { zh: "公開來源", en: "Public feeds" }, note: { zh: "只讀公開資料，不碰私密內容。", en: "Reads public data only — never private content." } },
      { label: { zh: "評分起草", en: "Score & draft" }, note: { zh: "LLM 依利基評分，產生角度與草稿。", en: "LLM scores by niche, drafts angles + copy." } },
      { label: { zh: "人工發布", en: "Human publish" }, note: { zh: "判斷、發布與互動全留給人。", en: "Judgment, posting, and replies stay human." } },
    ],
    metrics: [
      { value: "8", label: { zh: "CLI 指令", en: "CLI commands" } },
      { value: "6", label: { zh: "提示模板", en: "prompt templates" } },
      { value: "0", label: { zh: "自動發布動作", en: "auto-posting actions" } },
    ],
    highlights: [
      { zh: "八個 CLI 指令一條龍：init、scan、list、ideate、draft、brief、log、weekly review。",
        en: "Eight CLI commands end to end: init, scan, list, ideate, draft, brief, log, weekly review." },
      { zh: "本機 SQLite 保存 trends、angles、drafts、briefs 與成效紀錄，能回頭看哪些角度真的有效。",
        en: "A local SQLite DB stores trends, angles, drafts, briefs, and performance logs — so you can see which angles actually worked." },
      { zh: "每天一個 brief 指令，就把掃描、精選、角度、草稿與配圖建議一次做完。",
        en: "A single daily `brief` command runs scan, curation, angles, drafts, and visual suggestions in one pass." },
      { zh: "文件明文禁止自動發布——代理只負責蒐集與起草，從不碰帳號互動。",
        en: "Docs explicitly forbid auto-posting — the agent only collects and drafts, never touching account interactions." },
      { zh: "只讀公開資料、不爬私密內容；帳號與定位資訊不進版本庫。",
        en: "Reads only public data, never private content; account and positioning details stay out of the repo." },
    ],
    tech: ["Python", "CLI", "SQLite", "YAML config", "LLM scoring", "Scheduled task"],
    status: { zh: "可用的 CLI 工具", en: "Working CLI tool" },
  },

  /* 08 ───────────────────────────────────────────────────────── */
  {
    slug: "raw-viewer",
    category: "agent-apps",
    year: "2026",
    source: "Code",
    title: {
      zh: "RAW Viewer — 漸進式載入的相機 RAW 瀏覽器",
      en: "RAW Viewer — Progressive-Loading Camera RAW Browser",
    },
    tagline: {
      zh: "一個反應很快的桌面 RAW 瀏覽器：只解碼螢幕用得到的像素，就能馬上顯示出相機 JPEG 等級的畫質——只有等你放大時，才真的去做整張全解碼。",
      en: "A snappy desktop RAW viewer that shows full camera-JPEG quality instantly by decoding only the pixels your screen needs — paying the full price only when you zoom.",
    },
    description: {
      zh: "一個輕量的 Tkinter 桌面應用，可以瀏覽、也能簡單編輯 25 種以上的相機 RAW 格式。核心的巧思是一條漸進式載入的管線：先在每個 RAW 裡找出最大的那張內嵌 JPEG 預覽，用草稿解析度解碼（大概 1/4 感光元件尺寸、快約 5 倍），在這張比較小的圖上做 ICC 色彩管理（又快約 10 倍），同時先把相鄰的檔案預抓起來，左右切換就幾乎不用等；只有等使用者真的放大時，才在背景執行緒重新做一次全解析度解碼。",
      en: "A lightweight Tkinter desktop app for browsing and lightly editing 25+ camera RAW formats. Its core trick is a progressive-loading pipeline: scan each RAW for the largest embedded JPEG preview, decode it at draft resolution (~¼ sensor size, ~5× faster), color-manage the smaller image (~10× faster), prefetch neighbors for instant Left/Right navigation, and only re-decode at full resolution in a background worker when the user zooms.",
    },
    highlights: [
      { zh: "草稿解碼 + 小圖色彩管理 + 放大時背景全解碼，初始顯示快約 5–10 倍。",
        en: "Draft decode + color-manage-small + background full-res on zoom → ~5–10× faster initial display." },
      { zh: "支援 25 種以上 RAW 格式，統一在同一個檢視清單。",
        en: "Covers 25+ RAW formats unified behind one view list." },
      { zh: "並行架構：相鄰檔背景預抓、磁碟預覽快取、位元組 LRU 快取。",
        en: "Concurrency: background neighbor prefetch, disk preview cache, byte LRU cache." },
      { zh: "約 3,100 行的單檔應用，執行緒就算崩了也能自行復原。",
        en: "A ~3,100-line single-file app with crash-resilient workers." },
      { zh: "純本機桌面工具，全程不連網、不上傳任何照片，檔案完全留在你電腦裡。",
        en: "A purely local desktop tool — no network calls, nothing uploaded; your photos never leave the machine." },
    ],
    tech: ["Python", "Tkinter", "rawpy / libraw", "Pillow", "NumPy", "Claude Code"],
    status: { zh: "個人工具（開源）", en: "Personal tool (open-source)" },
  },

  /* 09 ───────────────────────────────────────────────────────── */
  {
    slug: "writers-guild",
    category: "skills-tooling",
    year: "2026",
    source: "Code",
    title: {
      zh: "Writers Guild 寫作公會 — 根絕「AI 味」的 Claude 技能",
      en: "Writers Guild — A Claude Skill That Kills \"AI Writing Smell\"",
    },
    tagline: {
      zh: "一個開源的 Claude 技能，逼每一篇貼文都寫得像真人——25 種聲音原型、三套幽默體系，外加一個會幫草稿的「AI 味」打 0–100 分的掃描器。",
      en: "An open-source Claude skill that forces every post to sound like a real author — 25 voice archetypes, three humor systems, and a programmatic scanner that scores a draft's \"AI smell\" 0–100.",
    },
    description: {
      zh: "一個打包好的 Claude 技能，用六個階段的流程，寫出讀起來不像 AI 的社群貼文和長文：先審題、把 AI 慣用的套路擋掉，挑 1–2 種聲音原型，在三條硬規則下動筆，最後再對著一份分層的黑名單掃描、重寫。它還附了一支獨立的 Python 掃描器，會針對中英文的紅旗詞、句子長短的落差、emoji、破折號逐一評分，並列出該怎麼改。這個技能本身也被我那套「Facebook 粉絲專頁自主內容引擎」拿去重用——剛好證明了技能是可以彼此組合的。",
      en: "A packaged Claude skill that produces social and long-form writing that doesn't read as AI: it interrogates the topic to reject AI tropes, picks 1–2 voice archetypes, drafts under three hard rules, then scans and rewrites against a layered blacklist. It ships a standalone Python scanner that scores Chinese + English red-flag terms, sentence-length burstiness, emoji, and em-dashes, and lists fixes. The skill is reused inside my own autonomous Facebook-page content engine — proof of real composability.",
    },
    terminal: {
      title: "ai-tell-scanner.py",
      lines: [
        "$ python ai-tell-scanner.py --file draft.md",
        "  AI 味分數 (AI-smell score): 16 / 100   ✓ PASS (≤25)",
        "  burstiness ........ 0.71   ok",
        "  red-flag terms .... 1      「不僅...更」",
        "  em-dash / emoji ... 0 / 0  ok",
        "  → ship it.",
      ],
    },
    highlights: [
      { zh: "25 種結構化「聲音」原型（中英），各有招牌句法、節奏與調色指南。",
        en: "25 structural voice archetypes (zh + en), each with signature syntax, rhythm, and color-mixing guidance." },
      { zh: "三套完整幽默手冊（台式／美式／英式），含跨語言移植技巧。",
        en: "Three full humor playbooks (Taiwanese / American / British) with cross-language porting techniques." },
      { zh: "獨立、可腳本化的 AI 味掃描器，產出 0–100 分與可執行的紅旗清單。",
        en: "A standalone, scriptable AI-smell scanner producing a 0–100 score and actionable red flags." },
      { zh: "強制 14 點發佈前檢查表與 11 條「絕對不做」清單，作為代理的品質關卡。",
        en: "An enforced 14-point pre-publish checklist and an 11-item \"Hard No\" list as the agent's quality gate." },
      { zh: "掃描器提供客觀、可自動化的成功標準（AI 味 ≤25 分），讓代理能自己判斷「這篇改好了沒」，而不是靠感覺。",
        en: "The scanner gives an objective, automatable success metric (AI-smell ≤25), so the agent decides for itself whether a draft is done — not by vibes." },
    ],
    tech: ["Claude Skill (SKILL.md)", "Python", "Quality Gates", "MIT Open-Source"],
    status: { zh: "已發佈（開源、安裝中使用）", en: "Shipped (open-source, installed & in use)" },
  },

  /* 10 ───────────────────────────────────────────────────────── */
  {
    slug: "yt-batch-downloader",
    category: "agent-apps",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "YT 批次下載器 — 有佇列與即時進度的本機下載台",
      en: "YT Batch Downloader",
    },
    tagline: {
      zh: "把 yt-dlp 包成一個本機 Web 介面：分析、選格式、排隊下載，還用 SSE 即時回報進度與速度。",
      en: "Wraps yt-dlp in a local web UI: analyze, pick formats, queue downloads, and stream realtime progress and speed over SSE.",
    },
    description: {
      zh: "一個本機的媒體下載工具，把 yt-dlp 的媒體分析、格式選擇、字幕／縮圖選項、下載佇列、取消／清理與即時進度，全部收進一個 Flask Web UI。工程重點在「即時感」與「不卡死」：用 SSE 把進度、速度與佇列狀態推到前端，用背景執行緒加佇列控制同時下載數，並支援取消與本機歷史管理。",
      en: "A local media-download tool that wraps yt-dlp's analysis, format selection, subtitle/thumbnail options, download queue, cancel/cleanup, and live progress into one Flask web UI. The engineering focus is responsiveness without locking up: SSE pushes progress, speed, and queue state to the frontend; background threads plus a queue cap concurrency; and it supports cancellation and local history.",
    },
    terminal: {
      title: "yt-batch",
      lines: [
        "$ analyze  <url>   (playlist · 12 items)",
        "  formats: 1080p / 720p / audio",
        "  queued 12 · concurrency 3",
        "  ▸ 04/12   58%   3.2 MB/s   (SSE live)",
        "  ✓ done · saved to ./downloads",
      ],
    },
    pipeline: [
      { label: { zh: "分析", en: "Analyze" }, note: { zh: "讀取媒體資訊、格式、字幕與縮圖候選。", en: "Reads media info, formats, subtitles, and thumbnails." } },
      { label: { zh: "排隊", en: "Queue" }, note: { zh: "放進本機佇列並限制同時下載數。", en: "Adds to a local queue and caps concurrency." } },
      { label: { zh: "即時追蹤", en: "Track live" }, note: { zh: "用 SSE 推送進度、速度與完成狀態。", en: "SSE pushes progress, speed, and completion." } },
    ],
    highlights: [
      { zh: "用 SSE 把下載進度、速度與佇列狀態即時推到前端，不用一直輪詢。",
        en: "Streams progress, speed, and queue state to the UI over SSE — no constant polling." },
      { zh: "背景執行緒加佇列控制同時下載數，可取消、可清理，不會把機器塞爆。",
        en: "Background threads plus a queue cap concurrency, with cancel and cleanup so it never floods the machine." },
      { zh: "支援格式選擇、音訊輸出、字幕、縮圖，並自動判斷播放清單或單支影片。",
        en: "Format selection, audio output, subtitles, thumbnails, and automatic playlist-vs-single-video handling." },
    ],
    tech: ["Python", "Flask", "yt-dlp", "SSE", "Threading / Queue", "ffmpeg"],
    status: { zh: "可用的本機媒體工具", en: "Working local media tool" },
  },

  /* 11 ───────────────────────────────────────────────────────── */
  {
    slug: "pdf-distiller",
    category: "agent-apps",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "PDF 蒸餾器 — 瀏覽器本機的頁面抽取工具",
      en: "PDF Distiller",
    },
    tagline: {
      zh: "上傳 PDF、輸入頁碼範圍，一鍵輸出成新的 PDF 或 JPG／PNG 壓縮包——全程在瀏覽器本機處理。",
      en: "Upload a PDF, type page ranges, and export a new PDF or a JPG/PNG ZIP — all processed locally in the browser.",
    },
    description: {
      zh: "一個 React/Vite 的文件小工具：上傳 PDF、輸入要的頁碼範圍，選擇輸出成新 PDF、JPG 壓縮包或 PNG 壓縮包。它刻意用前端的 PDF 與 ZIP 函式庫在瀏覽器裡處理，檔案不離開本機、也不用裝笨重的桌面套件。",
      en: "A React/Vite document utility: upload a PDF, type the page ranges you want, and export a new PDF, a JPG ZIP, or a PNG ZIP. It deliberately runs the PDF and ZIP work client-side in the browser — files never leave the machine and there's no heavyweight desktop suite to install.",
    },
    pipeline: [
      { label: { zh: "載入", en: "Load" }, note: { zh: "在本機選一個 PDF。", en: "Pick a PDF locally." } },
      { label: { zh: "選頁", en: "Select pages" }, note: { zh: "輸入頁碼範圍並選輸出格式。", en: "Enter page ranges and choose a format." } },
      { label: { zh: "輸出", en: "Export" }, note: { zh: "在本機產生新文件或圖片壓縮包。", en: "Generate a new local document or image archive." } },
    ],
    metrics: [
      { value: "3", label: { zh: "輸出格式", en: "export formats" } },
      { value: "100%", label: { zh: "瀏覽器本機處理", en: "in-browser, client-side" } },
    ],
    highlights: [
      { zh: "頁碼範圍選取，從大型 PDF 快速抽出指定頁面。",
        en: "Page-range selection pulls exactly the pages you want out of a large PDF." },
      { zh: "三種輸出：新 PDF、JPG 壓縮包、PNG 壓縮包，覆蓋常見的文件再利用。",
        en: "Three outputs — new PDF, JPG ZIP, PNG ZIP — covering common document-reuse needs." },
      { zh: "全程在瀏覽器本機處理，檔案不上傳、也不依賴大型桌面套件。",
        en: "Everything runs client-side in the browser — no uploads, no heavyweight desktop dependencies." },
    ],
    tech: ["React", "TypeScript", "Vite", "pdf-lib", "pdfjs-dist", "JSZip"],
    status: { zh: "可用的本機文件工具", en: "Working local document tool" },
  },

  /* 12 ───────────────────────────────────────────────────────── */
  {
    slug: "flickr-album-downloader",
    category: "agent-apps",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "Flickr 相簿下載器 — 批次抓圖、自動整理",
      en: "Flickr Album Downloader",
    },
    tagline: {
      zh: "貼上公開相簿網址，就批次抓回最大尺寸、自動整理成乾淨資料夾——還附三種介面與單元測試。",
      en: "Paste public album URLs and it batch-grabs the largest size into clean, auto-named folders — with three UIs and unit tests.",
    },
    description: {
      zh: "一個 Windows/Python 的批次下載工具：貼上一個或多個公開 Flickr 相簿網址、選好目的資料夾，它就排隊把照片抓回來、抓最大可用尺寸，並依相簿與照片資訊建立好讀的資料夾與檔名。比較有意思的是它做了三套介面——新版本機 Web UI、Python/Tkinter 桌面版、以及 PowerShell/WinForms 備援——還寫了單元測試，換環境也跑得起來。只碰公開相簿，不存帳號、cookie 或私人網址。",
      en: "A Windows/Python batch downloader: paste one or more public Flickr album URLs, choose a destination, and it queues the photos at the largest available size, building readable folders and filenames from album/photo metadata. The interesting part is it ships three interfaces — a modern local web UI, a Python/Tkinter desktop version, and a PowerShell/WinForms fallback — plus unit tests, so it runs across environments. It touches public albums only — no accounts, cookies, or private URLs stored.",
    },
    terminal: {
      title: "flickr-dl",
      lines: [
        "$ flickrdl  <album-url> ×3",
        "  resolved 3 albums · 214 photos",
        "  size: largest available",
        "  → ./Albums/<name>/   (auto-named)",
        "  ✓ 214/214 done",
      ],
    },
    pipeline: [
      { label: { zh: "輸入", en: "Input" }, note: { zh: "貼上公開相簿網址、選目的資料夾。", en: "Paste public album URLs, pick a folder." } },
      { label: { zh: "解析", en: "Resolve" }, note: { zh: "讀相簿與照片資訊，選最大可用尺寸。", en: "Read metadata, choose the largest size." } },
      { label: { zh: "整理", en: "Organize" }, note: { zh: "批次下載並建立清楚的資料夾結構。", en: "Batch-download into a clean folder structure." } },
    ],
    highlights: [
      { zh: "一次貼多個相簿，排隊下載並顯示整體進度。",
        en: "Paste multiple albums at once; they queue with overall progress." },
      { zh: "依相簿與照片資訊自動建立好讀的資料夾與檔名，省掉事後整理。",
        en: "Auto-builds readable folders and filenames from metadata, skipping manual cleanup." },
      { zh: "三套介面（Web UI／Tkinter／PowerShell-WinForms 備援）＋單元測試，換環境也能跑。",
        en: "Three UIs (web / Tkinter / PowerShell-WinForms fallback) plus unit tests, so it runs across environments." },
      { zh: "只碰公開相簿——不存帳號、cookie 或私人網址。",
        en: "Public albums only — it stores no accounts, cookies, or private URLs." },
    ],
    tech: ["Python", "PowerShell", "Local Web UI", "Tkinter", "WinForms", "Unit Tests"],
    status: { zh: "可用的實用工具", en: "Working utility" },
  },

  /* 13 ───────────────────────────────────────────────────────── */
  {
    slug: "web-design-review",
    category: "skills-tooling",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "web-design-review — 專家級網頁設計審視技能",
      en: "web-design-review — An Expert Web-Critique Skill",
    },
    tagline: {
      zh: "一個打包好的 Claude 技能，讓代理化身成一位由四種角色組成的設計總監，產出一份按嚴重度分級、涵蓋五大面向的設計審視報告。",
      en: "A packaged Claude skill that turns the agent into a four-persona design director, delivering severity-ranked design reviews across five dimensions.",
    },
    description: {
      zh: "一個完整、可以發佈的 Claude 技能：讓代理同時戴上視覺設計總監／UX 研究員／前端工程師／品牌顧問四頂帽子，產出一份涵蓋「視覺與品牌、UI/UX、無障礙 A11y、效能 SEO 轉換、資安」五大面向的深度報告。它定義了五個審視步驟、P0/P1/P2 的嚴重度分級、評分量表跟報告範本，還附了五份參考知識檔。（順帶一提：你現在看的這個作品集，就是用它審過的。）",
      en: "A complete, shippable Claude skill: the agent blends a visual-design-director / UX-researcher / front-end-engineer / brand-consultant and produces deep reports across five dimensions — aesthetics & brand, UI/UX, accessibility (A11y), performance-SEO-conversion, and security. It defines a 5-step flow, P0/P1/P2 severity grading, a scoring rubric, a report template, and five reference files. (Incidentally: the very portfolio you're viewing was audited with it.)",
    },
    highlights: [
      { zh: "五大審視面向，包含經常被略過的「資安」視角。",
        en: "Five review dimensions including the frequently-omitted security lens." },
      { zh: "漸進式揭露：只在需要時載入參考檔，控制脈絡用量。",
        en: "Progressive disclosure: reference files load only when needed, controlling context budget." },
      { zh: "誠實守則：不評論看不到的東西，伺服器端資安明確標示為「無法驗證」。",
        en: "Honesty guards: don't review what you can't see; mark server-side security as unverifiable." },
      { zh: "打包成可分發的 .skill；立基於 Rams、Swiss Design、Apple HIG、Refactoring UI、Nielsen、Baymard。",
        en: "Bundled into a distributable .skill; grounded in Rams, Swiss Design, Apple HIG, Refactoring UI, Nielsen, Baymard." },
      { zh: "硬性品質門檻：每條建議都必須具體、可量化、講清楚取捨，禁用「更現代」「更乾淨」這類沒資訊量的空話。",
        en: "A hard quality bar: every suggestion must be concrete, quantified, and trade-off-aware — banning empty words like \"more modern\" or \"cleaner\"." },
    ],
    tech: ["Claude Skill", "Progressive Disclosure", "Severity Rubric", "Design Systems"],
    status: { zh: "已發佈（打包並安裝）", en: "Shipped (packaged & installed)" },
    images: [
      { src: "assets/img/projects/web-design-review/report.webp",
        alt: { zh: "用此技能審視本作品集後產出的報告", en: "A review report this skill produced for this portfolio" },
        caption: { zh: "這個技能審視本作品集後產出的報告（五大面向、P0/P1/P2 分級）。", en: "The report this skill produced when reviewing this very portfolio (five dimensions, P0/P1/P2)." } },
    ],
  },

  /* 14 ───────────────────────────────────────────────────────── */
  {
    slug: "video-contest",
    category: "skills-tooling",
    year: "2026",
    source: "Cowork",
    title: {
      zh: "影片拍攝競賽 — 自動化評審工作台",
      en: "Video Shooting Contest — Automated Judging Harness",
    },
    tagline: {
      zh: "跑一次 PowerShell，就把每支參賽隊伍的影片、文件和海報，從各個平台一次抓齊、整理成一個點開就能評分的評審桌面。",
      en: "One PowerShell run pulls every team's films, docs, and posters from multiple platforms into a tidy, click-to-review judging desk.",
    },
    description: {
      zh: "一個能自己搞定一切的競賽評審工具，參賽隊伍橫跨好幾個國家。一支 PowerShell 腳本會自己把需要的工具裝好（yt-dlp、gdown、ffmpeg，還準備了可攜版備援），再批次下載每一隊的參賽影片、幕後、流程文件和海報，分門別類整理成「一隊一個資料夾」。另外配一頁用顏色標記的 HTML 索引，讓評審可以同時連到本機檔案和原始的線上來源，DQ（失格）的也都標好。",
      en: "A self-contained contest-judging toolkit spanning international teams. A single PowerShell script self-provisions its toolchain (yt-dlp, gdown, ffmpeg with portable fallbacks) and bulk-downloads each team's submission video, behind-the-scenes, process doc, and poster into a per-team folder structure. A companion color-coded HTML index links judges to both local files and original online sources, with DQ flags noted.",
    },
    highlights: [
      { zh: "自我修復的相依安裝：兩條獨立管道都試過才放棄。",
        en: "Self-healing dependency install: tries two independent channels before giving up." },
      { zh: "冪等可續傳，跳過已下載項目。",
        en: "Idempotent resume that skips already-downloaded items." },
      { zh: "用檔頭魔術位元組辨識真實檔案類型（雲端硬碟不回傳副檔名）。",
        en: "Detects true file type from magic bytes (cloud drive returns no extension)." },
      { zh: "實跑成績 81/88 成功，7 個優雅失敗都附上可行動的細節。",
        en: "Real run: 81/88 succeeded, with 7 graceful failures each surfaced with actionable detail." },
      { zh: "多執行緒平行下載並節流，遇到限制時自動優雅退化為循序——跑得快，又不會把來源打掛。",
        en: "Throttled, multi-threaded downloads that automatically degrade to sequential under limits — fast, without hammering the source." },
    ],
    tech: ["PowerShell", "Python (yt-dlp / gdown)", "ffmpeg", "HTML"],
    status: { zh: "生產中（內部工具）", en: "Production (internal tool)" },
    images: [
      { src: "assets/img/projects/video-contest/judging.webp",
        alt: { zh: "自動彙整的評審索引頁（隊伍名已匿名）", en: "Auto-assembled judging index (team names anonymized)" },
        caption: { zh: "腳本自動下載、彙整成的評審索引頁（隊伍名稱已匿名處理）。", en: "The judging index the script auto-downloads and assembles (team names anonymized)." } },
    ],
  },

];
