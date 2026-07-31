/* ==========================================================================
   YUVA 2026 Website Script
   Created By: Antigravity Code Assistant & VSM Team
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scroll Effect
  const header = document.querySelector('header');
  const scrollup = document.querySelector('.scrollup');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      if (scrollup) scrollup.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      if (scrollup) scrollup.classList.remove('show');
    }
  });

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggleLinks = document.querySelectorAll('.nav-item.dropdown > a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links (non-dropdown)
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Handle dropdown toggle on mobile tap
  dropdownToggleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parentItem = link.parentElement;
        parentItem.classList.toggle('dropdown-active');
      }
    });
  });

  // 3. Quote / Testimonial Slider
  const quoteSlides = document.querySelectorAll('.quote-slide');
  const quoteDotsContainer = document.querySelector('.quote-dots');
  let currentQuoteIndex = 0;
  let quoteInterval;

  if (quoteSlides.length > 0) {
    // Generate dots dynamically if container exists
    if (quoteDotsContainer) {
      quoteSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('quote-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
          goToQuote(index);
          resetQuoteTimer();
        });
        quoteDotsContainer.appendChild(dot);
      });
    }

    function showQuote(index) {
      quoteSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (quoteDotsContainer) {
          const dots = quoteDotsContainer.querySelectorAll('.quote-dot');
          if (dots[i]) dots[i].classList.remove('active');
        }
      });
      
      quoteSlides[index].classList.add('active');
      if (quoteDotsContainer) {
        const dots = quoteDotsContainer.querySelectorAll('.quote-dot');
        if (dots[index]) dots[index].classList.add('active');
      }
      currentQuoteIndex = index;
    }

    function nextQuote() {
      let nextIndex = currentQuoteIndex + 1;
      if (nextIndex >= quoteSlides.length) nextIndex = 0;
      showQuote(nextIndex);
    }

    function goToQuote(index) {
      showQuote(index);
    }

    function startQuoteTimer() {
      quoteInterval = setInterval(nextQuote, 6000); // 6 seconds auto-rotate
    }

    function resetQuoteTimer() {
      clearInterval(quoteInterval);
      startQuoteTimer();
    }

    startQuoteTimer();
  }

  // 4. Animated Counters
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length > 0) {
    const runCounters = () => {
      counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + (counter.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
          }
        }, stepTime);
      });
    };

    // Intersection Observer to trigger when visible
    const observerOptions = {
      root: null,
      threshold: 0.2
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // 5. Dignitaries Collapsible Section
  const pastHeader = document.querySelector('.past-dignitaries-header');
  const pastContent = document.querySelector('.past-dignitaries-content');

  if (pastHeader && pastContent) {
    pastHeader.addEventListener('click', () => {
      pastHeader.classList.toggle('active');
      pastContent.classList.toggle('active');
    });
  }
});
