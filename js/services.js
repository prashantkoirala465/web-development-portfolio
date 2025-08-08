import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = [];

  const initAnimations = () => {
    if (window.innerWidth <= 1000) {
      scrollTriggerInstances.forEach((instance) => {
        if (instance) instance.kill();
      });
      scrollTriggerInstances = [];
      return;
    }

    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    const services = gsap.utils.toArray(".service-card");

    const mainTrigger = ScrollTrigger.create({
      trigger: services[0],
      start: "top 50%",
      endTrigger: services[services.length - 1],
      end: "top 150%",
    });
    scrollTriggerInstances.push(mainTrigger);

    services.forEach((service, index) => {
      const isLastServiceCard = index === services.length - 1;
      const serviceCardInner = service.querySelector(".service-card-inner");

      if (!isLastServiceCard) {
        const pinTrigger = ScrollTrigger.create({
          trigger: service,
          start: "top 45%",
          endTrigger: ".contact-cta",
          end: "top 90%",
          pin: true,
          pinSpacing: false,
        });
        scrollTriggerInstances.push(pinTrigger);

        const scrollAnimation = gsap.to(serviceCardInner, {
          y: `-${(services.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: service,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            scrub: true,
          },
        });
        scrollTriggerInstances.push(scrollAnimation.scrollTrigger);
      }
    });
  };

  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});
