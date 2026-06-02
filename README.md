# Agentic Engineering Portfolio

A data-driven, bilingual (繁中 / EN) personal portfolio. **No build step, no framework, no dependencies** — just static HTML/CSS/JS. New projects are added by editing one data file and dropping in images. Hostable anywhere (GitHub Pages, Netlify, Cloudflare Pages, or a USB stick).

---

## 快速上手 / Quick start

**看一下成果 / Preview it**

```powershell
# 任一靜態伺服器皆可。最簡單：
python -m http.server 5517
# 然後打開 http://localhost:5517
```

或直接用瀏覽器打開 `index.html`（雙擊即可，連伺服器都不用）。

---

## ➕ 新增一個專案 / Add a new project

這是你最常做的事。**只要兩步：**

1. **編輯 [`data/projects.js`](data/projects.js)** — 複製任何一個既有的專案物件，改掉欄位即可。**陣列順序 = 顯示順序**（目前依「難度／規模」由高到低排列；把新專案放到它該在的位置）。`featured: true` 只會放大卡片，**不再改變順序**。
2. **放圖片** 到 `assets/img/projects/<slug>/`，並在該專案的 `images` 欄位用路徑引用。

> 之後在別台電腦想新增專案？把整個資料夾搬過去（或 git clone），重複上面兩步就好。不需要安裝任何東西。

### 專案資料結構 / Project schema

每個文字欄位都是雙語物件 `{ zh: "...", en: "..." }`。

```js
{
  slug:        "my-project",            // 唯一；同時是圖片資料夾名稱
  category:    "agentic-systems",       // 見下方分類清單
  featured:    true,                    // 選填：只放大卡片（不改變順序）
  confidential:false,                   // 選填：顯示「已去識別化」徽章 + 聲明
  year:        "2026",
  source:      "Code",                  // "Code" | "Cowork" | 自由文字
  title:       { zh: "", en: "" },
  tagline:     { zh: "", en: "" },      // 卡片副標，一句話
  description: { zh: "", en: "" },      // 細節頁，2–4 句
  highlights:  [ { zh: "", en: "" } ],  // 工程亮點（條列）
  tech:        [ "Python", "MCP" ],     // 技術標籤（不分語言）
  status:      { zh: "", en: "" },

  // --- 以下皆為選填的「視覺元件」，用哪個看專案性質，能讓卡片不千篇一律 ---
  links:    [ { label: "GitHub", url: "https://..." } ],
  images:   [ { src: "assets/img/projects/my-project/hero.png",
               alt: { zh:"", en:"" }, caption: { zh:"", en:"" } } ],
  pipeline: [ { label:{zh:"",en:""}, note:{zh:"",en:""} } ],  // 流程圖（多代理流水線）
  metrics:  [ { value:"99.8%", label:{zh:"",en:""} } ],        // 大數字統計
  terminal: { title:"scanner.py", lines:[ "$ ...", "  ✓ PASS" ] }, // 仿終端機
  logos:    [ "assets/img/projects/my-project/x.svg" ],        // 一排整合 logo
}
```

**視覺優先序**：有 `images` → 用第一張圖當卡片封面；否則有 `pipeline` → 顯示流程預覽；都沒有 → 自動產生乾淨的編號封面。所以**沒有圖片的專案也好看**。

### 分類 / Categories

定義在 [`data/i18n.js`](data/i18n.js) 的 `CATEGORIES`。目前有：

| id | 中 | EN |
|---|---|---|
| `agentic-systems` | 自主代理系統 | Agentic Systems |
| `skills-tooling` | 代理技能與工具 | Skills & Agent Tooling |
| `agent-apps` | 代理打造的應用 | Agent-Built Applications |
| `ai-creative` | AI 影像創作流程 | AI Creative Pipelines |

要加新分類：在 `CATEGORIES` 加一筆，並在 `styles.css` 為它加一個 `.cover--<id>` 漸層（選填）。

---

## ✏️ 改個人資料 / Edit your profile

全部在 [`data/profile.js`](data/profile.js)：姓名、email、連結、自我介紹、能力區塊、統計數字、技術棧。

> ⚠️ **發佈前請確認**：`name`、`email`、`links` 目前是從專案檔案推斷出來的，請核對。

---

## 🗂 檔案結構 / Structure

```
portfolio/
├── index.html              # 外殼 + 字體 + 掛載點
├── data/
│   ├── profile.js          # 個人資料（改這裡）
│   ├── projects.js         # 專案內容（新增專案改這裡）★
│   └── i18n.js             # 介面字串 + 分類
├── assets/
│   ├── css/styles.css      # 設計系統（色彩、字體、版面）
│   ├── js/main.js          # 渲染引擎 + 語言切換
│   └── img/projects/<slug> # 各專案圖片
└── README.md
```

---

## 🌐 雙語系統 / Bilingual

- 預設繁中；右上角切換鈕可換英文，選擇記在 `localStorage`。
- 切換語言時整頁文字由同一份資料重新渲染。
- 排版細節：**中文用無襯線（Noto Sans TC）、英文用襯線（Fraunces）顯示標題**，各自有獨立的視覺個性。

---

## 🚀 部署 / Deploy

純靜態，任選其一：

- **GitHub Pages** — push 到 repo，Settings → Pages → 指向 `main` / root。
- **Netlify / Cloudflare Pages** — 拖曳整個資料夾，或連 git repo，無需 build 指令。
- **任何靜態主機 / 內網 / 隨身碟** — 直接放上去即可。

---

## 🔒 機密專案處理 / Confidential projects

`confidential: true` 的專案會自動：顯示「公司專案 · 已去識別化」徽章、在細節頁加上一段聲明、且**不使用真實產品截圖**（改用抽象的流程圖 + 去識別化文字描述）。新增這類專案時請維持同樣原則：不放真實產品名稱、商業細節或客戶資料。
