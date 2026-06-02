/* =============================================================================
   i18n.js — Static UI strings + category taxonomy (bilingual zh-TW / en)
   -----------------------------------------------------------------------------
   This file holds only the site's *chrome* (navigation, section headings,
   button labels). Project content lives in `projects.js`; profile content in
   `profile.js`. To add a new category, add an entry to CATEGORIES below and use
   its `id` in a project's `category` field.
   ============================================================================= */

window.CATEGORIES = [
  { id: "agentic-systems", label: { zh: "自主代理系統", en: "Agentic Systems" } },
  { id: "skills-tooling",  label: { zh: "代理技能與工具", en: "Skills & Agent Tooling" } },
  { id: "agent-apps",      label: { zh: "代理打造的應用", en: "Agent-Built Applications" } },
  { id: "ai-creative",     label: { zh: "AI 影像創作流程", en: "AI Creative Pipelines" } },
];

window.I18N = {
  // --- meta ---
  docTitle: {
    zh: "H.Y. — 代理式工程師 · Agentic Engineering Portfolio",
    en: "H.Y. — Agentic Engineer · Portfolio",
  },

  // --- nav ---
  nav_work:    { zh: "作品", en: "Work" },
  nav_approach:{ zh: "工作方式", en: "Approach" },
  nav_about:   { zh: "關於", en: "About" },
  nav_contact: { zh: "聯絡", en: "Contact" },
  langToggle:  { zh: "EN", en: "中" },           // shows the language you switch TO
  langToggleAria: { zh: "Switch to English", en: "切換為繁體中文" },

  // --- hero ---
  hero_kicker:  { zh: "Agentic Engineering Portfolio", en: "Agentic Engineering Portfolio" },
  hero_cta_work:    { zh: "查看作品", en: "View work" },
  hero_cta_contact: { zh: "聯絡我", en: "Get in touch" },
  hero_scroll:  { zh: "向下捲動", en: "Scroll" },

  // --- approach ---
  approach_kicker: { zh: "工作方式", en: "Approach" },
  approach_title:  { zh: "我用 AI 代理做出完整的系統，而不只是寫提示詞。",
                     en: "I ship complete systems with AI agents — not just prompts." },

  // --- work ---
  work_kicker: { zh: "精選作品", en: "Selected Work" },
  work_title:  { zh: "從打造到運行，AI 代理一手包辦", en: "Systems built by — and run by — agents" },
  work_intro:  { zh: "從自主的多代理流水線、排程代理、可重複使用的 Claude 技能，到用 AI 編碼代理蓋出來的複雜應用。",
                 en: "Autonomous multi-agent pipelines, scheduled agents, reusable Claude skills, and complex applications built by AI coding agents." },
  filter_all:  { zh: "全部", en: "All" },

  // --- project card / detail ---
  badge_confidential: { zh: "公司專案 · 已去識別化", en: "Confidential · Anonymized" },
  card_view:    { zh: "查看細節", en: "View details" },
  detail_overview:   { zh: "概述", en: "Overview" },
  detail_highlights: { zh: "工程亮點", en: "Engineering Highlights" },
  detail_stack:      { zh: "技術棧", en: "Stack" },
  detail_links:      { zh: "連結", en: "Links" },
  detail_close:      { zh: "關閉", en: "Close" },
  detail_confidential_note: {
    zh: "此為現職公司專案。以下名稱、畫面與描述均已去識別化處理，僅呈現工程方法與架構，不揭露產品名稱、商業細節或真實資料。",
    en: "This is a current employer project. Names, visuals, and descriptions below are anonymized to convey engineering approach and architecture only — no product name, business detail, or real data is disclosed.",
  },
  source_label: { zh: "來源", en: "Source" },
  status_label: { zh: "狀態", en: "Status" },
  year_label:   { zh: "年份", en: "Year" },

  // --- about ---
  about_kicker: { zh: "關於", en: "About" },

  // --- contact ---
  contact_kicker: { zh: "聯絡", en: "Contact" },
  contact_title:  { zh: "您在找能打造自主系統的 AI 落地師嗎？",
                    en: "Looking for an engineer who ships AI as autonomous systems?" },
  contact_text:   { zh: "我對 agentic engineering、AI 自動化與 AI 工具開發的職位特別有興趣。歡迎來信。",
                    en: "I'm especially interested in roles in agentic engineering, AI automation, and AI tooling. Let's talk." },
  contact_email:  { zh: "寄信給我", en: "Email me" },

  // --- footer ---
  footer_built: { zh: "這個網站採資料驅動的純靜態架構，不需建置步驟就能隨時新增專案。",
                  en: "Built as a data-driven static site — new projects drop in with no build step." },
};
