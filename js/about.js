import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  // Check for either about-page class OR if about-hero section exists
  const isAboutPage = document.querySelector(".page.about-page") || document.querySelector(".about-hero");
  if (!isAboutPage) return;

  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = [];

  const initAnimations = () => {
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    // Check if stats elements exist before animating them
    const statsElements = document.querySelectorAll(".stats-item-1, .stats-item-2, .stats-item-3");
    if (statsElements.length > 0) {
      gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
        scale: 0,
      });

      const statsAnimation = gsap.to(
        [".stats-item-1", ".stats-item-2", ".stats-item-3"],
        {
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".stats",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
      scrollTriggerInstances.push(statsAnimation.scrollTrigger);
    }

    if (window.innerWidth > 1000) {
      // Portrait animation - check if element exists
      const portraitElement = document.querySelector(".about-hero-portrait");
      if (portraitElement) {
        const portraitAnimation = gsap.to(".about-hero-portrait", {
          y: -200,
          rotation: -25,
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(portraitAnimation.scrollTrigger);
      }

      // Tag animations - check if elements exist
      const tag1 = document.querySelector("#tag-1");
      if (tag1) {
        const tag1Animation = gsap.to("#tag-1", {
          y: -300,
          rotation: -45,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top bottom",
            end: "bottom+=100% top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(tag1Animation.scrollTrigger);
      }

      const tag2 = document.querySelector("#tag-2");
      if (tag2) {
        const tag2Animation = gsap.to("#tag-2", {
          y: -150,
          rotation: 70,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top bottom",
            end: "bottom+=100% top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(tag2Animation.scrollTrigger);
      }

      const tag3 = document.querySelector("#tag-3");
      if (tag3) {
        const tag3Animation = gsap.to("#tag-3", {
          y: -400,
          rotation: 120,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top bottom",
            end: "bottom+=100% top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(tag3Animation.scrollTrigger);
      }

      const tag4 = document.querySelector("#tag-4");
      if (tag4) {
        const tag4Animation = gsap.to("#tag-4", {
          y: -350,
          rotation: -60,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top bottom",
            end: "bottom+=100% top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(tag4Animation.scrollTrigger);
      }

      const tag5 = document.querySelector("#tag-5");
      if (tag5) {
        const tag5Animation = gsap.to("#tag-5", {
          y: -200,
          rotation: 100,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top bottom",
            end: "bottom+=100% top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(tag5Animation.scrollTrigger);
      }
    }
  };

  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});