document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Floating Mascot Widget Interactivity & Quote Rotation
     ========================================================================== */
  const mascotWidget = document.getElementById('mascotWidget');
  const bubbleText = document.getElementById('bubbleText');

  const mascotQuotes = [
    "Joy in Every Scoop! 🍦",
    "Try Madagascar Vanilla! 💛",
    "SCREAMM for Strawberry! 🍓",
    "Belgian Choco is World Class! 🍫",
    "Alphonso Mango Dream! 🥭",
    "Scream For More! 🌟"
  ];

  let quoteIndex = 0;

  if (mascotWidget && bubbleText) {
    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % mascotQuotes.length;
      bubbleText.style.opacity = '0';
      setTimeout(() => {
        bubbleText.innerText = mascotQuotes[quoteIndex];
        bubbleText.style.opacity = '1';
      }, 300);
    }, 4500);

    mascotWidget.addEventListener('click', (e) => {
      createSprinkleBurst(e.clientX, e.clientY);
      showToast("👦 Leo says: 'Let's taste the best ice cream in town!' 🍨");
      
      const flavorsSection = document.getElementById('flavors');
      if (flavorsSection) {
        flavorsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function createSprinkleBurst(x, y) {
    const emojis = ['🍓', '🍦', '🍫', '✨', '⭐', '🌈', '🍒'];
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement('div');
      particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.position = 'fixed';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '99999';
      particle.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      const destX = x + Math.cos(angle) * distance;
      const destY = y + Math.sin(angle) * distance - 40;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${destX - x}px, ${destY - y}px) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 1000);
    }
  }

  /* ==========================================================================
     2. Hero Video Autoplay & Parallax Hover Effect
     ========================================================================== */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(error => {
      console.log('Autoplay was prevented by browser policy:', error);
    });
  }

  const hero = document.getElementById('hero');
  const particles = document.querySelectorAll('.particle');
  
  if (hero && particles.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 40;
      const moveY = (clientY - centerY) / 40;

      particles.forEach((p, index) => {
        const factor = (index + 1) * 0.3;
        p.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });
  }

  /* ==========================================================================
     3. Navbar Mobile Toggle
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const navbar = document.getElementById('navbar');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      hamburger.classList.toggle('mobile-active');
      if (navbar) navbar.classList.toggle('mobile-active');
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        hamburger.classList.remove('mobile-active');
        if (navbar) navbar.classList.remove('mobile-active');
      });
    });
  }

  /* ==========================================================================
     4. Menu Tabs Switcher
     ========================================================================== */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. Testimonial Carousel Slider
     ========================================================================== */
  const track = document.getElementById('testiTrack');
  const cards = document.querySelectorAll('.testi-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  let currentIndex = 0;
  const totalSlides = cards.length;

  if (track && totalSlides > 0) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
    }

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 6000);
  }

  /* ==========================================================================
     6. Flavor Order Buttons & Cart Toast
     ========================================================================== */
  const flavorBtns = document.querySelectorAll('.flavor-btn');
  
  flavorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.flavor-card');
      const flavorName = card ? card.querySelector('h3').innerText : 'Ice Cream';
      
      showToast(`🍨 Added "${flavorName}" to your SCREAMM order!`);
    });
  });

  function showToast(message) {
    let toast = document.getElementById('screammToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'screammToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '30px';
      toast.style.background = '#FF6B8A';
      toast.style.color = '#FFFFFF';
      toast.style.padding = '16px 28px';
      toast.style.borderRadius = '999px';
      toast.style.fontFamily = "'Fredoka One', cursive";
      toast.style.fontSize = '1.1rem';
      toast.style.boxShadow = '0 10px 30px rgba(255,107,138,0.4)';
      toast.style.zIndex = '99999';
      toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3000);
  }

  /* ==========================================================================
     7. Newsletter Form Submission
     ========================================================================== */
  const nlForm = document.getElementById('nlForm');
  const nlSuccess = document.getElementById('nlSuccess');

  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      nlForm.style.display = 'none';
      if (nlSuccess) {
        nlSuccess.style.display = 'block';
      }
    });
  }

});
