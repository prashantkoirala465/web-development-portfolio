// about.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the about page or has about-hero section; exit if not
  const isAboutPage = document.querySelector(".page.about-page") || document.querySelector(".about-hero");
  if (!isAboutPage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = []; // Store ScrollTrigger instances for cleanup

  // Initialize animations
  const initAnimations = () => {
    // Clean up existing ScrollTrigger instances
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    // Stats items animation (if stats elements exist)
    const statsElements = document.querySelectorAll(".stats-item-1, .stats-item-2, .stats-item-3");
    if (statsElements.length > 0) {
      // Set initial state for stats items
      gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
        scale: 0, // Start scaled down
      });

      // Animate stats items
      const statsAnimation = gsap.to(
        [".stats-item-1", ".stats-item-2", ".stats-item-3"],
        {
          scale: 1, // Scale to full size
          duration: 1, // Animation duration
          stagger: 0.1, // Stagger animations by 0.1s
          ease: "power4.out", // Smooth easing
          scrollTrigger: {
            trigger: ".stats", // Trigger element
            start: "top 50%", // Start when top of stats hits 50% of viewport
            toggleActions: "play none none none", // Play animation on enter
          },
        }
      );
      scrollTriggerInstances.push(statsAnimation.scrollTrigger); // Store instance
    }

    // Animations for larger screens (> 1000px)
    if (window.innerWidth > 1000) {
      // Portrait animation (if element exists)
      const portraitElement = document.querySelector(".about-hero-portrait");
      if (portraitElement) {
        const portraitAnimation = gsap.to(".about-hero-portrait", {
          y: -200, // Move up by 200px
          rotation: -25, // Rotate -25 degrees
          scrollTrigger: {
            trigger: ".about-hero", // Trigger element
            start: "top top", // Start when top of hero hits top of viewport
            end: "bottom top", // End when bottom of hero hits top of viewport
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(portraitAnimation.scrollTrigger); // Store instance
      }

      // Tag animations (if elements exist)
      const tag1 = document.querySelector("#tag-1");
      if (tag1) {
        const tag1Animation = gsap.to("#tag-1", {
          y: -300, // Move up by 300px
          rotation: -45, // Rotate -45 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag1Animation.scrollTrigger); // Store instance
      }

      const tag2 = document.querySelector("#tag-2");
      if (tag2) {
        const tag2Animation = gsap.to("#tag-2", {
          y: -150, // Move up by 150px
          rotation: 70, // Rotate 70 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag2Animation.scrollTrigger); // Store instance
      }

      const tag3 = document.querySelector("#tag-3");
      if (tag3) {
        const tag3Animation = gsap.to("#tag-3", {
          y: -400, // Move up by 400px
          rotation: 120, // Rotate 120 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag3Animation.scrollTrigger); // Store instance
      }

      const tag4 = document.querySelector("#tag-4");
      if (tag4) {
        const tag4Animation = gsap.to("#tag-4", {
          y: -350, // Move up by 350px
          rotation: -60, // Rotate -60 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag4Animation.scrollTrigger); // Store instance
      }

      const tag5 = document.querySelector("#tag-5");
      if (tag5) {
        const tag5Animation = gsap.to("#tag-5", {
          y: -200, // Move up by 200px
          rotation: 100, // Rotate 100 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag5Animation.scrollTrigger); // Store instance
      }
    }
  };

  // Run animations on page load
  initAnimations();

  // Re-run animations on window resize to recalculate trigger points
  window.addEventListener("resize", () => {
    initAnimations();
  });
});