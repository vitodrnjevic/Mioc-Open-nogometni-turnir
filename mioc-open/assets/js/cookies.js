/* =========================================================
   MIOC OPEN — cookie consent
   Kategorije:
     necessary — uvijek uključeno (pamćenje ovog izbora, slanje prijave)
     media     — vanjski sadržaj (Google Karte) koji postavlja svoje kolačiće
   Izbor se sprema u localStorage pod ključem "mioc-consent".
   Drugi skriptovi slušaju događaj "mioc:consent".
   ========================================================= */
(function () {
  "use strict";

  var KEY = "mioc-consent";
  var VERSION = 1;

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      return data && data.v === VERSION ? data : null;
    } catch (e) {
      return null;
    }
  }

  function write(prefs) {
    var data = { v: VERSION, necessary: true, media: !!prefs.media, date: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* privatni prozor – ignoriraj */ }
    current = data;
    document.dispatchEvent(new CustomEvent("mioc:consent", { detail: data }));
    return data;
  }

  var current = read();

  // Javni API za ostale skripte
  window.MiocConsent = {
    get: function () { return current; },
    has: function (cat) { return !!(current && current[cat]); },
    allow: function (cat) {
      var p = { media: current ? current.media : false };
      p[cat] = true;
      write(p);
      hide();
    },
    open: function () { show(true); }
  };

  var banner;

  function build() {
    banner = document.createElement("section");
    banner.className = "cookie";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-labelledby", "cookie-title");
    banner.innerHTML =
      '<div class="cookie-head">' +
        '<div class="cookie-icon" aria-hidden="true">🍪</div>' +
        "<div>" +
          '<h2 id="cookie-title">Kolačići, ne kartoni</h2>' +
          "<p>Koristimo samo nužne kolačiće da stranica radi. Uz tvoj pristanak učitavamo i vanjski sadržaj (Google Karte), koji postavlja vlastite kolačiće. Izbor možeš promijeniti bilo kada u podnožju stranice.</p>" +
        "</div>" +
      "</div>" +
      '<div class="cookie-prefs" id="cookie-prefs">' +
        '<div class="pref">' +
          "<div><b>Nužni</b><small>Pamte tvoj izbor kolačića i omogućuju slanje prijave. Ne mogu se isključiti.</small></div>" +
          '<label class="switch"><input type="checkbox" checked disabled aria-label="Nužni kolačići (uvijek uključeni)"><span></span></label>' +
        "</div>" +
        '<div class="pref">' +
          "<div><b>Vanjski sadržaj</b><small>Ugrađena Google karta lokacije terena. Google može postaviti svoje kolačiće.</small></div>" +
          '<label class="switch"><input type="checkbox" id="pref-media" aria-label="Vanjski sadržaj"><span></span></label>' +
        "</div>" +
      "</div>" +
      '<div class="cookie-actions">' +
        '<button type="button" class="btn btn-ghost btn-settings" aria-controls="cookie-prefs" aria-expanded="false">Postavke</button>' +
        '<button type="button" class="btn btn-ghost btn-necessary">Samo nužni</button>' +
        '<button type="button" class="btn btn-gold btn-save">Spremi izbor</button>' +
        '<button type="button" class="btn btn-gold btn-all">Prihvati sve</button>' +
      "</div>";
    document.body.appendChild(banner);

    var media = banner.querySelector("#pref-media");
    var settingsBtn = banner.querySelector(".btn-settings");

    settingsBtn.addEventListener("click", function () {
      banner.classList.add("expanded");
      settingsBtn.setAttribute("aria-expanded", "true");
      media.focus();
    });
    banner.querySelector(".btn-necessary").addEventListener("click", function () {
      write({ media: false }); hide();
    });
    banner.querySelector(".btn-all").addEventListener("click", function () {
      write({ media: true }); hide();
    });
    banner.querySelector(".btn-save").addEventListener("click", function () {
      write({ media: media.checked }); hide();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && banner.classList.contains("show") && current) hide();
    });
  }

  function show(expanded) {
    if (!banner) build();
    banner.querySelector("#pref-media").checked = !!(current && current.media);
    banner.classList.toggle("expanded", !!expanded);
    banner.querySelector(".btn-settings").setAttribute("aria-expanded", expanded ? "true" : "false");
    banner.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add("show"); });
    });
  }

  function hide() {
    if (!banner) return;
    banner.classList.remove("show");
    setTimeout(function () { if (!banner.classList.contains("show")) banner.hidden = true; }, 500);
  }

  function init() {
    // Gumbi "Postavke kolačića" i "Prikaži kartu"
    document.addEventListener("click", function (e) {
      var s = e.target.closest("[data-cookie-settings]");
      if (s) { e.preventDefault(); show(true); return; }
      var a = e.target.closest("[data-consent-allow]");
      if (a) { e.preventDefault(); window.MiocConsent.allow(a.getAttribute("data-consent-allow")); }
    });

    if (!current) {
      setTimeout(function () { show(false); }, 600);
    } else {
      document.dispatchEvent(new CustomEvent("mioc:consent", { detail: current }));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
