document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });
            }
        });
    });
    
    // Add simple reveal animation for cards
    const observeElements = document.querySelectorAll('.feature-card, .item-category, .pricing-card, .rule-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Set initial state for animation
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ================= WhatsApp Modal Logic =================
    const waBtns = document.querySelectorAll('#wa-btn, .wa-cta-btn');
    const waModal = document.getElementById('wa-modal');
    const waClose = document.getElementById('wa-close');
    const waForm = document.getElementById('wa-form');

    if (waBtns.length > 0 && waModal && waClose && waForm) {
        // Open modal for all WhatsApp CTA buttons
        waBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                waModal.classList.add('active');
            });
        });

        // Close modal (X button)
        waClose.addEventListener('click', (e) => {
            e.preventDefault();
            waModal.classList.remove('active');
        });

        // Close modal (Click outside)
        waModal.addEventListener('click', (e) => {
            if (e.target === waModal) {
                waModal.classList.remove('active');
            }
        });

        // Handle form submission
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('wa-nome').value;
            const tipo = document.getElementById('wa-tipo').value;
            const convidados = document.getElementById('wa-convidados').value;
            
            const numero = "556784086130";
            const mensagem = `Olá! Vim pelo site e gostaria de um orçamento para o Rancho Central.\n\n*Nome:* ${nome}\n*Tipo de Evento:* ${tipo}\n*Convidados:* ${convidados}`;
            
            // Encode URI component formats spaces as %20 and line breaks as %0A
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
            
            window.open(url, '_blank');
            waModal.classList.remove('active');
            waForm.reset();
        });
    }
});
