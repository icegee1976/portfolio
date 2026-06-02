/* =============================================================================
   main.js — render engine
   Reads window.PROFILE / PROJECTS / CATEGORIES / I18N and renders the page.
   Bilingual: toggling language re-renders all text from the same data.
   ============================================================================= */
(function () {
  "use strict";

  var LS_KEY = "portfolio-lang";
  var lang = localStorage.getItem(LS_KEY);
  if (lang !== "zh" && lang !== "en") {
    lang = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "zh"; // default zh
  }

  /* ----------------------------- helpers --------------------------------- */
  function pick(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] != null ? v[lang] : (v.en != null ? v.en : (v.zh != null ? v.zh : ""));
  }
  function t(key) { var o = window.I18N[key]; return o ? pick(o) : key; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function catLabel(id) {
    var c = (window.CATEGORIES || []).find(function (x) { return x.id === id; });
    return c ? pick(c.label) : id;
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var MOTIF = '<svg class="cover__motif" viewBox="0 0 200 200" fill="none" aria-hidden="true">' +
    '<circle cx="40" cy="40" r="6" fill="#2E4A7A"/><circle cx="120" cy="70" r="6" fill="#2E4A7A"/>' +
    '<circle cx="160" cy="150" r="6" fill="#2E4A7A"/><circle cx="60" cy="140" r="6" fill="#2E4A7A"/>' +
    '<path d="M40 40 L120 70 L160 150 M120 70 L60 140 L40 40" stroke="#2E4A7A" stroke-width="1.5"/></svg>';

  /* ----------------------------- component html -------------------------- */
  function pipelineHTML(stages) {
    return '<div class="pipeline">' + stages.map(function (s, i) {
      return '<div class="pipeline__stage"><div class="pipeline__n">' + pad(i + 1) + '</div>' +
        '<div class="pipeline__label">' + esc(pick(s.label)) + '</div>' +
        '<div class="pipeline__note">' + esc(pick(s.note)) + '</div></div>';
    }).join("") + '</div>';
  }
  function metricsHTML(ms) {
    return '<div class="metrics">' + ms.map(function (m) {
      return '<div class="metric"><div class="metric__value">' + esc(m.value) + '</div>' +
        '<div class="metric__label">' + esc(pick(m.label)) + '</div></div>';
    }).join("") + '</div>';
  }
  function terminalHTML(term) {
    var body = term.lines.map(function (l) {
      var line = esc(l);
      if (l.indexOf("✓") !== -1 || /ship it/.test(l)) line = '<span class="ok">' + line + '</span>';
      return line;
    }).join("\n");
    return '<div class="terminal"><div class="terminal__bar"><i></i><i></i><i></i>' +
      '<span class="terminal__title">' + esc(term.title) + '</span></div>' +
      '<div class="terminal__body">' + body + '</div></div>';
  }
  function logosHTML(logos) {
    return '<div class="logos"><span class="logos__label">Feeds</span>' +
      logos.map(function (s) { return '<img src="' + esc(s) + '" alt="" loading="lazy">'; }).join("") + '</div>';
  }
  function techChips(tech, limit) {
    var arr = limit ? tech.slice(0, limit) : tech;
    return arr.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join("");
  }
  function coverHTML(p, no) {
    return '<div class="cover cover--' + p.category + '">' + MOTIF +
      '<span class="cover__no">' + no + '</span>' +
      '<span class="cover__cat">' + esc(catLabel(p.category)) + '</span></div>';
  }
  function pipelineCoverHTML(p) {
    var last = p.pipeline.length - 1;
    var items = p.pipeline.map(function (s, i) {
      return '<li' + (i === last ? ' class="last"' : '') + '>' + esc(pick(s.label)) + '</li>';
    }).join("");
    return '<div class="cover cover--flow cover--' + p.category + '">' + MOTIF +
      '<span class="cover__cat">' + esc(catLabel(p.category)) + '</span>' +
      '<ol class="flowmini">' + items + '</ol></div>';
  }
  function mediaHTML(p, no) {
    if (p.images && p.images.length) {
      var im = p.images[0];
      return '<img src="' + esc(im.src) + '" alt="' + esc(pick(im.alt)) + '" loading="lazy">';
    }
    if (p.pipeline && p.pipeline.length) return pipelineCoverHTML(p);
    return coverHTML(p, no);
  }

  /* ----------------------------- sections -------------------------------- */
  function orderedProjects() {
    // Display order = array order in projects.js (sorted by difficulty/scale).
    // `featured` only controls card size, not position.
    return window.PROJECTS.slice();
  }

  function renderHero() {
    var P = window.PROFILE;
    var stats = P.stats.map(function (s) {
      return '<div class="stat"><div class="stat__value">' + esc(s.value) + '</div>' +
        '<div class="stat__label">' + esc(pick(s.label)) + '</div></div>';
    }).join("");
    var tools = '<span class="toolbelt__label">Stack</span>' +
      P.toolbelt.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join("");
    $("#hero").innerHTML =
      '<div class="wrap hero__grid"><div>' +
        '<p class="kicker">' + t("hero_kicker") + '</p>' +
        '<p class="hero__role" style="margin-top:1.1rem"><b>' + esc(P.name) + '</b> — ' + esc(pick(P.role)) + ' · ' + esc(pick(P.location)) + '</p>' +
        '<h1>' + esc(pick(P.headline)) + '</h1>' +
        '<p class="hero__sub">' + esc(pick(P.subhead)) + '</p>' +
        '<div class="hero__cta">' +
          '<a class="btn btn--primary" href="#work">' + t("hero_cta_work") + ' <span class="arrow" aria-hidden="true">→</span></a>' +
          '<a class="btn btn--ghost" href="#contact">' + t("hero_cta_contact") + '</a>' +
        '</div>' +
        '<div class="hero__stats">' + stats + '</div>' +
        '<div class="toolbelt">' + tools + '</div>' +
      '</div></div>';
  }

  function renderApproach() {
    var caps = window.PROFILE.capabilities.map(function (c) {
      return '<div class="cap reveal"><div class="cap__no">' + esc(c.no) + '</div>' +
        '<h3 class="cap__title">' + esc(pick(c.title)) + '</h3>' +
        '<p class="cap__body">' + esc(pick(c.body)) + '</p></div>';
    }).join("");
    $("#approach").innerHTML =
      '<div class="wrap"><div class="approach__head">' +
        '<p class="kicker">' + t("approach_kicker") + '</p>' +
        '<h2 class="section-title">' + t("approach_title") + '</h2></div>' +
      '<div class="cap-grid">' + caps + '</div></div>';
  }

  function renderWork() {
    var ordered = orderedProjects();
    var cats = window.CATEGORIES.filter(function (c) {
      return window.PROJECTS.some(function (p) { return p.category === c.id; });
    });
    var filters = '<button class="filter is-active" data-cat="all">' + t("filter_all") + '</button>' +
      cats.map(function (c) { return '<button class="filter" data-cat="' + c.id + '">' + esc(pick(c.label)) + '</button>'; }).join("");

    var cards = ordered.map(function (p, i) {
      var no = pad(i + 1);
      var badge = p.confidential ? '<span class="badge-conf">' + t("badge_confidential") + '</span>' : "";
      return '<button class="project ' + (p.featured ? "is-featured " : "") + 'reveal" data-slug="' + esc(p.slug) + '" data-cat="' + p.category + '" aria-haspopup="dialog">' +
        badge +
        '<div class="project__media">' + mediaHTML(p, no) + '</div>' +
        '<div class="project__body">' +
          '<div class="project__meta"><span class="project__no">' + no + '</span>' +
          '<span class="project__cat">' + esc(catLabel(p.category)) + '</span><span>· ' + esc(p.year) + '</span></div>' +
          '<h3 class="project__title">' + esc(pick(p.title)) + '</h3>' +
          '<p class="project__tagline">' + esc(pick(p.tagline)) + '</p>' +
          '<div class="project__tech">' + techChips(p.tech, 4) + '</div>' +
          '<span class="project__more">' + t("card_view") + ' <span class="arrow" aria-hidden="true">→</span></span>' +
        '</div></button>';
    }).join("");

    $("#work").innerHTML =
      '<div class="wrap"><div class="work__head"><div>' +
        '<p class="kicker">' + t("work_kicker") + '</p>' +
        '<h2 class="section-title">' + t("work_title") + '</h2></div></div>' +
      '<p class="section-intro">' + t("work_intro") + '</p>' +
      '<div class="filters" id="filters">' + filters + '</div>' +
      '<div class="work__grid" id="workGrid">' + cards + '</div></div>';
  }

  function renderAbout() {
    var P = window.PROFILE;
    var paras = pick(P.about); // array
    var lead = paras[0];
    var rest = paras.slice(1);
    $("#about").innerHTML =
      '<div class="wrap about__grid">' +
        '<div><h2 class="sr-only">' + t("about_kicker") + '</h2>' +
          '<p class="kicker">' + t("about_kicker") + '</p>' +
          '<p class="about__lead">' + esc(lead) + '</p></div>' +
        '<div class="about__body">' +
          rest.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") +
          '<div class="toolbelt" style="margin-top:.6rem"><span class="toolbelt__label">Stack</span>' +
            P.toolbelt.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join("") +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderContact() {
    var P = window.PROFILE;
    var links = P.links.map(function (l) {
      return '<a href="' + esc(l.url) + '"' + (/^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "") + '>' + esc(l.label) + '</a>';
    }).join("");
    $("#contact").innerHTML =
      '<div class="wrap">' +
        '<p class="kicker">' + t("contact_kicker") + '</p>' +
        '<h2 class="contact__title">' + t("contact_title") + '</h2>' +
        '<p class="contact__text">' + t("contact_text") + '</p>' +
        '<div class="contact__actions">' +
          '<a class="btn btn--primary" href="mailto:' + esc(P.email) + '">' + t("contact_email") + ' <span class="arrow" aria-hidden="true">→</span></a>' +
          '<span class="chip">' + esc(P.email) + '</span>' +
        '</div>' +
        '<div class="contact__links">' + links + '</div>' +
      '</div>';
  }

  function renderFooter() {
    var year = "2026";
    $("#footer").innerHTML =
      '<div class="wrap footer__inner">' +
        '<div><strong>' + esc(window.PROFILE.name) + '</strong> · ' + esc(pick(window.PROFILE.role)) + ' · © ' + year +
          '<p class="footer__note">' + t("footer_built") + '</p></div>' +
        '<a class="footer__top" href="#top"><span aria-hidden="true">↑</span> ' + (lang === "zh" ? "回到頂端" : "Back to top") + '</a>' +
      '</div>';
  }

  /* ----------------------------- modal ----------------------------------- */
  function openModal(slug) {
    var p = window.PROJECTS.find(function (x) { return x.slug === slug; });
    if (!p) return;
    var modal = $("#projectModal");
    var parts = [];

    parts.push('<div class="modal__scroll"><div class="modal__head"><div>' +
      '<div class="modal__eyebrow"><span>' + esc(catLabel(p.category)) + '</span>' +
      (p.confidential ? '<span class="chip">' + t("badge_confidential") + '</span>' : "") + '</div>' +
      '<h2 class="modal__title">' + esc(pick(p.title)) + '</h2></div>' +
      '<button class="modal__close" id="modalClose" aria-label="' + t("detail_close") + '">✕</button></div>');

    parts.push('<div class="modal__body">');
    if (p.confidential) parts.push('<p class="modal__note">' + t("detail_confidential_note") + '</p>');
    parts.push('<p class="lead">' + esc(pick(p.tagline)) + '</p>');

    // visuals
    if (p.pipeline) parts.push('<div>' + pipelineHTML(p.pipeline) + '</div>');
    if (p.metrics) parts.push(metricsHTML(p.metrics));
    if (p.terminal) parts.push(terminalHTML(p.terminal));

    // overview
    parts.push('<div><div class="block__h">' + t("detail_overview") + '</div><p>' + esc(pick(p.description)) + '</p></div>');

    // gallery
    if (p.images && p.images.length) {
      parts.push('<div class="modal__gallery">' + p.images.map(function (im) {
        return '<figure class="modal__figure"><img src="' + esc(im.src) + '" alt="' + esc(pick(im.alt)) + '" loading="lazy">' +
          (im.caption ? '<figcaption>' + esc(pick(im.caption)) + '</figcaption>' : "") + '</figure>';
      }).join("") + '</div>');
    }
    if (p.logos) parts.push(logosHTML(p.logos));

    // highlights
    if (p.highlights) {
      parts.push('<div><div class="block__h">' + t("detail_highlights") + '</div><ul class="hl-list">' +
        p.highlights.map(function (h) { return '<li>' + esc(pick(h)) + '</li>'; }).join("") + '</ul></div>');
    }

    // stack
    parts.push('<div><div class="block__h">' + t("detail_stack") + '</div><div class="modal__stack">' + techChips(p.tech) + '</div></div>');

    // links
    if (p.links && p.links.length) {
      parts.push('<div><div class="block__h">' + t("detail_links") + '</div><div class="modal__links">' +
        p.links.map(function (l) { return '<a class="btn btn--ghost" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>'; }).join("") + '</div></div>');
    }

    // meta
    parts.push('<dl class="modal__meta">' +
      '<div><dt>' + t("status_label") + '</dt><dd>' + esc(pick(p.status)) + '</dd></div>' +
      '<div><dt>' + t("source_label") + '</dt><dd>' + esc(p.source) + '</dd></div>' +
      '<div><dt>' + t("year_label") + '</dt><dd>' + esc(p.year) + '</dd></div></dl>');

    parts.push('</div></div>');
    modal.innerHTML = parts.join("");
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    $("#modalClose").addEventListener("click", closeModal);
  }
  function closeModal() {
    var m = $("#projectModal");
    if (typeof m.close === "function") m.close(); else m.removeAttribute("open");
  }

  /* ----------------------------- binding & lifecycle --------------------- */
  var revealObserver = null;
  function bindReveals() {
    if (revealObserver) revealObserver.disconnect();
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (e) { e.classList.add("in"); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (e) { revealObserver.observe(e); });
  }

  function bindWork() {
    document.querySelectorAll(".project").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(btn.dataset.slug); });
    });
    var filters = document.querySelectorAll(".filter");
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.classList.remove("is-active"); });
        f.classList.add("is-active");
        var cat = f.dataset.cat;
        document.querySelectorAll("#workGrid .project").forEach(function (card) {
          card.hidden = !(cat === "all" || card.dataset.cat === cat);
        });
      });
    });
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = t(e.dataset.i18n); });
    var tg = $("#langToggle");
    tg.textContent = t("langToggle");
    tg.setAttribute("aria-label", t("langToggleAria"));
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    document.title = t("docTitle");
  }

  function renderAll() {
    applyStaticI18n();
    renderHero();
    renderApproach();
    renderWork();
    renderAbout();
    renderContact();
    renderFooter();
    bindWork();
    bindReveals();
  }

  function init() {
    renderAll();

    // language toggle
    $("#langToggle").addEventListener("click", function () {
      lang = lang === "zh" ? "en" : "zh";
      localStorage.setItem(LS_KEY, lang);
      closeModal();
      renderAll();
    });

    // nav scrolled state
    var nav = $("#nav");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // modal: close on backdrop click + Esc handled natively by <dialog>
    var modal = $("#projectModal");
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
