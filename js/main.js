document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".custom-navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTargets = document.querySelectorAll("header[id], section[id]");
  const navCollapse = document.getElementById("navbarNav");

  // ===== Footer year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Navbar / Active Link =====
  const setActiveLink = () => {
    const offset = 140;
    const y = window.scrollY + offset;

    let currentId = "home";
    scrollTargets.forEach((el) => {
      if (y >= el.offsetTop) currentId = el.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  };

  const onScroll = () => {
    setActiveLink();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Close mobile menu after clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navbarNav");
      if (!nav || !window.bootstrap) return;
      const isOpen = nav.classList.contains("show");
      if (!isOpen) return;
      const collapse = window.bootstrap.Collapse.getOrCreateInstance(nav);
      collapse.hide();
    });
  });

  // ===== Contact form validation (Bootstrap-friendly) =====
  const form = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  const showFormAlert = (type, message) => {
    if (!formAlert) return;
    formAlert.classList.remove("d-none", "alert-success", "alert-danger");
    formAlert.classList.add(type === "success" ? "alert-success" : "alert-danger");
    formAlert.textContent = message;
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isValid = form.checkValidity();
    form.classList.add("was-validated");

    if (!isValid) {
      showFormAlert("error", "Please check the highlighted fields and try again.");
      return;
    }

    showFormAlert("success", "Thanks! Your message has been sent. We’ll get back to you soon.");
    form.reset();
    form.classList.remove("was-validated");
  });

  // ===== Today's Special Badge =====
  const specialBadge = document.getElementById("specialBadge");
  const today = new Date().getDay();
  if (specialBadge && (today === 5 || today === 6)) {
    specialBadge.classList.remove("d-none");
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

function openGallery(src) {
  document.getElementById("modalImage").src = src;
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    e.stopPropagation();
  } else {
    alert("Message sent successfully!");
    form.reset();
  }

  form.classList.add("was-validated");
});