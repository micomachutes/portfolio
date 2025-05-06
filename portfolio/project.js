document.addEventListener('DOMContentLoaded', () => {
    // Add hamburger menu functionality
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.querySelector('nav').appendChild(hamburger);

    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Gallery functionality
    class Gallery {
        constructor() {
            this.container = document.querySelector('.gallery-container');
            this.prevButton = document.querySelector('.gallery-prev');
            this.nextButton = document.querySelector('.gallery-next');
            this.currentIndex = 0;
            this.images = [];

            // Example images - these should be replaced with actual project images
            this.images = [
                'project-image-1.jpg',
                'project-image-2.jpg',
                'project-image-3.jpg'
            ];

            this.initGallery();
        }

        initGallery() {
            if (this.images.length > 0) {
                this.showImage(0);
                this.setupControls();
            }
        }

        showImage(index) {
            this.container.innerHTML = `<img src="${this.images[index]}" alt="Project Screenshot ${index + 1}">`;
        }

        setupControls() {
            this.prevButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
                this.showImage(this.currentIndex);
            });

            this.nextButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
                this.showImage(this.currentIndex);
            });
        }
    }

    // Initialize gallery if we're on a project page
    if (document.querySelector('.project-gallery')) {
        new Gallery();
    }

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.target.classList.contains('animate')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            }
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});