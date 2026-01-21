/**
 * =====================================================
 * File: tab-branding.js
 * Purpose: Browser Tab Branding
 * =====================================================
 * What this file does:
 * - Location page হলে browser tab title change করে
 * - Location page হলে favicon change করে
 * - Company / location নাম থেকে data নেয়
 *
 * NOTE:
 * - This is a pure JS file
 * - Should be bundled/minified into main.js or main.min.js
 * =====================================================
 */

(function () {
  /* ================= CONFIG ================= */

  // Selector where HighLevel shows company / location name
  const NAME_SELECTOR =
    ".lg\\:justify-between .items-center .hl_switcher-loc-name";

  let lastCompanyName = "";

  /* ================= HELPERS ================= */

  // Check if current page is a location page
  function isLocationPage() {
    return location.pathname.includes("/location/");
  }

  // Read company / location name from DOM
  function getCompanyName() {
    const el = document.querySelector(NAME_SELECTOR);
    return el ? el.textContent.trim() : "";
  }

  /* ================= TAB TITLE ================= */

  function setTabTitle(name) {
    if (document.title !== name) {
      document.title = name;
    }
  }

  /* ================= FAVICON ================= */

  function setFavicon(name) {
    const letter = name.charAt(0).toUpperCase();

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
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

    const faviconUrl = "data:image/svg+xml;base64," + btoa(svg);

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }

  /* ================= MAIN ================= */

  function updateTabBranding() {
    if (!isLocationPage()) return;

    const companyName = getCompanyName();
    if (!companyName || companyName === lastCompanyName) return;

    lastCompanyName = companyName;

    setTabTitle(companyName);
    setFavicon(companyName);
  }

  // Initial delay for SPA load
  setTimeout(updateTabBranding, 600);

  // Keep watching for route / name change
  setInterval(updateTabBranding, 400);
})();
