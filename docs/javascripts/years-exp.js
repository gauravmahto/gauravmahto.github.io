(function () {
  function updateYears(el) {
    var start = el.getAttribute("data-start");
    if (!start) return;

    var startDate = new Date(start);
    if (isNaN(startDate.getTime())) return;

    var today = new Date();
    var years = today.getFullYear() - startDate.getFullYear();
    var monthDiff = today.getMonth() - startDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
      years -= 1;
    }

    if (years >= 0) {
      el.textContent = years + "+";
    }
  }

  function init() {
    document.querySelectorAll("[data-start]").forEach(updateYears);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
