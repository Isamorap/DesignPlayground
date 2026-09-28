/* Playground Sistema Nevados — interacciones mínimas. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Tema claro/oscuro (persistente) ---- */
  var KEY = "nevados-playground-theme";
  var toggle = document.getElementById("themeToggle");
  var brandMark = document.getElementById("brandMark");
  var footerLogo = document.querySelector(".footer img");

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    try {
      localStorage.setItem(KEY, mode);
    } catch (e) {
      /* modo privado: sigue funcionando sin persistir */
    }
    var icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = mode === "dark" ? "light_mode" : "dark_mode";
    // Marca legible en ambos fondos.
    var mark = mode === "dark" ? "assets/logo_white.png" : "assets/logo.png";
    if (brandMark) brandMark.src = mark;
    if (footerLogo) footerLogo.src = "assets/logo_white.png";
    // Iconos negros solo sobre superficies claras: en oscuro usan su
    // variante blanca (misma convención que el Forms: negros/blancos).
    document.querySelectorAll("img[data-dark-src]").forEach(function (img) {
      if (!img.getAttribute("data-light-src")) {
        img.setAttribute("data-light-src", img.getAttribute("src"));
      }
      img.src =
        mode === "dark"
          ? img.getAttribute("data-dark-src")
          : img.getAttribute("data-light-src");
    });
  }

  var initial = "light";
  try {
    initial = localStorage.getItem(KEY) || "light";
  } catch (e) {
    /* noop */
  }
  applyTheme(initial === "dark" ? "dark" : "light");
  toggle.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---- Paletas (misma fuente que tokens.css) ---- */
  var PALETTES = {
    brand: [
      ["Navy", "#00334e"],
      ["Navy deep", "#06283a"],
      ["Nieve", "#ffffff"],
      ["Slate 150", "#f4f6f8"],
      ["Slate 500", "#64748b"],
      ["Slate 900", "#16212a"],
    ],
    accent: [
      ["Cobre", "#c96f2e"],
      ["Cobre deep", "#96521f"],
      ["Lenga", "#2f6b4f"],
      ["Lenga deep", "#1e4a37"],
      ["Glaciar", "#0ea5e9"],
      ["Glaciar deep", "#075985"],
    ],
    semantic: [
      ["OK", "#10b981"],
      ["Aviso", "#f59e0b"],
      ["Error", "#ef4444"],
      ["Info", "#0ea5e9"],
      ["OK suave", "#d1fae5"],
      ["Error suave", "#fee2e2"],
    ],
  };

  var toastTimer = null;
  function toast(msg, tipo) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.className = "toast show" + (tipo ? " toast-" + tipo : "");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("show");
    }, 1600);
  }

  document.querySelectorAll("[data-swatches]").forEach(function (box) {
    var list = PALETTES[box.getAttribute("data-swatches")] || [];
    list.forEach(function (item) {
      var name = item[0];
      var hex = item[1];
      var b = document.createElement("button");
      b.className = "swatch";
      b.type = "button";
      b.title = "Copiar " + hex;
      b.setAttribute("aria-label", "Copiar color " + name + " " + hex);
      var chip = document.createElement("i");
      chip.style.background = hex;
      var label = document.createElement("span");
      label.textContent = hex;
      b.appendChild(chip);
      b.appendChild(label);
      b.addEventListener("click", function () {
        var done = function () {
          toast(hex + " copiado");
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex).then(done, done);
        } else {
          done();
        }
      });
      box.appendChild(b);
    });
  });

  /* ---- Reveal on scroll (IntersectionObserver, sin scroll listeners) ---- */
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .querySelectorAll(".section, .hero-copy, .hero-media")
    .forEach(function (el) {
      el.classList.add("rv");
    });
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".rv").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".rv").forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---- Chips demo ---- */
  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      chip.classList.toggle("is-on");
    });
  });

  /* ---- Chips de estado demo (radio + dbar con ventana de seguridad) ---- */
  document.querySelectorAll(".ck").forEach(function (suite) {
    suite.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn || btn.disabled) return;
      suite.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("is-on");
      });
      btn.classList.add("is-on");
      // Como el envío real (1200ms): la barra espera la ventana; si
      // vuelve a cambiar antes, se reinicia y solo viaja lo último.
      clearTimeout(suite._t);
      suite._t = setTimeout(function () {
        var card = suite.closest(".kitcard");
        var bar = card ? card.querySelector(".dbar") : null;
        if (bar) {
          bar.classList.remove("dbar-ok", "dbar-warn", "dbar-bad", "dbar-info");
          var fam = (btn.className.match(/is-(ok|warn|bad|info)/) || [])[1];
          if (fam) bar.classList.add("dbar-" + fam);
          var word = bar.querySelector("span");
          if (word) word.textContent = btn.textContent.trim();
        }
      }, 1200);
    });
  });

  /* ---- Radios demo (.seg, .presets, nav, tabs): uno activo por grupo ---- */
  document.querySelectorAll("[data-radio]").forEach(function (grupo) {
    grupo.addEventListener("click", function (e) {
      var btn = e.target.closest("a, button");
      if (!btn || btn.disabled || btn.classList.contains("iconbtn")) return;
      grupo.querySelectorAll("a, button").forEach(function (b) {
        b.classList.remove("is-on");
      });
      btn.classList.add("is-on");
    });
  });

  /* ---- Tabs con flechas (mismo patrón del Día Actual) ---- */
  document.querySelectorAll(".tabs").forEach(function (bar) {
    var tabs = Array.prototype.slice.call(
      bar.querySelectorAll(":scope > button:not(.iconbtn)"),
    );
    var prev = bar.querySelector("[data-prev]");
    var next = bar.querySelector("[data-next]");
    function mover(delta) {
      var i = tabs.findIndex(function (b) {
        return b.classList.contains("is-on");
      });
      i = Math.max(0, Math.min(tabs.length - 1, i + delta));
      tabs.forEach(function (b) {
        b.classList.remove("is-on");
      });
      tabs[i].classList.add("is-on");
    }
    if (prev) {
      prev.addEventListener("click", function () {
        mover(-1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        mover(1);
      });
    }
  });

  /* ---- Modal demo (confirmación destructiva con checkbox) ---- */
  var overlay = document.getElementById("overlayReinicio");
  var abrir = document.getElementById("abrirReinicio");
  var chk = document.getElementById("chkReinicio");
  var confirmar = document.getElementById("btnReinicio");
  function cerrarModal() {
    if (overlay) overlay.hidden = true;
  }
  if (abrir && overlay) {
    abrir.addEventListener("click", function () {
      overlay.hidden = false;
      if (chk) chk.checked = false;
      if (confirmar) confirmar.disabled = true;
      var dlg = overlay.querySelector(".dialog");
      if (dlg && dlg.focus) dlg.focus({ preventScroll: true });
    });
  }
  if (chk && confirmar) {
    chk.addEventListener("change", function () {
      confirmar.disabled = !chk.checked;
    });
  }
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest("[data-cerrar]")) {
        cerrarModal();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) cerrarModal();
    });
  }
  if (confirmar) {
    confirmar.addEventListener("click", function () {
      cerrarModal();
      toast("Día reiniciado (demo)");
    });
  }

  /* ---- Rango demo ---- */
  var consultar = document.getElementById("consultarRango");
  if (consultar) {
    consultar.addEventListener("click", function () {
      toast("Consultando rango (demo)");
    });
  }

  /* ---- Temporada demo (invierno/verano): mismos componentes, otros datos ---- */
  document.querySelectorAll("[data-temporada]").forEach(function (seg) {
    seg.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn || btn.disabled) return;
      seg.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("is-on");
      });
      btn.classList.add("is-on");
      var ver = btn.getAttribute("data-t") === "ver";
      var scope =
        seg.parentElement.querySelector("[data-temporada-scope]") || document;
      scope.querySelectorAll("[data-swap]").forEach(function (el) {
        var v = el.getAttribute(ver ? "data-ver" : "data-inv");
        if (v == null) return;
        if (el.tagName === "IMG") {
          el.src = v;
        } else if (el.tagName === "INPUT") {
          if (el._invVal === undefined) el._invVal = el.value;
          el.placeholder = v;
          el.value = ver ? "" : el._invVal;
        } else {
          el.textContent = v;
        }
      });
      scope.querySelectorAll("[data-only-inv]").forEach(function (el) {
        el.hidden = ver;
      });
    });
  });

  /* ---- Toasts demo ---- */
  var toastOk = document.getElementById("toastOk");
  if (toastOk) {
    toastOk.addEventListener("click", function () {
      toast("Cambios guardados (demo)", "ok");
    });
  }
  var toastErr = document.getElementById("toastErr");
  if (toastErr) {
    toastErr.addEventListener("click", function () {
      toast("Sin conexión (demo)", "err");
    });
  }

  /* ---- Índice de secciones (dropdown del nav) ---- */
  var menuBtn = document.getElementById("menuBtn");
  var menuList = document.getElementById("menuList");
  function cerrarMenu() {
    if (menuList) menuList.hidden = true;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && menuList) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var abrir = menuList.hidden;
      menuList.hidden = !abrir;
      menuBtn.setAttribute("aria-expanded", String(abrir));
    });
    menuList.addEventListener("click", function (e) {
      if (e.target.closest("a")) cerrarMenu();
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".navmenu")) cerrarMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrarMenu();
    });
  }

  /* ---- Volver arriba ---- */ var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
