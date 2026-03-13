// Navbar scroll
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 60) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  // Scroll top button
  const btn = document.getElementById("scrollTop");
  if (window.scrollY > 400) btn.classList.add("visible");
  else btn.classList.remove("visible");
});

// Hamburger
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.getElementById("hamburgerBtn").classList.toggle("open");
  document.getElementById("mobileMenu").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
});
function closeMobile() {
  document.getElementById("hamburgerBtn").classList.remove("open");
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

// Reveal on scroll
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => observer.observe(el));

// Carousel
let carouselPos = {};
function slideCarousel(trackId, dir) {
  const track = document.getElementById(trackId);
  const items = track.children;
  if (!items.length) return;
  const itemW = items[0].offsetWidth + 24;
  const maxSlide = Math.max(0, items.length - 3);
  carouselPos[trackId] = carouselPos[trackId] || 0;
  carouselPos[trackId] = Math.max(
    0,
    Math.min(maxSlide, carouselPos[trackId] - dir),
  );
  track.style.transform = `translateX(-${carouselPos[trackId] * itemW}px)`;
}

// Responsive grid
function applyGrids() {
  const w = window.innerWidth;
  document.querySelectorAll(".grid-3").forEach((el) => {
    el.style.gridTemplateColumns =
      w < 640 ? "1fr" : w < 900 ? "1fr 1fr" : "repeat(3,1fr)";
  });
  document.querySelectorAll(".grid-2").forEach((el) => {
    el.style.gridTemplateColumns = w < 640 ? "1fr" : "1fr 1fr";
  });
  document.querySelector("#whyGrid").style.gridTemplateColumns =
    w < 640 ? "1fr" : w < 900 ? "1fr 1fr" : "repeat(4,1fr)";
  document.querySelector(".stats-grid").style.gridTemplateColumns =
    w < 640 ? "1fr 1fr" : "repeat(4,1fr)";
}
applyGrids();
window.addEventListener("resize", applyGrids);

// Form submit
function handleSubmit(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = "⏳ Sending...";
  btn.style.opacity = ".7";
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = "✅ Message Sent! We'll contact you soon.";
    btn.style.background = "linear-gradient(135deg,#38a169,#276749)";
    btn.style.color = "#fff";
    btn.style.opacity = "1";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      btn.style.color = "";
      btn.disabled = false;
    }, 4000);
  }, 1500);
}

// Active nav link on scroll
const sections = ["home", "about", "services", "tours", "blog", "contact"];
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((id) => {
    const el = document.getElementById(id) || document.querySelector(`#${id}`);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current)
      link.classList.add("active");
  });
});
