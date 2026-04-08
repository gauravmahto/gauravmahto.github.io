(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrollTopButton = null;

  function animateCounter(el) {
    var target = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(target)) return;

    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduceMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }

    var duration = 1200;
    var start = performance.now();

    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    }

    window.requestAnimationFrame(frame);
  }

  function initReveals() {
    var revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -24px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function initHeroMotion() {
    if (reduceMotion || !window.matchMedia("(pointer:fine)").matches) return;

    var hero = document.querySelector(".hero-shell");
    if (!hero) return;

    var rafId = null;

    hero.addEventListener("pointermove", function (event) {
      var rect = hero.getBoundingClientRect();
      var offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
      var offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 28;

      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(function () {
        hero.style.setProperty("--mouse-x", offsetX.toFixed(1) + "px");
        hero.style.setProperty("--mouse-y", offsetY.toFixed(1) + "px");
      });
    });

    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--mouse-x", "0px");
      hero.style.setProperty("--mouse-y", "0px");
    });
  }

  function updateScrollTopVisibility() {
    if (!scrollTopButton) return;

    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    var threshold = scrollable * 0.2;
    var footer = document.querySelector(".md-footer");
    var footerHeight = footer ? footer.getBoundingClientRect().height : 0;
    var viewportBottom = window.scrollY + window.innerHeight;
    var footerStart = doc.scrollHeight - footerHeight;
    var overlap = Math.max(0, viewportBottom - footerStart);

    scrollTopButton.style.setProperty("--gm-scrolltop-lift", (overlap > 0 ? overlap + 10 : 0) + "px");

    if (scrollable > 0 && window.scrollY >= threshold) {
      scrollTopButton.classList.add("is-visible");
    } else {
      scrollTopButton.classList.remove("is-visible");
    }
  }

  function initScrollTopButton() {
    scrollTopButton = document.createElement("button");
    scrollTopButton.className = "gm-scrolltop";
    scrollTopButton.type = "button";
    scrollTopButton.setAttribute("aria-label", "Scroll to top");
    scrollTopButton.innerHTML = '<span class="gm-scrolltop__icon" aria-hidden="true">↑</span><span class="gm-scrolltop__label">Top</span>';

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });

    document.body.appendChild(scrollTopButton);
    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    window.addEventListener("resize", updateScrollTopVisibility);
  }

  function init() {
    initReveals();
    initCounters();
    initHeroMotion();
    initScrollTopButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
