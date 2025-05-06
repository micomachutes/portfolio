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

    // Smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-image-container">
                <img src="" alt="Project Screenshot" class="modal-image">
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    const modalImage = modal.querySelector('.modal-image');
    const closeButton = modal.querySelector('.close-button');

    // Add click event to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            modal.style.display = 'block';
            const screenshotPath = card.getAttribute('data-screenshot');
            modalImage.src = screenshotPath;
            document.body.style.overflow = 'hidden';
        });
    });

    // Add skill modal functionality
    const skillModal = document.querySelector('.skill-modal');
    const skillTitle = document.querySelector('.skill-modal .skill-title');
    const skillDescription = document.querySelector('.skill-modal .skill-description');
    const skillCloseButton = document.querySelector('.skill-modal .close-button');

    // Add click event to each skill
    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('click', () => {
            const title = skill.getAttribute('data-skill');
            const description = skill.getAttribute('data-description');
            skillTitle.textContent = title;
            skillDescription.textContent = description;
            skillModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close skill modal when clicking close button
    skillCloseButton.addEventListener('click', () => {
        skillModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close skill modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === skillModal) {
            skillModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal when clicking close button or outside the modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});