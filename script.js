document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn, .btn, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's a hash link
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });

    // 3. Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
            if(current === 'home') {
                navItems[0].classList.add('active');
            }
        });
    });

    // 4. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const headerBtn = document.querySelector('.nav-btn');

    // Create a mobile menu wrapper
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            setupMobileMenu();
        } else {
            // Reset mobile styles
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.position = 'static';
            navLinksContainer.style.flexDirection = 'row';
            navLinksContainer.style.background = 'transparent';
            navLinksContainer.style.padding = '0';
            headerBtn.style.display = 'block';
        }
    });

    function setupMobileMenu() {
        navLinksContainer.style.display = 'none';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'rgba(11, 15, 25, 0.95)';
        navLinksContainer.style.backdropFilter = 'blur(10px)';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.padding = '20px';
        navLinksContainer.style.gap = '20px';
        navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        headerBtn.style.display = 'none';
    }

    hamburger.addEventListener('click', () => {
        if (navLinksContainer.style.display === 'none' || !navLinksContainer.style.display) {
            navLinksContainer.style.display = 'flex';
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navLinksContainer.style.display = 'none';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // 5. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .section-header, .cta-box');
    
    // Add base hidden class to elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Testimonials Carousel
    const track = document.getElementById('carouselTrack');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('carouselIndicators');

        // Create dots based on slide count
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.dataset.index = index;
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);
        let currentSlideIndex = 0;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlideIndex = index;
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = currentSlideIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex);
        });

        dotsNav.addEventListener('click', e => {
            if (!e.target.classList.contains('dot')) return;
            const targetIndex = parseInt(e.target.dataset.index);
            updateCarousel(targetIndex);
        });
        
        // Auto slide loop every 5 seconds
        setInterval(() => {
            nextButton.click();
        }, 5000);
    }
});
