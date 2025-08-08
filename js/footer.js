// footer.js

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
    // Check if current page is the contact page; exit if true
    const isContactPage = document.querySelector(".page.contact-page");
    if (isContactPage) return;
  
    // Select DOM elements
    const footer = document.querySelector("footer"); // Footer element to trigger explosion
    const explosionContainer = document.querySelector(".explosion-container"); // Container for particle images
    let hasExploded = false; // Tracks if explosion has occurred
  
    // Configuration for particle behavior
    const config = {
      gravity: 0.25, // Downward force applied to particles
      friction: 0.99, // Slows down particle movement and rotation
      imageSize: 150, // Size of particle images (px)
      horizontalForce: 20, // Max horizontal velocity range
      verticalForce: 15, // Initial upward velocity
      rotationSpeed: 10, // Max rotation speed (degrees)
      resetDelay: 500, // Delay before checking footer position (ms)
    };
  
    // Define particle images
    const imageParticleCount = 10; // Number of particle images
    const imagePaths = Array.from(
      { length: imageParticleCount },
      (_, i) => `/images/work-items/work-item-${i + 1}.jpg` // Paths to images (work-item-1.jpg to work-item-10.jpg)
    );
  
    // Preload images to avoid delays
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  
    // Create particle images in the explosion container
    const createParticles = () => {
      explosionContainer.innerHTML = ""; // Clear existing particles
      imagePaths.forEach((path) => {
        const particle = document.createElement("img");
        particle.src = path;
        particle.classList.add("explosion-particle-img"); // Add class for styling
        particle.style.width = `${config.imageSize}px`; // Set image size
        explosionContainer.appendChild(particle); // Add to container
      });
    };
  
    // Particle class to manage individual particle behavior
    class Particle {
      constructor(element) {
        this.element = element; // DOM element for the particle
        this.x = 0; // Initial x position
        this.y = 0; // Initial y position
        this.vx = (Math.random() - 0.5) * config.horizontalForce; // Random horizontal velocity
        this.vy = -config.verticalForce - Math.random() * 10; // Upward velocity with random variation
        this.rotation = 0; // Initial rotation
        this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed; // Random rotation speed
      }
  
      // Update particle position and rotation
      update() {
        this.vy += config.gravity; // Apply gravity to vertical velocity
        this.vx *= config.friction; // Apply friction to horizontal velocity
        this.vy *= config.friction; // Apply friction to vertical velocity
        this.rotationSpeed *= config.friction; // Slow down rotation
        this.x += this.vx; // Update x position
        this.y += this.vy; // Update y position
        this.rotation += this.rotationSpeed; // Update rotation
        // Apply transform to element
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }
  
    // Trigger explosion animation
    const explode = () => {
      if (hasExploded) return; // Prevent multiple explosions
      hasExploded = true; // Mark as exploded
  
      createParticles(); // Create fresh particle images
      const particleElements = document.querySelectorAll(".explosion-particle-img"); // Select particles
      const particles = Array.from(particleElements).map(
        (element) => new Particle(element) // Create Particle instances
      );
  
      let animationId; // Store animation frame ID
      const animate = () => {
        particles.forEach((particle) => particle.update()); // Update all particles
        animationId = requestAnimationFrame(animate); // Continue animation
        // Stop animation when all particles fall below half the container height
        if (
          particles.every(
            (particle) => particle.y > explosionContainer.offsetHeight / 2
          )
        ) {
          cancelAnimationFrame(animationId); // Stop animation
        }
      };
      animate(); // Start animation
    };
  
    // Check if footer is in viewport to trigger explosion
    const checkFooterPosition = () => {
      const footerRect = footer.getBoundingClientRect(); // Get footer position
      const viewportHeight = window.innerHeight; // Viewport height
      // Reset explosion if footer is far above viewport
      if (footerRect.top > viewportHeight + 100) {
        hasExploded = false;
      }
      // Trigger explosion if footer is within 250px of viewport bottom
      if (!hasExploded && footerRect.top <= viewportHeight + 250) {
        explode();
      }
    };
  
    // Debounce scroll event to check footer position
    let checkTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(checkTimeout); // Clear previous timeout
      checkTimeout = setTimeout(checkFooterPosition, 5); // Check after 5ms
    });
  
    // Reset explosion on window resize
    window.addEventListener("resize", () => {
      hasExploded = false;
    });
  
    // Initialize particles and check footer position on load
    createParticles();
    setTimeout(checkFooterPosition, 500); // Initial check after 500ms
  });