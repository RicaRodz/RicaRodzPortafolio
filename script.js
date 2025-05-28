// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeText = themeToggle.querySelector(".theme-text");
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateThemeToggle(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggle(newTheme);
});

function updateThemeToggle(theme) {
  if (theme === "dark") {
    themeIcon.textContent = "🌙";
    themeText.textContent = "Dark";
  } else {
    themeIcon.textContent = "☀️";
    themeText.textContent = "Light";
  }
}

// Generate Animated Stars
function createStars() {
  const starsContainer = document.getElementById("starsContainer");
  const numberOfStars = 150;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.className = "star";

    // Random position
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    // Random size (1-3px)
    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Random animation delay
    star.style.animationDelay = Math.random() * 4 + "s";

    // Random animation duration
    star.style.animationDuration = Math.random() * 3 + 2 + "s";

    starsContainer.appendChild(star);
  }
}

// Add particle movement effect
function animateStars() {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star) => {
    const currentX = parseFloat(star.style.left);
    const currentY = parseFloat(star.style.top);

    // Subtle floating movement
    const newX = currentX + Math.sin(Date.now() * 0.001 + currentX) * 0.1;
    const newY = currentY + Math.cos(Date.now() * 0.001 + currentY) * 0.1;

    star.style.left = newX + "%";
    star.style.top = newY + "%";
  });

  requestAnimationFrame(animateStars);
}

// Start star animation after a delay
setTimeout(() => {
  animateStars();
}, 2000);

// Project Card Expand/Collapse Functionality
function initializeProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const header = card.querySelector(".project-header");
    const expandIcon = card.querySelector(".expand-icon");

    header.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded");

      // Close all other cards
      projectCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("expanded");
        }
      });

      // Toggle current card
      if (isExpanded) {
        card.classList.remove("expanded");
      } else {
        card.classList.add("expanded");

        // Smooth scroll to the card
        setTimeout(() => {
          card.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    });
  });
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe project cards for scroll animations
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// Enhanced hover effects
function initializeHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Parallax effect for stars
function initializeParallax() {
  const stars = document.querySelectorAll(".star");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    stars.forEach((star, index) => {
      const speed = ((index % 3) + 1) * 0.3;
      star.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Typing animation for the name title
function initializeTypingAnimation() {
  const nameTitle = document.querySelector(".name-title");
  const originalText = nameTitle.textContent;
  nameTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      nameTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500);
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  initializeProjectCards();
  initializeSmoothScrolling();
  initializeScrollAnimations();
  initializeHoverEffects();
  initializeParallax();
  initializeTypingAnimation();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Additional scroll-based animations can be added here
  }, 16)
); // ~60fps
