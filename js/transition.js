// transition.js

// Import GSAP library for animations
import gsap from "gsap";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  // Trigger initial reveal transition on page load
  revealTransition();

  // Reveal Transition: Animates overlay scaling down to reveal page
  function revealTransition() {
    return new Promise((resolve) => {
      // Set initial state: overlay covers screen (scaleY: 1, starts from top)
      gsap.set(".transition-overlay", { scaleY: 1, transformOrigin: "top" });
      // Animate overlay to scaleY: 0 (disappears) over 0.6s with stagger
      gsap.to(".transition-overlay", {
        scaleY: 0, // Shrink overlay vertically
        duration: 0.6, // Animation duration
        stagger: -0.1, // Negative stagger for overlapping animations
        ease: "power2.inOut", // Smooth easing function
        onComplete: resolve, // Resolve promise when animation completes
      });
    });
  }

  // Animate Transition: Animates overlay scaling up to cover page
  function animateTransition() {
    return new Promise((resolve) => {
      // Set initial state: overlay hidden (scaleY: 0, starts from bottom)
      gsap.set(".transition-overlay", { scaleY: 0, transformOrigin: "bottom" });
      // Animate overlay to scaleY: 1 (covers screen) over 0.6s with stagger
      gsap.to(".transition-overlay", {
        scaleY: 1, // Expand overlay vertically
        duration: 0.6, // Animation duration
        stagger: 0.1, // Positive stagger for sequential animations
        ease: "power2.inOut", // Smooth easing function
        onComplete: resolve, // Resolve promise when animation completes
      });
    });
  }

  // Close mobile menu if open
  function closeMenuIfOpen() {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    // If menu button exists and has "menu-open" class, trigger click to close
    if (menuToggleBtn && menuToggleBtn.classList.contains("menu-open")) {
      menuToggleBtn.click();
    }
  }

  // Check if link points to the current page
  function isSamePage(href) {
    // Handle empty or invalid links
    if (!href || href === "#" || href === "") return true;

    const currentPath = window.location.pathname; // Current page path

    // Direct path match
    if (href === currentPath) return true;

    // Handle root/index page variations
    if (
      (currentPath === "/" || currentPath === "/index.html") &&
      (href === "/" ||
        href === "/index.html" ||
        href === "index.html" ||
        href === "./index.html")
    ) {
      return true;
    }

    // Compare file names for matching pages
    const currentFileName = currentPath.split("/").pop() || "index.html";
    const hrefFileName = href.split("/").pop();
    if (currentFileName === hrefFileName) return true;

    return false;
  }

  // Add click event listeners to all <a> tags
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href"); // Get link's href

      console.log("Link clicked:", href);
      console.log("Current path:", window.location.pathname);

      // Allow default behavior for external links, mailto, or tel links
      if (
        href &&
        (href.startsWith("http") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:"))
      ) {
        console.log("External link - allowing default");
        return;
      }

      // Prevent navigation for same-page links and close menu
      if (isSamePage(href)) {
        console.log("Same page detected - preventing navigation");
        event.preventDefault();
        closeMenuIfOpen();
        return;
      }

      // Perform transition for different page links
      console.log("Different page - doing transition");
      event.preventDefault(); // Prevent immediate navigation
      animateTransition().then(() => {
        window.location.href = href; // Navigate after transition
      });
    });
  });
});