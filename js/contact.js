// contact.js

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the contact page; exit if not
  const isContactPage = document.querySelector(".page.contact-page");
  if (!isContactPage) return;

  // Select trail container for mouse-driven image trail
  const container = document.querySelector(".trail-container");
  let isDesktop = window.innerWidth > 1000; // Check if screen is desktop (> 1000px)
  let animationId = null; // Store animation frame ID
  let mouseMoveListener = null; // Store mousemove event listener

  // Configuration for image trail behavior
  const config = {
    imageCount: 8, // Number of images in trail
    imageLifespan: 800, // Time before image removal (ms)
    removalDelay: 60, // Delay between removals (ms)
    mouseThreshold: 80, // Minimum mouse movement distance to create image
    inDuration: 600, // Animation duration for image appearance (ms)
    outDuration: 800, // Animation duration for image removal (ms)
    inEasing: "cubic-bezier(.07,.5,.5,1)", // Easing for image appearance
    outEasing: "cubic-bezier(.87, 0, .13, 1)", // Easing for image removal
  };

  // Define image paths for trail
  const images = Array.from(
    { length: config.imageCount },
    (_, i) => `/images/work-items/work-item-${i + 1}.jpg` // Paths to images (work-item-1.jpg to work-item-8.jpg)
  );
  const trail = []; // Store active trail images

  // Track mouse position and state
  let mouseX = 0,
    mouseY = 0,
    lastMouseX = 0,
    lastMouseY = 0;
  let isCursorInContainer = false; // Check if cursor is in trail container
  let lastRemovalTime = 0; // Track last image removal time

  // Create floating elements for background animation
  const createFloatingElements = () => {
    const floatingContainer = document.querySelector(".floating-elements");
    if (!floatingContainer) return; // Exit if container not found
    for (let i = 0; i < 12; i++) {
      const element = document.createElement("div");
      element.className = "floating-element"; // Add class for styling
      element.style.left = Math.random() * 100 + "%"; // Random horizontal position
      element.style.animationDelay = Math.random() * 8 + "s"; // Random delay (0-8s)
      element.style.animationDuration = 8 + Math.random() * 4 + "s"; // Duration (8-12s)
      floatingContainer.appendChild(element); // Add to container
    }
  };

  // Check if mouse is within trail container
  const isInContainer = (x, y) => {
    const rect = container.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  // Check if mouse has moved enough to create a new image
  const hasMovedEnough = () => {
    const distance = Math.sqrt(
      Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
    );
    return distance > config.mouseThreshold; // Compare with threshold
  };

  // Create a new trail image at mouse position
  const createImage = () => {
    const img = document.createElement("img");
    img.classList.add("trail-img"); // Add class for styling
    const randomIndex = Math.floor(Math.random() * images.length); // Random image
    const rotation = (Math.random() - 0.5) * 40; // Random rotation (-20 to 20 deg)
    img.src = images[randomIndex]; // Set image source
    const rect = container.getBoundingClientRect();
    const relativeX = mouseX - rect.left; // Mouse X relative to container
    const relativeY = mouseY - rect.top; // Mouse Y relative to container
    img.style.left = `${relativeX}px`; // Position at mouse X
    img.style.top = `${relativeY}px`; // Position at mouse Y
    img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`; // Start scaled down
    img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`; // Animation for appearance
    container.appendChild(img); // Add to container
    // Animate to full scale
    setTimeout(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
    }, 10);
    // Add to trail array
    trail.push({
      element: img,
      rotation: rotation,
      removeTime: Date.now() + config.imageLifespan,
    });
  };

  // Remove oldest image if lifespan exceeded
  const removeOldImages = () => {
    const now = Date.now();
    if (now - lastRemovalTime < config.removalDelay || trail.length === 0) return; // Skip if too soon or no images
    const oldestImage = trail[0];
    if (now >= oldestImage.removeTime) {
      const imgToRemove = trail.shift(); // Remove oldest image
      imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`; // Animation for removal
      imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`; // Scale down
      lastRemovalTime = now; // Update last removal time
      // Remove from DOM after animation
      setTimeout(() => {
        if (imgToRemove.element.parentNode) {
          imgToRemove.element.parentNode.removeChild(imgToRemove.element);
        }
      }, config.outDuration);
    }
  };

  // Start mouse trail animation
  const startAnimation = () => {
    if (!isDesktop) return; // Exit if not desktop
    mouseMoveListener = (e) => {
      mouseX = e.clientX; // Update mouse X
      mouseY = e.clientY; // Update mouse Y
      isCursorInContainer = isInContainer(mouseX, mouseY); // Check if in container
      if (isCursorInContainer && hasMovedEnough()) {
        lastMouseX = mouseX; // Update last mouse position
        lastMouseY = mouseY;
        createImage(); // Create new image
      }
    };
    document.addEventListener("mousemove", mouseMoveListener); // Add mousemove listener
    const animate = () => {
      removeOldImages(); // Remove old images
      animationId = requestAnimationFrame(animate); // Continue animation
    };
    animate(); // Start animation loop
  };

  // Stop mouse trail animation
  const stopAnimation = () => {
    if (mouseMoveListener) {
      document.removeEventListener("mousemove", mouseMoveListener); // Remove listener
      mouseMoveListener = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId); // Stop animation loop
      animationId = null;
    }
    trail.forEach((item) => {
      if (item.element.parentNode) {
        item.element.parentNode.removeChild(item.element); // Clear all images
      }
    });
    trail.length = 0; // Reset trail array
  };

  // Handle window resize to toggle animation
  const handleResize = () => {
    const wasDesktop = isDesktop;
    isDesktop = window.innerWidth > 1000; // Update desktop state
    if (isDesktop && !wasDesktop) {
      startAnimation(); // Start animation on desktop
    } else if (!wasDesktop && isDesktop) {
      stopAnimation(); // Stop animation on mobile
    }
  };

  // Handle form submission with feedback
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const form = e.target;
    const submitBtn = form.querySelector(".submit-btn"); // Submit button
    const successMessage = document.getElementById("successMessage"); // Success message element
    submitBtn.style.transform = "translateY(-1px)"; // Slight button press effect
    submitBtn.textContent = "Sending..."; // Update button text
    submitBtn.disabled = true; // Disable button
    setTimeout(() => {
      form.reset(); // Reset form
      submitBtn.textContent = "Send Message"; // Restore button text
      submitBtn.disabled = false; // Enable button
      submitBtn.style.transform = ""; // Reset button style
      successMessage.classList.add("show"); // Show success message
      setTimeout(() => {
        successMessage.classList.remove("show"); // Hide after 5s
      }, 5000);
    }, 1500); // Simulate form submission delay
  };

  // Enhance form inputs with focus/blur animations
  const enhanceFormInputs = () => {
    const inputs = document.querySelectorAll(".form-group input, .form-group textarea, .form-group select");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.style.transform = "translateY(-2px)"; // Lift parent on focus
      });
      input.addEventListener("blur", () => {
        input.parentElement.style.transform = ""; // Reset on blur
      });
    });
  };

  // Add event listeners and initialize
  window.addEventListener("resize", handleResize); // Handle resize
  createFloatingElements(); // Create background floating elements
  enhanceFormInputs(); // Enhance form inputs
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit); // Add form submit handler
  }
  if (isDesktop) {
    startAnimation(); // Start animation on desktop
  }
});