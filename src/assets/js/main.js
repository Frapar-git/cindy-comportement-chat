(function () {
  "use strict";

  function initHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.getElementById("nav-menu");
    if (!hamburger || !nav) return;

    const close = () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle("active");
      hamburger.classList.toggle("active", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", close)
    );

    document.addEventListener("click", (e) => {
      if (nav.classList.contains("active") && !nav.contains(e.target)) close();
    });

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
