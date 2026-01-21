/**
 * =====================================================
 * File: logo-branding.js
 * Purpose: Page Logo Branding
 * =====================================================
 * What this file does:
 * - Location page হলে agency logo replace করে
 * - Company name এর first letter দিয়ে custom logo দেখায়
 * - Location page না হলে original logo restore করে
 *
 * NOTE:
 * - This is a pure JS file
 * - Should be bundled/minified into main.js or main.min.js
 * =====================================================
 */

(function () {
  /* ================= CONFIG ================= */

  // Selector for company / location name
  const NAME_SELECTOR =
    ".lg\\:justify-between .items-center .hl_switcher-loc-name";

  // HighLevel agency logo container
  const LOGO_CONTAINER_SELECTOR = ".agency-logo-container";

  let lastCompanyName = "";

  /* ================= HELPERS ================= */

  function isLocationPage() {
    return location.pathname.includes("/location/");
  }

  function getCompanyName() {
    const el = document.querySelector(NAME_SELECTOR);
    return el ? el.textContent.trim() : "";
  }

  /* ================= LOGO SVG ================= */

  function generateLogoSVG(name) {
    const letter = name.charAt(0).toUpperCase();

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2563eb"/>
  <text x="32" y="32"
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

  /* ================= APPLY / RESTORE ================= */

  function applyCustomLogo(container, name) {
    const svg = generateLogoSVG(name);
    const dataUrl = "data:image/svg+xml;base64," + btoa(svg);

    container.style.backgroundImage = `url("${dataUrl}")`;
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = "center";
    container.style.backgroundSize = "contain";
    container.style.visibility = "visible";
    container.style.opacity = "1";

    // Hide default logo elements safely
    container.querySelectorAll("img, svg").forEach((el) => {
      el.style.opacity = "0";
      el.style.visibility = "hidden";
    });
  }

  function restoreDefaultLogo(container) {
    container.style.backgroundImage = "";
    container.querySelectorAll("img, svg").forEach((el) => {
      el.style.opacity = "";
      el.style.visibility = "";
    });
  }

  /* ================= MAIN ================= */

  function updateLogoBranding() {
    const container = document.querySelector(LOGO_CONTAINER_SELECTOR);

    const companyName = getCompanyName();
    if (!container || !companyName || companyName === lastCompanyName) {
      return;
    }

    lastCompanyName = companyName;

    if (isLocationPage()) {
      applyCustomLogo(container, companyName);
    } else {
      restoreDefaultLogo(container);
    }
  }

  // Initial delay for SPA load
  setTimeout(updateLogoBranding, 700);

  // Keep watching for route / name change
  setInterval(updateLogoBranding, 400);
})();
