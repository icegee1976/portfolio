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

  /* 07 ───────────────────────────────────────────────────────── */
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

  /* 08 ───────────────────────────────────────────────────────── */
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

  /* 09 ───────────────────────────────────────────────────────── */
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
