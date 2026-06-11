(function () {
  "use strict";

  /* ── Theme Toggle ── */
  const html = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");

  function initTheme() {
    const saved = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", saved);
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  /* ── Mobile Menu ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  function toggleMenu() {
    const open = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ── Scroll Fade-in ── */
  function initFadeIn() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }

  /* ── Nav Hide/Show on Scroll ── */
  function initNavScroll() {
    const nav = document.getElementById("mainNav");
    const heroSection = document.getElementById("inicio");
    let lastScrollY = window.scrollY;
    let heroBottom = 0;

    function updateHeroBottom() {
      const rect = heroSection.getBoundingClientRect();
      heroBottom = rect.bottom + window.scrollY;
    }

    updateHeroBottom();
    window.addEventListener("resize", updateHeroBottom);

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > heroBottom) {
        if (currentScrollY > lastScrollY) {
          nav.classList.add("nav-hidden");
          nav.classList.remove("nav-visible");
        } else {
          nav.classList.remove("nav-hidden");
          nav.classList.add("nav-visible");
        }
      } else {
        nav.classList.remove("nav-hidden");
        nav.classList.add("nav-visible");
      }

      lastScrollY = currentScrollY;
    });

    nav.classList.add("nav-visible");
  }

  /* ── Outside Click – Close Menu ── */
  function initOutsideClick() {
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── Init ── */
  initTheme();
  initFadeIn();
  initNavScroll();
  initOutsideClick();
  themeBtn.addEventListener("click", toggleTheme);
  hamburger.addEventListener("click", toggleMenu);
  window.closeMenu = closeMenu;
})();
