import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

document.addEventListener("DOMContentLoaded", () => {
  const isWorkPage = document.querySelector(".page.work-page");
  if (!isWorkPage) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let scrollTriggerInstances = [];

  const initHeaderAnimations = () => {
    gsap.set(".work-profile-icon", { scale: 0 });
    gsap.set(".work-header-arrow-icon", { scale: 0 });

    const feastText = SplitText.create(".work-header-content p", {
      type: "lines",
      mask: "lines",
    });

    const titleText = SplitText.create(".work-header-title h1", {
      type: "lines",
      mask: "lines",
    });

    gsap.set([feastText.lines, titleText.lines], {
      y: "120%",
    });

    const headerTl = gsap.timeline({ delay: 0.75 });

    headerTl.to(".work-profile-icon", {
      scale: 1,
      duration: 1,
      ease: "power4.out",
    });

    headerTl.to(
      feastText.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
      },
      "-=0.9"
    );

    headerTl.to(
      titleText.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );

    headerTl.to(
      ".work-header-arrow-icon",
      {
        scale: 1,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=0.9"
    );
  };

  const initAnimations = () => {
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    gsap.set(".work-item", {
      opacity: 0,
      scale: 0.75,
    });

    document.querySelectorAll(".work-items .row").forEach((row, index) => {
      const workItems = row.querySelectorAll(".work-item");

      workItems.forEach((item, itemIndex) => {
        const fromLeft = itemIndex % 2 === 0;

        gsap.set(item, {
          x: fromLeft ? -1000 : 1000,
          rotation: fromLeft ? -50 : 50,
          transformOrigin: "center center",
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: row,
        start: "top 75%",
        onEnter: () => {
          gsap.timeline().to(workItems, {
            duration: 1,
            x: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            ease: "power4.out",
          });
        },
      });
      scrollTriggerInstances.push(trigger);
    });

    ScrollTrigger.refresh();
  };

  initHeaderAnimations();
  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});
