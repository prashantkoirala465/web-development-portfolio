// services.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the homepage; exit if not
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = []; // Store ScrollTrigger instances for cleanup

  // Initialize animations
  const initAnimations = () => {
    // Disable animations on small screens (width <= 1000px)
    if (window.innerWidth <= 1000) {
      scrollTriggerInstances.forEach((instance) => {
        if (instance) instance.kill(); // Clean up existing instances
      });
      scrollTriggerInstances = []; // Reset array
      return;
    }

    // Clean up existing ScrollTrigger instances
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    // Get all service card elements
    const services = gsap.utils.toArray(".service-card");

    // Create main ScrollTrigger to track entire service section
    const mainTrigger = ScrollTrigger.create({
      trigger: services[0], // First service card as trigger
      start: "top 50%", // Start when top of first card hits 50% of viewport
      endTrigger: services[services.length - 1], // Last service card
      end: "top 150%", // End when last card's top hits 150% of viewport
    });
    scrollTriggerInstances.push(mainTrigger); // Store instance

    // Animate each service card
    services.forEach((service, index) => {
      const isLastServiceCard = index === services.length - 1; // Check if last card
      const serviceCardInner = service.querySelector(".service-card-inner"); // Inner element for animation

      if (!isLastServiceCard) {
        // Pin service card during scroll
        const pinTrigger = ScrollTrigger.create({
          trigger: service, // Current service card
          start: "top 45%", // Pin when top hits 45% of viewport
          endTrigger: ".contact-cta", // End at contact CTA section
          end: "top 90%", // End when contact CTA top hits 90% of viewport
          pin: true, // Pin the card in place
          pinSpacing: false, // No extra spacing for pinned elements
        });
        scrollTriggerInstances.push(pinTrigger); // Store instance

        // Animate inner card content with vertical movement
        const scrollAnimation = gsap.to(serviceCardInner, {
          y: `-${(services.length - index) * 14}vh`, // Move up based on card position
          ease: "none", // Linear animation for smooth scroll
          scrollTrigger: {
            trigger: service, // Current service card
            start: "top 45%", // Start animation at 45% of viewport
            endTrigger: ".contact-cta", // End at contact CTA
            end: "top 90%", // End when contact CTA top hits 90%
            scrub: true, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(scrollAnimation.scrollTrigger); // Store ScrollTrigger instance
      }
    });
  };

  // Run animations on page load
  initAnimations();

  // Re-run animations on window resize to recalculate trigger points
  window.addEventListener("resize", () => {
    initAnimations();
  });
});