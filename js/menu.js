// menu.js

// Import GSAP library for animations
import gsap from "gsap";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const menuToggleBtn = document.querySelector(".menu-toggle-btn"); // Menu toggle button
  const navOverlay = document.querySelector(".nav-overlay"); // Navigation overlay
  const openLabel = document.querySelector(".open-label"); // Open menu label
  const closeLabel = document.querySelector(".close-label"); // Close menu label
  const navItems = document.querySelectorAll(".nav-item"); // Navigation items
  let isMenuOpen = false; // Tracks menu state (open/closed)
  let isAnimating = false; // Prevents multiple animations at once
  let scrollY = 0; // Stores scroll position when menu opens

  // Add click event listener to menu toggle button
  menuToggleBtn.addEventListener("click", () => {
    // Stop any ongoing animations to prevent conflicts
    if (isAnimating) {
      gsap.killTweensOf([navOverlay, openLabel, closeLabel, navItems]);
      isAnimating = false;
    }

    // Open Menu
    if (!isMenuOpen) {
      isAnimating = true; // Mark animation as active

      // Enable pointer events on overlay to make it interactive
      navOverlay.style.pointerEvents = "all";
      // Add "menu-open" class to toggle button for styling
      menuToggleBtn.classList.add("menu-open");
      // Store current scroll position
      scrollY = window.scrollY;
      // Lock body scroll by fixing position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`; // Preserve scroll position
      document.body.style.width = "100%"; // Prevent width shift

      // Animate open label upward
      gsap.to(openLabel, {
        y: "-1rem", // Move up by 1rem
        duration: 0.3, // Animation duration
      });

      // Animate close label upward
      gsap.to(closeLabel, {
        y: "-1rem", // Move up by 1rem
        duration: 0.3, // Animation duration
      });

      // Fade in navigation overlay
      gsap.to(navOverlay, {
        opacity: 1, // Fully visible
        duration: 0.3, // Animation duration
        onComplete: () => {
          isAnimating = false; // Mark animation as complete
        },
      });

      // Animate nav items and footer items (header/copy) into view
      gsap.to([navItems, ".nav-footer-item-header", ".nav-footer-item-copy"], {
        opacity: 1, // Fully visible
        y: "0%", // Move to original position
        duration: 0.75, // Longer duration for smooth effect
        stagger: 0.075, // Sequential animation for each item
        ease: "power4.out", // Smooth, strong easing
      });

      isMenuOpen = true; // Update menu state
    }
    // Close Menu
    else {
      isAnimating = true; // Mark animation as active

      // Disable pointer events on overlay
      navOverlay.style.pointerEvents = "none";
      // Remove "menu-open" class from toggle button
      menuToggleBtn.classList.remove("menu-open");
      // Restore body scroll
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore scroll position
      window.scrollTo(0, scrollY);

      // Animate open label back to original position
      gsap.to(openLabel, {
        y: "0rem", // Reset position
        duration: 0.3, // Animation duration
      });

      // Animate close label back to original position
      gsap.to(closeLabel, {
        y: "0rem", // Reset position
        duration: 0.3, // Animation duration
      });

      // Fade out navigation overlay
      gsap.to(navOverlay, {
        opacity: 0, // Fully hidden
        duration: 0.3, // Animation duration
        onComplete: () => {
          // Reset nav items and footer items to initial state
          gsap.set(
            [navItems, ".nav-footer-item-header", ".nav-footer-item-copy"],
            {
              opacity: 0, // Hidden
              y: "100%", // Moved down out of view
            }
          );
          isAnimating = false; // Mark animation as complete
        },
      });

      isMenuOpen = false; // Update menu state
    }
  });
});