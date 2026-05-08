document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();


    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .room-card, .review-card, .facility-item, .value-card, .facility-card, .reveal-stagger');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        if (!el.classList.contains('reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        revealObserver.observe(el);
    });

    // Add CSS class for revealed state
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Preloader Removal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 1000);
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Mobile Dropdown Toggle
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('.has-dropdown');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                parent.classList.toggle('active');
            }
        });
    });

    // Booking form interaction
    const bookingBtn = document.querySelector('.booking-card .btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', () => {
            bookingBtn.textContent = 'Checking...';
            setTimeout(() => {
                bookingBtn.textContent = 'Rooms Available';
                bookingBtn.style.background = '#2D6A4F'; // Deep Emerald Success Green
                setTimeout(() => {
                    bookingBtn.textContent = 'Check Availability';
                    bookingBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // WhatsApp Enquiry Form
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone_num').value;
            const message = document.getElementById('msg').value;
            
            const waMessage = `*Birla Dharamshala Ayodhya - New Enquiry*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${message}`;
            const waUrl = `https://wa.me/918398962249?text=${encodeURIComponent(waMessage)}`;
            
            window.open(waUrl, '_blank');
        });
    }
});
