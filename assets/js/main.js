import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Animaciones de revelado suave
  const reveals = document.querySelectorAll(".reveal-up");
  reveals.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });
  });

  // Navegación Overlay
  const menuBtn = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("nav-overlay");
  
  if (menuBtn && navOverlay) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navOverlay.classList.contains("opacity-100");
      if (isOpen) {
        navOverlay.classList.add("pointer-events-none", "opacity-0");
        navOverlay.classList.remove("opacity-100");
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        navOverlay.classList.remove("pointer-events-none", "opacity-0");
        navOverlay.classList.add("opacity-100");
        menuBtn.setAttribute("aria-expanded", "true");
      }
    });
  }
});
