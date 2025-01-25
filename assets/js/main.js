// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference, otherwise use system preference
const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
    htmlElement.className = `${theme}-theme`;
    themeToggle.checked = theme === 'light';
    localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getCurrentTheme());

// Handle theme toggle
themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'light' : 'dark');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.backdropFilter = 'blur(15px)';
    }
    lastScroll = currentScroll;
});

// Parallax effect for hero section
const heroImage = document.querySelector('.hero-image');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    if (heroImage) {
        heroImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});

// Intersection Observer for fade-in animations
const fadeInElements = document.querySelectorAll('.feature-card, .step-card, .section-header');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeInObserver.observe(element);
});

// Interactive feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Gradient follow effect
        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(108, 99, 255, 0.1),
                transparent 50%
            )
        `;
        
        // 3D tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--card-bg)';
        card.style.transform = 'none';
    });
});

// Animate numbers in step cards
const stepNumbers = document.querySelectorAll('.step-number');
stepNumbers.forEach(number => {
    number.style.transform = 'scale(0.5)';
    number.style.opacity = '0';
});

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

stepNumbers.forEach(number => {
    number.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    stepObserver.observe(number);
}); 
}); 