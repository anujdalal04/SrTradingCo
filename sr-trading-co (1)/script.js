document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header")
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const dropdowns = document.querySelectorAll(".dropdown")

  // Scroll event for header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
    }
  })

  // Handle dropdowns on mobile
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a")
    const submenu = dropdown.querySelector(".dropdown-menu")

    // For mobile view
    if (window.innerWidth <= 768) {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        submenu.classList.toggle("show")
      })
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Active menu item based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavItem() {
    const scrollPosition = window.scrollY
    const headerHeight = header.offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll(".nav-menu a").forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === "#" + sectionId) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavItem)

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      }

      // Here you would typically send the data to a server
      // For this static site, we'll just show a success message

      // Clear form
      contactForm.reset()

      // Show success message
      alert("Thank you for your message! We will contact you soon at +91 93224 04713.")
    })
  }

  // Animation on scroll
  function revealOnScroll() {
    const elements = document.querySelectorAll(".about-content, .product-card, .brand-card, .client, .contact-content")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("revealed")
      }
    })
  }

  // Add CSS for the reveal animation
  const style = document.createElement("style")
  style.textContent = `
        .about-content, .product-card, .brand-card, .client, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)

  window.addEventListener("scroll", revealOnScroll)
  revealOnScroll() // Initial check on page load
})
