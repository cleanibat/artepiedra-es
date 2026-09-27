/* ArtePiedra — interacciones + eventos de conversión (dataLayer) */
(function () {
  "use strict";
  var dl = (window.dataLayer = window.dataLayer || []);
  function push(ev, extra) { try { dl.push(Object.assign({ event: ev }, extra || {})); } catch (e) {} }

  /* Header: estado al hacer scroll */
  var header = document.querySelector(".header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* Menú móvil */
  var toggle = document.getElementById("navToggle"), nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  /* Comparador antes / después */
  document.querySelectorAll("[data-ba]").forEach(function (ba, i) {
    var range = ba.querySelector(".ba-range");
    var moved = false;
    function setW() { ba.style.setProperty("--w", ba.offsetWidth + "px"); }
    function setPos(v) { ba.style.setProperty("--pos", v + "%"); }
    setW(); setPos(range.value);
    window.addEventListener("resize", setW);
    range.addEventListener("input", function () {
      setPos(range.value);
      if (!moved) { moved = true; push("ba_slider_used", { slider_index: i + 1 }); }
    });
  });

  /* Aparición al hacer scroll (comprobación por posición: sencilla y a prueba de fallos) */
  document.documentElement.classList.add("js");
  var rv = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  var ticking = false;
  function reveal() {
    ticking = false;
    var limit = window.innerHeight * 0.96;
    rv = rv.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) { el.classList.add("is-in"); return false; }
      return true;
    });
  }
  function onMove() { if (!ticking) { ticking = true; requestAnimationFrame(reveal); } }
  window.addEventListener("scroll", onMove, { passive: true });
  window.addEventListener("resize", onMove);
  window.addEventListener("load", reveal);
  window.addEventListener("beforeprint", function () { rv.forEach(function (el) { el.classList.add("is-in"); }); rv = []; });
  reveal();

  /* Eventos de clic: llamadas y CTA */
  document.querySelectorAll("[data-ev]").forEach(function (el) {
    el.addEventListener("click", function () {
      var ev = el.getAttribute("data-ev");
      push(ev === "click_to_call" ? "click_to_call" : "cta_click", { cta: ev, href: el.getAttribute("href") });
    });
  });

  /* Formulario */
  var form = document.getElementById("presuForm"), card = document.getElementById("formCard");
  if (form) {
    var started = false;
    form.addEventListener("focusin", function () { if (!started) { started = true; push("form_start"); } });
    form.addEventListener("submit", function (e) {
      // Validación nativa con mensajes visibles
      if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
      var tipo = form.querySelector("#tipo"), sup = form.querySelector("#superficie");
      push("generate_lead", { project_type: tipo && tipo.value, surface: sup && sup.value });
      // Modo demostración: mientras el email de FormSubmit no esté configurado, mostramos la confirmación en la página.
      if (/CAMBIAR@EMAIL/.test(form.getAttribute("action") || "")) {
        e.preventDefault();
        card.classList.add("is-sent");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        var btn = form.querySelector("button[type=submit]");
        if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }
      }
    });
  }

  /* Año en el pie */
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
