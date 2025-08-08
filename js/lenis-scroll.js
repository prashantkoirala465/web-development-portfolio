// lenis-scroll.js

// Import Lenis for smooth scrolling and GSAP/ScrollTrigger for animations
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Determine if device is mobile (width <= 900px)
  let isMobile = window.innerWidth <= 900;

  // Define scroll settings for mobile and desktop
  const scrollSettings = isMobile
    ? {
        duration: 1, // Scroll animation duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
        direction: "vertical", // Scroll direction
        gestureDirection: "vertical", // Gesture direction for touch
        smooth: true, // Enable smooth scrolling
        smoothTouch: true, // Enable smooth scrolling for touch devices
        touchMultiplier: 1.5, // Sensitivity for touch scrolling
        infinite: false, // No infinite scroll
        lerp: 0.05, // Linear interpolation for smoother scroll
        wheelMultiplier: 1, // Scroll wheel sensitivity
        orientation: "vertical", // Scroll orientation
        smoothWheel: true, // Smooth wheel scrolling
        syncTouch: true, // Sync touch scroll with native scroll
      }
    : {
        duration: 1.2, // Slightly longer duration for desktop
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Same easing
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false, // Disable smooth touch on desktop
        touchMultiplier: 2, // Higher sensitivity for touch
        infinite: false,
        lerp: 0.1, // Slightly higher lerp for desktop
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  // Initialize Lenis with selected scroll settings
  let lenis = new Lenis(scrollSettings);

  // Update ScrollTrigger on Lenis scroll events
  lenis.on("scroll", ScrollTrigger.update);

  // Integrate Lenis with GSAP's ticker for smooth animation
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Run Lenis animation frame (RAF) with GSAP ticker
  });

  // Disable GSAP lag smoothing to prevent animation delays
  gsap.ticker.lagSmoothing(0);

  // Handle window resize to update scroll settings
  const handleResize = () => {
    const wasMobile = isMobile; // Store previous mobile state
    isMobile = window.innerWidth <= 900; // Update mobile state

    // Reinitialize Lenis only if mobile state changes
    if (wasMobile !== isMobile) {
      lenis.destroy(); // Destroy existing Lenis instance

      // Define new scroll settings based on updated mobile state
      const newScrollSettings = isMobile
        ? {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 1.5,
            infinite: false,
            lerp: 0.05,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          }
        : {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          };

      // Create new Lenis instance with updated settings
      lenis = new Lenis(newScrollSettings);
      lenis.on("scroll", ScrollTrigger.update); // Rebind ScrollTrigger update
    }
  };

  // Add resize event listener to handle mobile/desktop transitions
  window.addEventListener("resize", handleResize);
});