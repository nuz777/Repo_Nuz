 // ── DARK/LIGHT TOGGLE ──
      const html = document.documentElement;
      const themeBtn = document.getElementById("themeToggle");
      const saved = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", saved);

      themeBtn.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });

      // ── HAMBURGER ──
      const btn = document.getElementById("hamburger");
      const menu = document.getElementById("mobileMenu");

      btn.addEventListener("click", () => {
        const open = btn.classList.toggle("open");
        menu.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });

      function closeMenu() {
        btn.classList.remove("open");
        menu.classList.remove("open");
        document.body.style.overflow = "";
      }

      document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
      });

      // ── SCROLL FADE-IN ──
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      document
        .querySelectorAll(".fade-in")
        .forEach((el) => observer.observe(el));

      // ── HIDE/SHOW NAV ON SCROLL ──
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

        // Solo ocultar si ya pasamos el hero
        if (currentScrollY > heroBottom) {
          if (currentScrollY > lastScrollY) {
            // Scrolling down → hide
            nav.classList.add("nav-hidden");
            nav.classList.remove("nav-visible");
          } else {
            // Scrolling up → show
            nav.classList.remove("nav-hidden");
            nav.classList.add("nav-visible");
          }
        } else {
          // Dentro del hero, siempre visible
          nav.classList.remove("nav-hidden");
          nav.classList.add("nav-visible");
        }

        lastScrollY = currentScrollY;
      });

      // Set initial state
      nav.classList.add("nav-visible");