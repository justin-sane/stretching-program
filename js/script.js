// Interactive features for stretching program website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Collapsible exercise cards
    const exerciseCards = document.querySelectorAll('.exercise-card h3');
    exerciseCards.forEach(card => {
        card.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Add print button
    const mainElement = document.querySelector('main');
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Program';
    printButton.classList.add('print-button');
    printButton.addEventListener('click', function() {
        window.print();
    });
    mainElement.prepend(printButton);

    // Add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Add CSS for the new buttons
    const style = document.createElement('style');
    style.textContent = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            cursor: pointer;
            box-shadow: var(--box-shadow);
            z-index: 99;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .print-button:hover {
            background-color: var(--secondary-color);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background-color: var(--dark-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            box-shadow: var(--box-shadow);
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--secondary-color);
        }
        
        .exercise-card h3 {
            cursor: pointer;
            position: relative;
        }
        
        .exercise-card h3::after {
            content: '\\f107';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            position: absolute;
            right: 20px;
            transition: var(--transition);
        }
        
        .exercise-card h3.active::after {
            transform: rotate(180deg);
        }
        
        .exercise-content {
            max-height: none;
            transition: max-height 0.3s ease;
        }
        
        nav a.active {
            font-weight: bold;
        }
        
        nav a.active::after {
            width: 100%;
        }
        
        @media print {
            .print-button, .back-to-top {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize exercise cards as collapsed
    exerciseCards.forEach(card => {
        const content = card.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});
