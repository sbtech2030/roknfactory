// Language Management
let currentLang = 'ar';

const translations = {
    ar: {
        dir: 'rtl',
        lang: 'ar'
    },
    en: {
        dir: 'ltr',
        lang: 'en'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initContactForm();
    initSmoothScroll();
    initLightbox();
});

// Language Toggle
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        switchLanguage(currentLang);
    });
}

function switchLanguage(lang) {
    const html = document.documentElement;
    const langText = document.querySelector('.lang-text');
    
    // Update HTML attributes
    html.setAttribute('lang', translations[lang].lang);
    html.setAttribute('dir', translations[lang].dir);
    
    // Update button text
    langText.textContent = lang === 'ar' ? 'EN' : 'AR';
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    const inputs = document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]');
    inputs.forEach(input => {
        input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.service-card, .construction-card, .product-card, .stat-card, .about-text, .contact-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateCounters = () => {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight - 100 && !animated) {
            animated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Show success message (in a real application, you would send this to a server)
        const successMessage = currentLang === 'ar' 
            ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
            : 'Your message has been sent successfully! We will contact you soon.';
        
        alert(successMessage);
        
        // Reset form
        form.reset();
    });
}

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .construction-card, .product-card').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Preload images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// Add hover effects for cards
document.querySelectorAll('.service-card, .construction-card, .product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top button (optional enhancement)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add RTL support for scroll direction
if (document.documentElement.dir === 'rtl') {
    scrollTopBtn.style.right = 'auto';
    scrollTopBtn.style.left = '30px';
}

// Update scroll button position on language change
document.getElementById('langToggle').addEventListener('click', function() {
    setTimeout(() => {
        if (document.documentElement.dir === 'rtl') {
            scrollTopBtn.style.right = 'auto';
            scrollTopBtn.style.left = '30px';
        } else {
            scrollTopBtn.style.left = 'auto';
            scrollTopBtn.style.right = '30px';
        }
    }, 100);
});

// Lightbox Gallery Functions
function initLightbox() {
    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
    
    // Get alt text from the clicked image
    const clickedImg = document.querySelector(`img[src="${src}"]`);
    if (clickedImg && clickedImg.alt) {
        lightboxCaption.textContent = clickedImg.alt;
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Gallery Modal Functions
const galleryData = {
    precast: {
        title: {
            ar: 'منتجات خرسانية مسبقة الصنع',
            en: 'Precast Concrete Products'
        },
        images: [
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0009.jpg', alt: 'Circular Manholes' },
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0010.jpg', alt: 'Manhole Installation' },
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0011.jpg', alt: 'Concrete Products' },
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0012.jpg', alt: 'Precast Elements' },
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0013.jpg', alt: 'Water Tanks' },
            { src: 'https://roknfactory.com/wp-content/uploads/2020/07/IMG-20200712-WA0014.jpg', alt: 'Concrete Manholes' },
            { src: 'https://images.unsplash.com/photo-1590496793907-4d9d0c0e0d5d?w=600&h=400&fit=crop', alt: 'Circular Manholes' },
            { src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop', alt: 'Square Manholes' }
        ]
    },
    contracting: {
        title: {
            ar: 'المقاولات العامة',
            en: 'General Contracting'
        },
        images: [
            { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop', alt: 'Construction Site 1' },
            { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop', alt: 'Building Construction' },
            { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop', alt: 'Infrastructure Work' },
            { src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop', alt: 'Construction Progress' },
            { src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop', alt: 'Road Construction' },
            { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', alt: 'Modern Buildings' }
        ]
    },
    metal: {
        title: {
            ar: 'اكسسوارات معدنية',
            en: 'Metal Accessories'
        },
        images: [
            { src: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop', alt: 'Metal Accessories 1' },
            { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop', alt: 'Metal Work' },
            { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', alt: 'Metal Installation' },
            { src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop', alt: 'Metal Accessories 2' },
            { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', alt: 'Metal Components' },
            { src: 'https://images.unsplash.com/photo-1621905252472-3d0e6c3e3f3c?w=600&h=400&fit=crop', alt: 'Metal Fittings' }
        ]
    }
};

function openGalleryModal(type) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const body = document.getElementById('galleryModalBody');
    const lang = currentLang;
    
    // Set title
    title.textContent = galleryData[type].title[lang];
    
    // Clear previous content
    body.innerHTML = '';
    
    // Create gallery grid
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    
    // Add images
    galleryData[type].images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'gallery-img';
        img.onclick = () => openLightbox(image.src);
        grid.appendChild(img);
    });
    
    body.appendChild(grid);
    
    // Show modal
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    document.body.style.overflow = '';
}

// Close gallery modal on background click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }
});

