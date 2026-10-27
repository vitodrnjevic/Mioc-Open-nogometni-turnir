/* =========================================================
   MIOC OPEN — prijava (EmailJS)
   ========================================================= */
(function () {
  "use strict";

  var EMAILJS_PUBLIC_KEY = "aTbxgQEEOSM9-XfA-";
  var EMAILJS_SERVICE = "service_pv0xttk";
  var EMAILJS_TEMPLATE = "template_m84zm08";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  var form = document.getElementById("prijava-form");
  var btn = document.getElementById("submit-btn");
  var err = document.getElementById("form-error");
  var ok = document.getElementById("success-message");
  var nameEl = document.getElementById("ime");
  var mailEl = document.getElementById("email");

  function showError(msg) {
    err.textContent = msg;
    err.classList.add("show");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.classList.remove("show");

    if (!nameEl.value.trim() || nameEl.value.trim().length < 3) {
      showError("Upiši ime i prezime.");
      nameEl.focus();
      return;
    }
    if (!mailEl.validity.valid || !mailEl.value) {
      showError("E-mail adresa ne izgleda ispravno.");
      mailEl.focus();
      return;
    }
    if (!window.emailjs) {
      showError("Usluga za slanje se nije učitala. Provjeri internetsku vezu i pokušaj ponovno.");
      return;
    }

    var label = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Šaljem…';

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      name: nameEl.value.trim(),
      email: mailEl.value.trim()
    }).then(function () {
      form.hidden = true;
      ok.hidden = false;
      ok.querySelector("h2").focus && ok.querySelector("a").focus();
    }, function (error) {
      console.log("EmailJS greška:", error);
      showError("Slanje nije uspjelo. Pokušaj ponovno za minutu.");
      btn.disabled = false;
      btn.innerHTML = label;
    });
  });
})();
