/* =========================================================
   MIOC OPEN — glavna skripta
   ========================================================= */
(function () {
  "use strict";

  /* ---- POSTAVKE ---- */
  // Datum otvaranja sljedećeg turnira (promijeni po potrebi)
  var TOURNAMENT_START = new Date("2025-09-01T00:00:00");

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobilni izbornik ---------- */
  var toggle = $(".nav-toggle");
  var links = $("#nav-links");
  function closeMenu() {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otvori izbornik");
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Zatvori izbornik" : "Otvori izbornik");
    });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Aktivni link u navigaciji ---------- */
  var navMap = {};
  $$(".nav-links a[href^='#']").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && navMap[en.target.id]) {
          $$(".nav-links a").forEach(function (a) { a.classList.remove("active"); });
          navMap[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Reveal animacije ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Odbrojavanje ---------- */
  var cd = $("#countdown");
  if (cd) {
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    var parts = { d: $("[data-cd=d]", cd), h: $("[data-cd=h]", cd), m: $("[data-cd=m]", cd), s: $("[data-cd=s]", cd) };
    var tick = function () {
      var diff = TOURNAMENT_START.getTime() - Date.now();
      if (diff <= 0) {
        cd.innerHTML = '<div class="countdown-label">Status turnira</div><div class="countdown-done">⚽ Turnir je počeo!</div>';
        clearInterval(timer);
        return;
      }
      parts.d.textContent = Math.floor(diff / 864e5);
      parts.h.textContent = pad(Math.floor((diff % 864e5) / 36e5));
      parts.m.textContent = pad(Math.floor((diff % 36e5) / 6e4));
      parts.s.textContent = pad(Math.floor((diff % 6e4) / 1e3));
    };
    var timer = setInterval(tick, 1000);
    tick();
  }

  /* ---------- Slider ---------- */
  var slider = $("#slider");
  if (slider) {
    var track = $("#slides");
    var slides = $$(".slide", track);
    var caption = $("#slider-caption");
    var counter = $("#slider-counter");
    var dotsWrap = $("#slider-dots");
    var idx = 0;

    // zamućena pozadina iza svake slike
    slides.forEach(function (s, i) {
      var img = $("img", s);
      var blur = document.createElement("div");
      blur.className = "slide-blur";
      blur.style.backgroundImage = "url('" + img.getAttribute("src") + "')";
      s.insertBefore(blur, img);
      if (i > 0) img.loading = "lazy";

      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Slika " + (i + 1));
      dot.innerHTML = '<img src="' + img.getAttribute("src").replace(/\.jpg$/, "-sm.jpg") + '" alt="" loading="lazy">';
      dot.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = $$("button", dotsWrap);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      caption.textContent = slides[idx].getAttribute("data-caption");
      counter.textContent = (idx + 1) + " / " + slides.length;
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === idx ? "true" : "false"); });
      slides.forEach(function (s, i) { s.setAttribute("aria-hidden", i === idx ? "false" : "true"); });
    }
    $(".slider-btn.prev", slider).addEventListener("click", function () { go(idx - 1); });
    $(".slider-btn.next", slider).addEventListener("click", function () { go(idx + 1); });
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
    });

    // swipe na mobitelu
    var startX = null, startY = null;
    slider.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
      startX = null;
    });
    go(0);
  }

  /* ---------- Dialog helper ---------- */
  function openDialog(d) {
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function closeDialog(d) {
    if (typeof d.close === "function") d.close();
    else d.removeAttribute("open");
  }
  $$("dialog").forEach(function (d) {
    d.addEventListener("close", function () { document.body.style.overflow = ""; });
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-close]")) closeDialog(d);
    });
  });

  /* ---------- Ekipe ---------- */
  var teamModal = $("#team-modal");
  $$(".team-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest("li");
      var group = btn.closest(".group");
      var name = $(".name", btn).firstChild.textContent.trim();
      var letter = $(".letter", group).textContent;
      var badge = $(".badge", btn);
      $("#team-modal-group").textContent = "Grupa " + letter + " · " + $(".pos", btn).textContent + ". u grupi" + (badge ? " · " + badge.textContent : "");
      $("#team-modal-title").textContent = name;
      $("#team-modal-text").textContent = $(".team-info", li).textContent;
      openDialog(teamModal);
    });
  });

  /* ---------- Nagrade: lightbox ---------- */
  var lb = $("#lightbox");
  $$(".award").forEach(function (a) {
    a.addEventListener("click", function () {
      var img = $("#lightbox-img");
      img.src = a.getAttribute("data-full");
      img.alt = $(".award-img img", a).alt;
      $("#lightbox-cap").textContent = $(".award-title", a).textContent + " — " + $(".award-name", a).textContent;
      openDialog(lb);
    });
  });

  /* ---------- Audio playeri ---------- */
  var players = $$(".player");
  var fmt = function (t) {
    if (!isFinite(t)) return "0:00";
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  };
  players.forEach(function (p) {
    var audio = new Audio();
    audio.preload = "metadata";
    audio.src = p.getAttribute("data-src");
    p._audio = audio;
    var btn = $(".play-btn", p);
    var fill = $(".progress-fill", p);
    var bar = $(".progress", p);
    var cur = $(".t-cur", p);
    var dur = $(".t-dur", p);

    btn.addEventListener("click", function () {
      if (audio.paused) {
        players.forEach(function (o) { if (o !== p) o._audio.pause(); });
        audio.play();
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", function () { p.classList.add("playing"); });
    audio.addEventListener("pause", function () { p.classList.remove("playing"); });
    audio.addEventListener("ended", function () { p.classList.remove("playing"); audio.currentTime = 0; });
    audio.addEventListener("loadedmetadata", function () { dur.textContent = fmt(audio.duration); });
    audio.addEventListener("timeupdate", function () {
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      fill.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", Math.round(pct));
      cur.textContent = fmt(audio.currentTime);
    });
    bar.addEventListener("click", function (e) {
      var r = bar.getBoundingClientRect();
      if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
    bar.addEventListener("keydown", function (e) {
      if (!audio.duration) return;
      if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
    });
  });

  /* ---------- Karta (samo uz pristanak) ---------- */
  var mapWrap = $("#map-wrap");
  function loadMap() {
    if (!mapWrap || $("iframe", mapWrap)) return;
    var f = document.createElement("iframe");
    f.src = mapWrap.getAttribute("data-src");
    f.title = "Karta: Krempijevo, Split";
    f.loading = "lazy";
    f.allowFullscreen = true;
    f.referrerPolicy = "no-referrer-when-downgrade";
    mapWrap.innerHTML = "";
    mapWrap.appendChild(f);
  }
  function unloadMap() {
    var f = mapWrap && $("iframe", mapWrap);
    if (f) location.reload();
  }
  document.addEventListener("mioc:consent", function (e) {
    if (e.detail && e.detail.media) loadMap(); else unloadMap();
  });
  if (window.MiocConsent && window.MiocConsent.has("media")) loadMap();
})();
