/**
 * ============================================
 * GHL Location Branding Script
 * - Dynamic tab title
 * - Dynamic favicon (letter-based SVG)
 * - Agency logo replacement
 * ============================================
 * Safe for:
 * - GoHighLevel
 * - Cloudflare Pages CDN
 * - No minify required
 */

(function () {
  "use strict";

  /* ================= CONFIG ================= */

  const NAME_SELECTOR =
    ".lg\\:justify-between .items-center .hl_switcher-loc-name";

  const LOGO_CONTAINER_SELECTOR = ".agency-logo-container";

  const CHECK_INTERVAL = 400;

  /* ================= STATE ================= */

  let lastCompanyName = "";

  /* ================= HELPERS ================= */

  function isLocationPage() {
    return location.pathname.includes("/location/");
  }

  function getCompanyName() {
    const el = document.querySelector(NAME_SELECTOR);
    return el ? el.textContent.trim() : "";
  }

  function generateLetterSVG(letter) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2563eb"/>
  <text
    x="32"
    y="32"
    text-anchor="middle"
    dominant-baseline="central"
    font-size="34"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    fill="white">
    ${letter}
  </text>
</svg>`;
  }

  function svgToDataUrl(svg) {
    return "data:image/svg+xml;base64," + btoa(svg);
  }

  /* ================= TAB TITLE ================= */

  function updateTitle(company) {
    if (document.title !== company) {
      document.title = company;
    }
  }

  /* ================= FAVICON ================= */

  function updateFavicon(company) {
    const letter = company.charAt(0).toUpperCase();
    const svg = generateLetterSVG(letter);
    const url = svgToDataUrl(svg);

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = url;
  }

  /* ================= LOGO ================= */

  function applyCustomLogo(container, company) {
    const letter = company.charAt(0).toUpperCase();
    const svg = generateLetterSVG(letter);
    const dataUrl = svgToDataUrl(svg);

    container.style.backgroundImage = `url("${dataUrl}")`;
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = "center";
    container.style.backgroundSize = "contain";
    container.style.visibility = "visible";
    container.style.opacity = "1";

    container.querySelectorAll("img, svg").forEach(function (el) {
      el.style.opacity = "0";
      el.style.visibility = "hidden";
    });
  }

  function restoreDefaultLogo(container) {
    container.style.backgroundImage = "";
    container.querySelectorAll("img, svg").forEach(function (el) {
      el.style.opacity = "";
      el.style.visibility = "";
    });
  }

  /* ================= MAIN UPDATE ================= */

  function updateBranding() {
    if (!isLocationPage()) return;

    const company = getCompanyName();
    if (!company || company === lastCompanyName) return;

    lastCompanyName = company;

    updateTitle(company);
    updateFavicon(company);

    const logoContainer = document.querySelector(LOGO_CONTAINER_SELECTOR);
    if (logoContainer) {
      applyCustomLogo(logoContainer, company);
    }
  }

  /* ================= INIT ================= */

  function start() {
    updateBranding();
    setInterval(updateBranding, CHECK_INTERVAL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
