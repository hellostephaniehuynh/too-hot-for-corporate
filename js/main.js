// too hot for corporate. — nav toggle + waitlist form handling

(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "close" : "menu";
    });
  }

  // Pause control for the scrolling banner (WCAG 2.2.2)
  var tickerBar = document.querySelector(".ticker");
  var pauseBtn = document.getElementById("tickerPause");
  if (tickerBar && pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      var paused = tickerBar.classList.toggle("is-paused");
      pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
      pauseBtn.setAttribute("aria-label", paused ? "resume scrolling banner" : "pause scrolling banner");
      pauseBtn.textContent = paused ? "play" : "pause";
    });
  }

  // Waitlist forms POST to Formspree (https://formspree.io).
  // Each form carries data-formspree-id — swap "YOUR_FORM_ID" for the real
  // endpoint id from your Formspree dashboard (see README.md) and this
  // starts collecting real emails with no other changes needed.
  var forms = document.querySelectorAll(".waitlist-form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var formId = form.getAttribute("data-formspree-id");
      var errorEl = form.querySelector(".form-error");
      var submitBtn = form.querySelector('button[type="submit"]');

      if (errorEl) errorEl.style.display = "none";

      if (!formId || formId === "YOUR_FORM_ID") {
        console.warn(
          '[too hot for corporate] This form has no live Formspree ID yet — set data-formspree-id on the <form> to start collecting real emails. See README.md.'
        );
        form.classList.add("is-success");
        return;
      }

      var endpoint = "https://formspree.io/f/" + formId;
      var data = new FormData(form);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "submitting…";
      }

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.classList.add("is-success");
            var ok = form.querySelector(".form-success");
            if (ok) { ok.setAttribute("tabindex", "-1"); ok.focus(); }
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch(function () {
          if (errorEl) errorEl.style.display = "block";
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "request access →";
          }
        });
    });
  });
})();

// Hat page: color picker swaps the Stripe link; links still set to STRIPE_LINK_* stay disabled.
(function () {
  var btn = document.getElementById("buyBtn");
  if (!btn) return;
  var note = document.getElementById("buyNote");
  function apply() {
    var chosen = document.querySelector('input[name="color"]:checked');
    var url = btn.getAttribute(chosen && chosen.value === "black" ? "data-stripe-black" : "data-stripe-cream");
    if (!url || url.indexOf("STRIPE_LINK") === 0) {
      btn.removeAttribute("href");
      btn.setAttribute("aria-disabled", "true");
      if (note) note.textContent = "checkout opens very soon — use restock alerts below to get the email.";
    } else {
      btn.setAttribute("href", url);
      btn.removeAttribute("aria-disabled");
    }
  }
  document.querySelectorAll('input[name="color"]').forEach(function (r) { r.addEventListener("change", apply); });
  apply();
})();
