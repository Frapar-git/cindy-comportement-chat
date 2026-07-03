(function () {
  "use strict";

  function initHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        header.offsetHeight + "px"
      );
    setHeight();
    window.addEventListener("resize", setHeight, { passive: true });
    if ("ResizeObserver" in window) {
      new ResizeObserver(setHeight).observe(header);
    }

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.getElementById("nav-menu");
    const backdrop = document.getElementById("nav-backdrop");
    if (!hamburger || !nav) return;

    const setOpen = (open) => {
      nav.classList.toggle("active", open);
      hamburger.classList.toggle("active", open);
      hamburger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
      if (backdrop) backdrop.classList.toggle("active", open);
    };

    const close = () => setOpen(false);

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains("active"));
    });

    if (backdrop) backdrop.addEventListener("click", close);

    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", close)
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        if (answer) answer.classList.toggle("hidden", open);
      });
    });

    const catButtons = document.querySelectorAll(".faq-category-button");
    catButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.category;
        catButtons.forEach((b) => b.classList.toggle("active", b === btn));
        document.querySelectorAll(".faq-container").forEach((c) => {
          c.classList.toggle("hidden", c.id !== target);
        });
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMenu();
    initFaq();
    initReveal();
  });
})();
