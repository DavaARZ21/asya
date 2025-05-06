// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
  });
});

// Pre-loader Animation
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const progress = document.querySelector('.progress');
  
  gsap.to(progress, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut'
  });
  
  gsap.to(loader, {
    y: '-100%',
    duration: 0.8,
    delay: 2,
    ease: 'power4.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      animateHero();
    }
  });
});

// Hero Text Animation
function animateHero() {
  const textElements = document.querySelectorAll('.text-reveal');
  
  textElements.forEach((text, index) => {
    // Create overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'var(--primary-color)';
    overlay.style.transformOrigin = 'right';
    
    text.style.position = 'relative';
    text.appendChild(overlay);
    
    // Reveal text animation
    const tl = gsap.timeline();
    
    tl.set(text.querySelector('span'), { visibility: 'visible' });
    
    tl.to(overlay, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      delay: 0.3 * index,
      ease: 'power4.inOut'
    });
    
    // Animate Hero Shapes
    gsap.from('.hero-shapes .shape', {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 1.5,
      ease: 'power2.out'
    });
  });
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
  
  gsap.to(cursorFollower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3
  });
});

// Change cursor size on links and buttons
const links = document.querySelectorAll('a, button, .cta, .hamburger');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorFollower.style.transform = 'scale(1.5) translate(-25%, -25%)';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%)';
  });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list ul');
const navLinks = document.querySelectorAll('.nav-list ul li a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// GSAP ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    
    gsap.to(bar, {
      width: `${progress}%`,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// Animate services section
function animateServices() {
  gsap.from('.service-item', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
}

// Animate projects section
function animateProjects() {
  gsap.from('.project-item', {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
}

// Animate about section
function animateAbout() {
  gsap.from('.about-img', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.col-right', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate stats with counter
  const stats = document.querySelectorAll('.stat h3');
  stats.forEach(stat => {
    const value = parseInt(stat.textContent);
    gsap.from(stat, {
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      onUpdate: function() {
        stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
      }
    });
  });
}

// Animate contact section
function animateContact() {
  gsap.from('.contact-form', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Form field animations
  const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
  formFields.forEach((field, index) => {
    gsap.from(field, {
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// Footer animation
function animateFooter() {
  gsap.from('.footer .brand', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.footer h2', {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
}

// Initialize all GSAP animations
window.addEventListener('load', () => {
  animateSkillBars();
  animateServices();
  animateProjects();
  animateAbout();
  animateContact();
  animateFooter();
});

// Form submit event
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation for form submission
    gsap.to('.contact-form', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Show success message (in a real implementation)
        contactForm.reset();
        gsap.to('.contact-form', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.5
        });
      }
    });
  });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const heroShapes = document.querySelectorAll('.hero-shapes .shape');
  
  heroShapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    shape.style.transform = `translateY(${scrollPosition * speed}px)`;
  });
});